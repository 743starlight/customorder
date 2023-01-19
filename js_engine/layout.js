$(document).ready(function(){

//スマートフォン表示の調整
var ua = navigator.userAgent;
if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
  $('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1">');
} else {
  $('head').prepend('<meta name="viewport" content="width=1250">');
}
if($('.sp').css('display') == "block") {
  $('.sp.o-section-01 .o-container').append($('.o-section-01 .wrap.first'));
}

//グローバル変数
var ref = document.referrer;
var member_id = $('#member_id').val();
var templates = echo_template();

//プリセット一覧を呼び出し
var key = 0;
for(var i=0;i<templates.length;i++) {
  if(templates[i][0]==_i_){
    key++;
    $('#base_color.modal_items').append('<a href="'+location.pathname+'?'+templates[i][1]+'" class="modal_item"><img src="'+pgurl()+'/material/bc/bc_ep'+_i_+'_'+key+'.jpg"><p>'+templates[i][2]+'</p></a>')
  }
}

//Lightbox用の宣言
$('#layer_board_area').layerBoard({
  delayTime: 200,
  fadeTime: 500,
  alpha: 0.8,
  limitMin: 0,
  easing: 'linear',
  limitCookie: 0,
  countCookie: 1000,
});

//パーツの読み込み
$('#nav_area').load('https://www.e-mono.co.jp/html/page99.html');
$('#footer').load('https://www.e-mono.co.jp/html/page101.html');

//デザインの保存機能
$('#item_save').on('click', function () {
  get = bind_template();
  var set_img_url = pgurl()+'magik.php'+get;
  $('#confirm_save_area img').attr('src', set_img_url);
});

//保存ボタンをセット
var set_item_list_url = "https://www.e-mono.co.jp/html/page114.html?member_id=" + member_id;
$('.to_item_list').attr('href', set_item_list_url);

//ログイン状態だった場合会員データを読み込んでボタンを有効化
if(member_id) {
  $('#item_save').addClass('btn_on');
  $('#item_load').addClass('btn_on');
  $('.save_text').attr('style','display:none !important');
  $('body').addClass('logined');
  $('#float_save_button .login').addClass('logined').text('▽ ログイン中(ログアウト)');
  $('#float_save_button .login').attr('href','https://www.e-mono.co.jp/shop/logout.html');
  //会員データ読み込み
  $.ajax({
    url: pgurl()+"dbuild/return.php?user_id="+member_id+"&item_id="+_i_[0],
    type: 'GET',
    dataType: 'text',
  }).done(function(data, textStatus, jqXHR){
    $('#layer_save_area .modal_items').append(data);
  });
} else {
  $('#item_save').remove('btn_on');
  $('#item_load').remove('btn_on');
}

//デザインの保存機能
$('#item_load').on('click', function () {
  var item_name = $('.o-head-item-name .name').text();
  $('#layer_save_area .modal_head').text(item_name + 'の保存デザイン');
  $('#layer_save_area').addClass('on');
});
$('#item_save').on('click', function () {
  $('#confirm_save_area').addClass('on');
});
$('.layer_board_bg').on('click', function () {
  $('#layer_save_area').removeClass('on');
});
$('.mdl_btn_close').on('click', function () {
  $('#layer_save_area').removeClass('on');
  $('#confirm_save_area').removeClass('on');
  $('#confirm_save_area img').attr('src', '');
});

//謎の前任者のバグ回避
//保存デザイン一覧のリンクを動的リンクに変更
setInterval(function(){
  $('#layer_save_area .modal_item a:last-child').each(function(){
    if($(this).attr('rel')){
      $(this).attr('href',$(this).attr('rel'));
    }
  });
},2000);

//グロナビ
var $header = $('#header');
$(window).scroll(function(){
  if($(window).scrollTop() > 250) {
    $header.addClass('fixed');
  } else {
    $header.removeClass('fixed');
  }
});

//グローバルナビ
var state = false;
var scrollpos;
$('#nav-toggle').click(function(){
  if (state == false) {
    $header.addClass('open');
    $('body,html').css('height','100%');
    $('body,html').css('overflow','hidden');
    scrollpos = $(window).scrollTop();
    $('body').addClass('fixed').css({'top': -scrollpos});
    state = true;
  } else if(state == true){
    $('body,html').css('height','auto');
    $('body,html').css('overflow','inherit');
    $header.removeClass('open');
    $('body').removeClass('fixed').css({'top': 0});
  window.scrollTo(0,scrollpos);
    state = false;
  }
});
$('#header').find('a[href^="#"]').click(function(){
  $header.removeClass('open');
  $('body').removeClass('fixed').css({'top': 0});
  window.scrollTo(0,scrollpos);
  state = false;
});

//スムーズスクロール
$('#pagetop').click(function(){
  var speed = 2000;
  var target = $("#wrapper");
  var position = target.offset().top;
  $("html, body").animate({scrollTop:position}, speed, "swing");
  return false;
});

//モーダルを閉じる処理（パーツ選択肢）
$(document).on('click', '.close, .dark', function () {
  $('body').removeClass('select_on');
  $('body').removeClass('detail_on');
});

//フロート注文ボタン
$('#float_save_button .save').on('click',function(){
  $('main form [id="submit"]').click();
});
//読み込みで初期化
$.cookie("temporarilysaved", "", { path:"/",expires:1 });
$('.save_text a').click(function(){
  var page_url = $('body').attr('data-set_url');
  $.cookie("temporarilysaved", page_url, { path:"/",expires:1 });
  location.href = "https://www.e-mono.co.jp/html/page110.html";
});
$('#float_save_button .login').on('click',function(){
  $('.save_text a').click();
});

//パーツをLightboxで選択できるように準備
$(document).on('click', '#partsList .item', function () {
  var on_t = $(this).attr('data-number');
  var on_t = on_t.replace('No', '');
  $('#parts').val(on_t).change();
  $('body').addClass('select_on');
  var parts_text = $(this).find('.o-list-parts-meta-name').text();
  $('.parts_text').text(parts_text);
  $('.o-img-overview-area img').each(function () {
    $(this).removeClass('blink');
    $(this).css('opacity', '1');
    var item_no = $(this).attr('data-parts');
    if (item_no == on_t) {
      $(this).addClass('blink');
    }
  });
});

//保存処理
var itemSelect = '#item';
var partsSelect = '#parts';
var variationList = '.o-select-parts-output-cont .list';
var value = '.o-select-parts-output-cont-name';
var imageBox = '.o-img-overview-area';
var partsList = '#partsList';

//保存の処理
$('#design_save').on('click',function(){
  var get = bind_template();
  //ajaxでadd.phpにデータをPOSTする
  var id = member_id;
  var img_url = btoa(pgurl()+"magik.php" + get);
  var item_id = _i_[0];
  var page_url = btoa($('body').attr('data-set_url'));
  var url = "https://ad-bond3.sakura.ne.jp/engine/dbuild/append.php?id=" + id + '&item_id=' + item_id + '&pageUrl=' + page_url + '&' + get.slice(1);
  for(var i=0; i<50; i++){
    url = url.replace('https://www.pomme.co.jp/customorder_2022/','');
  }
  console.log(url);
  $.ajax({
    url: url,
    type: 'GET',
  });
  $('body').append('<div style="position:fixed;width:100%;height:100%;inset:0;background:rgba(0,0,0,0.8);z-index:99999;color:white;line-height:100vh;text-align:center;">保存しています</div>')
  setInterval(function(){
    alert("保存が完了しました！");
    location.href = $('body').attr('data-set_url');
  },5000);
});

//保存したデザイン一覧からの削除処理
$(document).on("click", "#layer_save_area .remove", function(e){
  e.preventDefault();
  if(window.confirm('削除します。よろしいですか？')){
    var page_url = $(this).attr('data-href');
    $.ajax({
      url: page_url,
      type: 'GET',
    });
    //メッセージを表示して再読み込み
    alert("削除が完了しました！");
    $(this).parent('.modal_item').fadeOut(250,function(){
      $(this).remove();
    });
  }
});

//保存処理用の共通動作を定義
function bind_template(){
  //セレクターを定義
  var get = '?background=material/white.png';
  $(partsSelect + " option").each(function () {
    var e = $(this).attr('value');
    var src = $(imageBox + " img.parts" + e + ":last-of-type").attr("src");
    if (!src) {
      //:last-of-typeだと1つだけの時保存できない
      src = $(imageBox + " img.parts" + e).attr("src");
    }
    if ($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020") {
      if (e == "0019" || e == "0020") {
        return true;
      }
    }
    get += '&image' + e + '=' + src;
  });
  //例外的に最前表示している要素があれば一番上にもう一度
  $(imageBox + " img").each(function () {
    if ($(this).css('z-index') == "30") {
      get += '&image' + $(this).attr('value') + '_30=' + $(this).attr('src');
    }
  });
  //フレームと文字情報を追加
  get += '&frame=' + $(imageBox).find('.frame').attr('src');
  get += '&title=material/title/i-' + $('#item').val() + '.png';
  //商品が0019の場合は名入れとホットスタンプを後ろに持ってくる
  if ($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020") {
    get += '&image0019=' + $(imageBox + " img.parts0019").attr("src");;
    get += '&image0020=' + $(imageBox + " img.parts0020").attr("src");;
  }
  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  return get;
}
  
});