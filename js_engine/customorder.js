//遅延用の関数:引数にはミリ秒を指定
function sleep(a){
  var dt1 = new Date().getTime();
  var dt2 = new Date().getTime();
  while (dt2 < dt1 + a){
    dt2 = new Date().getTime();
  }
  return;
}

//start
$(document).ready(function(){

//データの呼び出し
var db = echo_db();

//パターン
var leather = ["0001","0002","0003","0004","0005","0006","0007","0008","0009","0010","0011","0012","0013","0014","0015","0016","0028","0029","0030"];
var nylon = ["0031","0032","0033","0034","0035","0036","0037","0038","0039","0040","0041","0042","0043","0044","0045","0046"];

//タイトルDB
var title = echo_title();

//タイトルタグDB
var title_tag = [
  ["0001","カスタムオーダーメイド 長財布 ｜イーモノ"],
];

//価格DB
var cost = [
  ["0001","￥15,950"],
];

//商品の詳細
var detail =  [
  ["0001","<table><tr><th>サイズ</th><td>W19.3cm×H9.2cm×D2.4cm</td></tr><tr><th>重さ</th><td>約120g</td></tr><tr><th>仕様</th><td>マチ付お札ポケット×2<br>ファスナー小銭ポケット×1<br>カードポケット×13<br>その他ポケット×3</td></tr></table>"],
];

//パーツリスト
var name = [
  ["0001","パーツ01(革)"],
];

//カラーリスト
var colors = [
  ["0000","0001","ブラック"],
];

//makeshop置き換え用データ 
var makeshopcolors = [
  ["0000","0001","ブラック"],
];

//写真ギャラリー
var gallery = [
];

//makeshopリダイレクト用にIDと紐付け
function return_action_db(_i_){
  var db = [
    ["0001","1531"],
  ];
  for(var i=0;i<db.length;i++) {
    if(db[i][0]==_i_){
      var id = db[i][1];
    }
  }
  return id;
}

//商品呼び出し用の関数
function get_items(db) {
  var array = Array();
  var prev = "";
  for(var i=0;i<db.length;i++) {
    if(prev!=db[i][0]) {
      array.push(db[i][0]);
      prev = db[i][0];
    }
  }
  return array;
}
function get_item_partes(db,item) {
  var array = Array();
  var prev = "";
  for(var i=0;i<db.length;i++) {
    if(db[i][0]==item) {
      if(prev!=db[i][1]) {
        array.push(db[i][1]);
        prev = db[i][1];
      }
    }
  }
  return array;
}
function get_item_parts_variations(db,item,partes,onlyOne) {
  var array = Array();
  var prev = "";
  for(var i=0;i<db.length;i++) {
    if(db[i][0]==item&&db[i][1]==partes) {
      if(prev!=db[i][2]) {
        array.push(db[i][2]);
        prev = db[i][2];
      //onlyOneは最初の1つだけを取り出す処理の場合
        if(onlyOne===true){
          break;
        }
      }
    }
  }
  return array;
}

//セレクターを定義
var itemSelect = '#item';
var partsSelect = '#parts';
var variationList = '.o-select-parts-output-cont .list';
var value = '.o-select-parts-output-cont-name';
var imageBox = '.o-img-overview-area';
var partsList = '#partsList';

//保存用
var globalSave = {};

//IDを渡されると名前を返す
function searchID(id,mode){
  for(var i=0;i<eval(mode).length;i++) {
    if(eval(mode)[i][0]==id){
      return eval(mode)[i][1];
    }
  }
}

//バリエーションが選択された後の処理を以下に記載
function setImage(itemSelect,partsSelect,variationList,action){
  function appendImage(i,p,v){
    var imageName = 'material/EP-'+i+'/i-'+i+'_p-'+p+'_v-'+v+'.png';
    var imgTag = '<img class="parts'+p+'" data-parts="'+p+'" data-variation="'+v+'" src="'+pgurl()+imageName+'" style="z-index:'+Number(p)+';">';
    if($('.parts'+p+'').length){
      $('.parts'+p+'').remove();
    }
    $(imageBox).append(imgTag);
    //画面下部のリストを刷新
    var iconParts = p;
    //leatherのリストにあるものはアイコンが共通
    if(leather.indexOf(iconParts)>=0) {
      iconParts = "0000";
    }
    //nylonのリストにあるものはアイコンが共通
    if(nylon.indexOf(iconParts)>=0) {
      iconParts = "0031";
    }
    var iconName = pgurl()+'material/icon/'+iconParts+'-'+v+'.jpg';
    $('[data-number="No'+p+'"] img').attr('src',iconName);
    //送信用の属性を登録
    $('[data-number="No'+p+'"] img').attr('data-submit','i-'+i+'_p-'+p+'_v-'+v);
     //名入れとホットスタンプのアラート表示
    if(p=="0019"){
      if(v=="0022"||v=="0023"){
        console.log("オリジナルスタンプ");
      } else {
        console.log("オリジナルスタンプではない");
      }
    }
    if(p=="0020"){
      if($(partsSelect).find('option:selected').val() == "0020"){
      if(v=="0001"||v=="0003"){
        //console.log("名入れあり");
        $("#insert_name_value_input").show();        
      } else {
        //console.log("名入れありではない");
        $("#insert_name_value_input").hide();  
      }
    }
    }
    //オプションの値をフォームに渡す
    if(p=="0019"){
      if(v=="0001" || v=="0002" ||v=="0003" || v=="0004" || v=="0005" || v=="0006" ||v=="0007" || v=="0008" || v=="0009" || v=="0010" ||v=="0011" || v=="0012" || v=="0013" || v=="0014" ||v=="0015" || v=="0016" || v=="0017" || v=="0018" ||v=="0019" || v=="0020" || v=="0021" || v=="0022" ||v=="0023"){
        for(var j=0;j<makeshopcolors.length;j++) {
          if(makeshopcolors[j][0]==p){
            if(makeshopcolors[j][1]==v){
              color_name = makeshopcolors[j][2];
              $('#stamp_option').val(color_name);
            }
          }
        }   
      }
    }
    if(p=="0020"){
      if(v=="0001"||v=="0003" || v=="0002"){
        //alert("naire option changed");
        for(var j=0;j<makeshopcolors.length;j++) {
          if(makeshopcolors[j][0]==p){
            if(makeshopcolors[j][1]==v){
              color_name = makeshopcolors[j][2];
              $('#insert_name_option').val(color_name);
            }
          }
        }
      }
    }
    if(p=="0024"){
      if(v=="0001"|| v=="0002"){
        for(var j=0;j<makeshopcolors.length;j++) {
          if(makeshopcolors[j][0]==p){
            if(makeshopcolors[j][1]==v){
              color_name = makeshopcolors[j][2];
              $('#delivery_option').val(color_name);
            }
          }
        }   
      } 
    }
    var get = '?item='+_i_+'&defaultset=1';
  $(partsSelect+" option").each(function(){
    var e = $(this).attr('value');
    var p = $(imageBox+" img.parts"+e+":last-of-type").attr("data-parts");
    var v = $(imageBox+" img.parts"+e+":last-of-type").attr("data-variation");
    if(!p||!v) {
      //:last-of-typeだと1つだけの??保存できない
      p = $(imageBox+" img.parts"+e).attr("data-parts");
      v = $(imageBox+" img.parts"+e).attr("data-variation");
    }
    get += '&parts'+p+'='+v;
  });
  //ブランクで開く
  var passname = $(location).attr('pathname');
  var creat_url = 'https://www.e-mono.co.jp' + passname +  get;
  // history.pushState('', '',creat_url);
  $('body').attr('data-set_url', creat_url)
  }
  var item = $(itemSelect).find('option:selected').val();
  var parts = $(partsSelect).find('option:selected').val();
  var variation = $(variationList).find('.active '+value).attr('data-variations');
  //初期化
  $(imageBox).empty();
  //枠専用の画像を追加
  $(imageBox).append('<img class="frame" src="'+pgurl()+'material/frame/i-'+item+'_p-0000_v-0000.png'+'">');
  $(imageBox).append('<img class="title" src="'+pgurl()+'material/title/i-'+item+'.png'+'">');
 //選択した以外の画像を並べる処理
  var otherPartes = get_item_partes(db,item);
  for(var i=0;i<otherPartes.length;i++) {
   //最初の1バージョンを読み込み
    //var firstVariation = get_item_parts_variations(db,item,otherPartes[i],true);
    var firstVariation = "0000";
    if(getParam('defaultset')){
      if(getParam('parts'+otherPartes[i])){
        var firstVariation = getParam('parts'+otherPartes[i]);
      }
    }
    appendImage(item,otherPartes[i],firstVariation);
  }
   //クリックされた時のみ発火
  if(action=='click'){
       //グローバル要素に保存する処理
    globalSave["parts"+parts] = [item,parts,variation];
  }
  //最後に保存された要素をボックスに並べる
  for(var key in globalSave) {
    appendImage(globalSave[key][0],globalSave[key][1],globalSave[key][2]);
  }
}

//読み込み時とセレクト変更時の処理を以下に記載
$(itemSelect).each(function(){
  var items = _i_;
  $("body").addClass('EP_'+items);
  $(".o-order-help+.o-select-parts-input").addClass('hide');
  for(var i=0;i<items.length;i++) {
    $(this).append('<option value="'+items[i]+'">'+searchID(items[i],"title")+'</option>');
  }
  
  //アイテムが変更されたら発火
  $(itemSelect).change(function(){
    ///セレクターリセット
    $(partsSelect).empty();
    //パーツリストリセット
    $(partsList).empty();
    var item = $(this).find('option:selected').val();
    //あんまり使わないけどページIDを設定
    $("#wrapper main").attr('id','item'+item);
    //名前を設定
    $(".name").text(searchID(item,"title"));
    $("title").text(searchID(item,"title_tag"));
    $('meta[name="keywords"]').attr("content","カスタムオーダー,パターンオーダー,"+searchID(item,"title")+",革小物,本革");
    $('meta[name="description"]').attr("content","イーモノの"+searchID(item,"title")+"カスタムオーダー。パーツカラーを自由にデザインできる世界で一つだけの革小物オーダーメイド。名入れ・スタンプ・ラッピング無料。");
    $('.o-section-02 .wrap.third').after("<div class='gallery'><h2 class='head o-head-copy-l'><span class='txt'>カスタムオーダー例</span></h2><div>"+searchID(item,"gallery")+"</div></div>");
    $('.o-section-02 .gallery a').each(function(){
      var src = $(this).children('img').attr('src');
      $(this).attr('href',src);
      $(this).attr('data-lity',true);
    });
    $(".cost span").text(searchID(item,"cost"));
    $(".detail").empty().append(searchID(item,"detail"));
    var partes = get_item_partes(db,item);
    for(var i=0;i<partes.length;i++) {
      //セレクトボックスにバリエーションを設定
      $(partsSelect).append('<option value="'+partes[i]+'">'+searchID(partes[i],"name")+'</option>');
      //画面下部パーツ一覧にバリエーションを設定
      $(partsList).append('<li class="item" data-number="No'+partes[i]+'"><div class="o-list-parts-meta-box"><div class="o-list-parts-meta-thumb"><img src="'+pgurl()+'assets/img/sample/sample-thumb.png" class="o-list-parts-meta-img selected" alt=""></div><h3 class="o-list-parts-meta-name">'+searchID(partes[i],"name")+'</h3></div></li>');
    }
    //アイテムが変更されたら、グローバルセーブをリセットする
    globalSave = {};
    //画像の変更処理
    setImage(itemSelect,partsSelect,variationList);
  }).change();
  
  //パーツ選択が変更された場合
  $(partsSelect).change(function(){
    //選択肢をリセット
    $(variationList).empty();
    var item = $(itemSelect).find('option:selected').val();
    var parts = $(this).find('option:selected').val();
    var variations = get_item_parts_variations(db,item,parts);
    for(var i=0;i<variations.length;i++) {
      //leatherのリストにあるものはアイコンが共通
      if(leather.indexOf(parts)>=0) {
        parts = "0000";
      }
      //nylonのリストにあるものはアイコンが共通
      if(nylon.indexOf(parts)>=0) {
        parts = "0031";
      }
      var color_name = '';
      for(var j=0;j<colors.length;j++) {
        if(colors[j][0]==parts){
          if(colors[j][1]==variations[i]){
            color_name = colors[j][2];
          }
        }
      }
      $(variationList).append('<li class="item"><a href="javascript:void(0)"><div class="o-select-parts-output-cont-box"><div class="o-select-parts-output-cont-thumb"><img src="'+pgurl()+'material/icon/'+parts+'-'+variations[i]+'.jpg" alt=""></div><div class="o-select-parts-output-cont-name" data-variations="'+variations[i]+'">'+color_name+'</div></div></a></li>');
      $(variationList).children(':first').addClass('active');
      if(parts=="0020"){
        //名入れ選択時にアラート表示と順番を変更
        $(variationList).children().eq(1).before($(variationList).children().eq(2));
        //$(".o-select-parts-output #alert").show();
      } else {
        //$(".o-select-parts-output #alert").hide();
        //alert("名入れ消す");
        $("#insert_name_value_input").hide(); 
      }
    }
    //画像の変更処理
    setImage(itemSelect,partsSelect,variationList);
    //点滅
    var parts = $(this).find('option:selected').val();
    $(imageBox).find('.blink').removeClass('blink');
    $(imageBox).find('.parts'+parts).addClass('blink');
  }).change();
  //バリエーションを押された場合(クリック)
  $(document).on("click",variationList+" li",function(){
    var select = $(this).find(value).text();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    //画像の変更処理
    setImage(itemSelect,partsSelect,variationList,"click");
  });
});

//点滅
setInterval(function(){
  var elem = $('body').find('.blink');
  if(elem.css('opacity')=="1") {
    elem.css('opacity',0);
  } else {
    elem.css('opacity',1);
  }
},500);

//送信時にフォームにデータを登録
$('#submit').click(function(){
  //デザインキーをサーバー保存
  var get = '?background=material/white.png';
  $(partsSelect+" option").each(function(){
    var e = $(this).attr('value');
    var src = $(imageBox+" img.parts"+e+":last-of-type").attr("src");
    if(!src) {
      //:last-of-typeだと1つだけの時保存できない
      src = $(imageBox+" img.parts"+e).attr("src");
    }
    if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
      if(e== "0019" || e=="0020"){
        return true;
      }
    }
    get += '&image'+e+'='+src;
  });
  //例外的に最前表示している要素があれば一番上にもう一度
  $(imageBox+" img").each(function(){
    if($(this).css('z-index')=="30"){
      get += '&image'+$(this).attr('value')+'_30='+$(this).attr('src');
    }
  });
  //フレームと文字情報を追加
  get += '&frame='+$(imageBox).find('.frame').attr('src');
  get += '&title=material/title/i-'+$('#item').val()+'.png';
  //商品が0019の場合は名入れとホットスタンプを後ろに持ってくる
  if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
    get += '&image0019='+$(imageBox+" img.parts0019").attr("src");;
    get += '&image0020='+$(imageBox+" img.parts0020").attr("src");;
  }
  var design_img = encodeURIComponent(pgurl()+"magik.php"+get);
  
  let hash_txt = sha256(design_img).then(hash => {
    //ハッシュの値をDBに突っ込む
    var ajax_flg = 0;
    $.ajax({
      type: "POST",
      url: pgurl()+"insert_design_url.php",
      data: {
        "design_key":hash,
        "parameter":design_img
      },
    }).done(function(data){
      console.log('[SUCCESS]ajaxの通信に成功しました。');
      //渡すフォームに追加する
      var error = false;
      //赤字チェックのエラー確認
      $(".o-section-02 #warning input").each(function(){
        if($(this).parent('label').css('display')!="none"){
          if($(this).prop('checked')==false) {
            alert('エラー: ボタン上部の赤地テキストを確認していただき、チェックよろしくお願いします。');
            error = true;
          }
        }
      });
      //名入れ文字のバリデート
      //名入れ文字が選択されていることをチェックする
      if($('#insert_name_option').val()!="名入れなし"){
        if(insert_name_value_validate($('#insert_name_value_input').val()) == false){
          alert('名入れ文字の形式が正しくありません。');
          error = true;
        } else {
          var encodetext = encodeURIComponent($('#insert_name_value_input').val());
          $('#insert_name_value_input').val(encodetext);
        }
      }

      var opts = echo_option();
      input = $('input[name="brand_info"]');
      
      if(!error){
        $('#partsList li').each(function(){
          var item = $(this).find('img').attr('data-submit');
          if(item.match(/v-0000/)){
            error = true;
          }
          //アイテム番号は削除
          item = item.replace("i-0001_","");
          //オプショ??
          //一度"2,独自商品コード,1,N,オプション独自コード"形式に変換
          //codex:ms-manual.makeshop.jp/wp-content/uploads/download/Kago_Dake_MakeShop_UserManualV1.0.pdf
          item = item.replace("p-0001_v-","2,leather-0001,1,N,leather-0001_v-");
          //オプション独自コードをオプションIDに変換
          var index = item.indexOf("N,");
          opt = item.slice(index+2);
          for(var i=0;i<opts.length;i++) {
            if(opts[i][0] == opt) {
              item = item.replace(opt,opts[i][1]);
              break;
            }
          }
          //フォームフォーマット
          item = item+"||";
          var val = input.attr('value');
          //input.attr('value',val+item)
        });
      }
      if(!error){
        //商品コードを先頭に追加
        var ep = "2,EP-"+$('#item').val()+",1||";
        //input.attr('value',ep+input.attr('value'));
        //最後のオプションの||を削除する
        //input.attr('value',input.attr('value').slice(0,-2));
        //送信する
        $('#image_url').val(pgurl()+'redirect.php?design_key='+hash);
        if($('#insert_name_option').val()!="名入れなし"){
          $('#insert_name_value').val($('#insert_name_value_input').val());                               
        }
        $('body').append('<div id="jsalert"><div><p>この内容でカートへ進みます。</p><a>カートへ進む</a></div></div>');
        $('#jsalert').show();
        $('#jsalert a').click(function(){
          $('#submit').parents('form').submit();
          $('#jsalert').hide();
        });
      } else {
        alert('エラー: パーツを全て選択してください。');
      }
    }).fail(function () {
      alert('サーバーとの通信に失敗しました。再度お試しください。');
      console.log('[FAIL]ajaxの通信に失敗しました。');
    });
  });
});

//ipadでの動作担保
var ua = navigator.userAgent;
if(ua.indexOf('iPad') > 0){
  $("head").append('<meta name="viewport" content="width=1024px, initial-scale=1">');
}

//保存処理
$('#save').click(function(){
  var get = '?background=material/white.png';
  $(partsSelect+" option").each(function(){
    var e = $(this).attr('value');
    var src = $(imageBox+" img.parts"+e+":last-of-type").attr("src");
    if(!src) {
      //:last-of-typeだと1つだけの時保存できない
      src = $(imageBox+" img.parts"+e).attr("src");
    }
    
    if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
      if(e== "0019" || e=="0020"){
        return true;
      }
    }
    get += '&image'+e+'='+src;
  });
  //例外的に最前表示している要素があれば一番上にもう一度
  $(imageBox+" img").each(function(){
    if($(this).css('z-index')=="30"){
      get += '&image'+$(this).attr('value')+'_30='+$(this).attr('src');
    }
  });
  //フレームと文字情報を追加
  get += '&frame='+$(imageBox).find('.frame').attr('src');
  get += '&title=material/title/i-'+$('#item').val()+'.png';
  //商品が0019の場合は名入れとホットスタンプを後ろに持ってくる
  if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
    get += '&image0019='+$(imageBox+" img.parts0019").attr("src");;
    get += '&image0020='+$(imageBox+" img.parts0020").attr("src");;
  }
  //ブランクで開く
  window.open(pgurl()+"magik.php"+get,'newwindow');
});

//保存処理
$('#link').click(function(){
  var get = '?item='+_i_+'&defaultset=1';
  $(partsSelect+" option").each(function(){
    var e = $(this).attr('value');
    var p = $(imageBox+" img.parts"+e+":last-of-type").attr("data-parts");
    var v = $(imageBox+" img.parts"+e+":last-of-type").attr("data-variation");
    if(!p||!v) {
      //:last-of-typeだと1つだけの??保存できない
      p = $(imageBox+" img.parts"+e).attr("data-parts");
      v = $(imageBox+" img.parts"+e).attr("data-variation");
    }
    get += '&parts'+p+'='+v;
  });
  //ブランクで開く
  window.open(location.pathname+get,'newwindow');
});

//actionをmakeshopリダイレクト用にIDと紐付け
$('#customForm').each(function(){
  var id = return_action_db(_i_);
  $(this).attr('action',"https://www.e-mono.co.jp/shopdetail/00000000"+id);
  $(this).attr('data-sp-action',"https://www.e-mono.co.jp/smartphone/detail.html?id=00000000"+id);
});

});

//納期計算
$(document).ready(function(){
  var datetime = new Date();
  var month = datetime.getMonth()+1;
  var day = datetime.getDate();
  if(day<=10) {
    var nouki = (month+1) + "月の中旬頃";
    if((month+1)>12){
      var nouki = ((month+1)-12) + "月の中旬頃";
    }
  } else if(day<=20) {
    var nouki = (month+1) + "月の下旬頃";
    if((month+1)>12){
      var nouki = ((month+1)-12) + "月の下旬頃";
    }
  } else {
    var nouki = (month+2) + "月の上旬頃";
    if((month+2)>12){
      var nouki = ((month+2)-12) + "月の上旬頃";
    }
  }
  $(".o-select-parts-input+p b").text(nouki);
});

//スマホフロート用の変数
var thisOffset;
$(document).ready(function(){
  var headerElem = $('#spfloat');
  //スクロールで切り替え
  $(window).scroll(function(){
    //ヘッダー要素よりも上/下でfixedを切り替える
    if($(window).scrollTop() < thisOffset){
      if(!headerElem.hasClass('fixed')){
        headerElem.addClass('fixed');
      }
    } else {
      if(headerElem.hasClass('fixed')){
        headerElem.removeClass('fixed');
      }
    }
  });
});
$(window).on('load', function(){
  var headerElem = $('#spfloat');
  thisOffset = headerElem.offset().top;
  thisOffset = thisOffset-($(window).innerHeight()-(headerElem.height()));
  headerElem.addClass('fixed');
});

//お急ぎ便表示
$(document).ready(function(){
  $(".o-select-parts-input+p").after('<div class="message"><img src="'+pgurl()+'images/message.jpg" class="pc"><img src="'+pgurl()+'images/message_sp.jpg" class="sp"></div><div class="message" style="margin-top: 10px;"></div>');
});

//名入れのバリデート
$(document).ready(function(){
  $("#insert_name_value_input").bind("blur", function() {
    var _textbox = $(this).val();
    if(insert_name_value_validate(_textbox) == false){
      alert('名入れ文字の形式が正しくありません。');
      $("#insert_name_value_input").css("background-color","#ffebeb");
    }else{
      $("#insert_name_value_input").css("background-color","white");
    }
  });
});

//sha256で暗号化
async function sha256(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

//バリデーション用の正規表現
function insert_name_value_validate(str){
  str = (str==null)?"":str;
  if(str.match(/^[A-Za-z0-9@&:/.\-_,' ]+$/)){
    return true;
  }else{
    return false;
  }
}