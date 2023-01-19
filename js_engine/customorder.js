//�ٱ��Ѥδؿ�:�����ˤϥߥ��ä����
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

//�ǡ����θƤӽФ�
var db = echo_db();

//�ѥ�����
var leather = ["0001","0002","0003","0004","0005","0006","0007","0008","0009","0010","0011","0012","0013","0014","0015","0016","0028","0029","0030"];
var nylon = ["0031","0032","0033","0034","0035","0036","0037","0038","0039","0040","0041","0042","0043","0044","0045","0046"];

//�����ȥ�DB
var title = echo_title();

//�����ȥ륿��DB
var title_tag = [
  ["0001","�������४�������ᥤ�� Ĺ���� �å������"],
];

//����DB
var cost = [
  ["0001","��15,950"],
];

//���ʤξܺ�
var detail =  [
  ["0001","<table><tr><th>������</th><td>W19.3cm��H9.2cm��D2.4cm</td></tr><tr><th>�Ť�</th><td>��120g</td></tr><tr><th>����</th><td>�ޥ��դ����ݥ��åȡ�2<br>�ե����ʡ������ݥ��åȡ�1<br>�����ɥݥ��åȡ�13<br>����¾�ݥ��åȡ�3</td></tr></table>"],
];

//�ѡ��ĥꥹ��
var name = [
  ["0001","�ѡ���01(��)"],
];

//���顼�ꥹ��
var colors = [
  ["0000","0001","�֥�å�"],
];

//makeshop�֤������ѥǡ��� 
var makeshopcolors = [
  ["0000","0001","�֥�å�"],
];

//�̿������꡼
var gallery = [
];

//makeshop������쥯���Ѥ�ID��ɳ�դ�
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

//���ʸƤӽФ��Ѥδؿ�
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
      //onlyOne�Ϻǽ��1�Ĥ�������Ф������ξ��
        if(onlyOne===true){
          break;
        }
      }
    }
  }
  return array;
}

//���쥯���������
var itemSelect = '#item';
var partsSelect = '#parts';
var variationList = '.o-select-parts-output-cont .list';
var value = '.o-select-parts-output-cont-name';
var imageBox = '.o-img-overview-area';
var partsList = '#partsList';

//��¸��
var globalSave = {};

//ID���Ϥ�����̾�����֤�
function searchID(id,mode){
  for(var i=0;i<eval(mode).length;i++) {
    if(eval(mode)[i][0]==id){
      return eval(mode)[i][1];
    }
  }
}

//�Хꥨ����������򤵤줿��ν�����ʲ��˵���
function setImage(itemSelect,partsSelect,variationList,action){
  function appendImage(i,p,v){
    var imageName = 'material/EP-'+i+'/i-'+i+'_p-'+p+'_v-'+v+'.png';
    var imgTag = '<img class="parts'+p+'" data-parts="'+p+'" data-variation="'+v+'" src="'+pgurl()+imageName+'" style="z-index:'+Number(p)+';">';
    if($('.parts'+p+'').length){
      $('.parts'+p+'').remove();
    }
    $(imageBox).append(imgTag);
    //���̲����Υꥹ�Ȥ����
    var iconParts = p;
    //leather�Υꥹ�Ȥˤ����Τϥ������󤬶���
    if(leather.indexOf(iconParts)>=0) {
      iconParts = "0000";
    }
    //nylon�Υꥹ�Ȥˤ����Τϥ������󤬶���
    if(nylon.indexOf(iconParts)>=0) {
      iconParts = "0031";
    }
    var iconName = pgurl()+'material/icon/'+iconParts+'-'+v+'.jpg';
    $('[data-number="No'+p+'"] img').attr('src',iconName);
    //�����Ѥ�°������Ͽ
    $('[data-number="No'+p+'"] img').attr('data-submit','i-'+i+'_p-'+p+'_v-'+v);
     //̾����ȥۥåȥ�����פΥ��顼��ɽ��
    if(p=="0019"){
      if(v=="0022"||v=="0023"){
        console.log("���ꥸ�ʥ륹�����");
      } else {
        console.log("���ꥸ�ʥ륹����פǤϤʤ�");
      }
    }
    if(p=="0020"){
      if($(partsSelect).find('option:selected').val() == "0020"){
      if(v=="0001"||v=="0003"){
        //console.log("̾���줢��");
        $("#insert_name_value_input").show();        
      } else {
        //console.log("̾���줢��ǤϤʤ�");
        $("#insert_name_value_input").hide();  
      }
    }
    }
    //���ץ������ͤ�ե�������Ϥ�
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
      //:last-of-type����1�Ĥ�����??��¸�Ǥ��ʤ�
      p = $(imageBox+" img.parts"+e).attr("data-parts");
      v = $(imageBox+" img.parts"+e).attr("data-variation");
    }
    get += '&parts'+p+'='+v;
  });
  //�֥�󥯤ǳ���
  var passname = $(location).attr('pathname');
  var creat_url = 'https://www.e-mono.co.jp' + passname +  get;
  // history.pushState('', '',creat_url);
  $('body').attr('data-set_url', creat_url)
  }
  var item = $(itemSelect).find('option:selected').val();
  var parts = $(partsSelect).find('option:selected').val();
  var variation = $(variationList).find('.active '+value).attr('data-variations');
  //�����
  $(imageBox).empty();
  //�����Ѥβ������ɲ�
  $(imageBox).append('<img class="frame" src="'+pgurl()+'material/frame/i-'+item+'_p-0000_v-0000.png'+'">');
  $(imageBox).append('<img class="title" src="'+pgurl()+'material/title/i-'+item+'.png'+'">');
 //���򤷤��ʳ��β������¤٤����
  var otherPartes = get_item_partes(db,item);
  for(var i=0;i<otherPartes.length;i++) {
   //�ǽ��1�С��������ɤ߹���
    //var firstVariation = get_item_parts_variations(db,item,otherPartes[i],true);
    var firstVariation = "0000";
    if(getParam('defaultset')){
      if(getParam('parts'+otherPartes[i])){
        var firstVariation = getParam('parts'+otherPartes[i]);
      }
    }
    appendImage(item,otherPartes[i],firstVariation);
  }
   //����å����줿���Τ�ȯ��
  if(action=='click'){
       //�����Х����Ǥ���¸�������
    globalSave["parts"+parts] = [item,parts,variation];
  }
  //�Ǹ����¸���줿���Ǥ�ܥå������¤٤�
  for(var key in globalSave) {
    appendImage(globalSave[key][0],globalSave[key][1],globalSave[key][2]);
  }
}

//�ɤ߹��߻��ȥ��쥯���ѹ����ν�����ʲ��˵���
$(itemSelect).each(function(){
  var items = _i_;
  $("body").addClass('EP_'+items);
  $(".o-order-help+.o-select-parts-input").addClass('hide');
  for(var i=0;i<items.length;i++) {
    $(this).append('<option value="'+items[i]+'">'+searchID(items[i],"title")+'</option>');
  }
  
  //�����ƥब�ѹ����줿��ȯ��
  $(itemSelect).change(function(){
    ///���쥯�����ꥻ�å�
    $(partsSelect).empty();
    //�ѡ��ĥꥹ�ȥꥻ�å�
    $(partsList).empty();
    var item = $(this).find('option:selected').val();
    //����ޤ�Ȥ�ʤ����ɥڡ���ID������
    $("#wrapper main").attr('id','item'+item);
    //̾��������
    $(".name").text(searchID(item,"title"));
    $("title").text(searchID(item,"title_tag"));
    $('meta[name="keywords"]').attr("content","�������४������,�ѥ����󥪡�����,"+searchID(item,"title")+",�׾�ʪ,�ܳ�");
    $('meta[name="description"]').attr("content","������Τ�"+searchID(item,"title")+"�������४���������ѡ��ĥ��顼��ͳ�˥ǥ�����Ǥ��������ǰ�Ĥ����γ׾�ʪ���������ᥤ�ɡ�̾���졦������ס���åԥ�̵����");
    $('.o-section-02 .wrap.third').after("<div class='gallery'><h2 class='head o-head-copy-l'><span class='txt'>�������४��������</span></h2><div>"+searchID(item,"gallery")+"</div></div>");
    $('.o-section-02 .gallery a').each(function(){
      var src = $(this).children('img').attr('src');
      $(this).attr('href',src);
      $(this).attr('data-lity',true);
    });
    $(".cost span").text(searchID(item,"cost"));
    $(".detail").empty().append(searchID(item,"detail"));
    var partes = get_item_partes(db,item);
    for(var i=0;i<partes.length;i++) {
      //���쥯�ȥܥå����˥Хꥨ������������
      $(partsSelect).append('<option value="'+partes[i]+'">'+searchID(partes[i],"name")+'</option>');
      //���̲����ѡ��İ����˥Хꥨ������������
      $(partsList).append('<li class="item" data-number="No'+partes[i]+'"><div class="o-list-parts-meta-box"><div class="o-list-parts-meta-thumb"><img src="'+pgurl()+'assets/img/sample/sample-thumb.png" class="o-list-parts-meta-img selected" alt=""></div><h3 class="o-list-parts-meta-name">'+searchID(partes[i],"name")+'</h3></div></li>');
    }
    //�����ƥब�ѹ����줿�顢�����Х륻���֤�ꥻ�åȤ���
    globalSave = {};
    //�������ѹ�����
    setImage(itemSelect,partsSelect,variationList);
  }).change();
  
  //�ѡ��������ѹ����줿���
  $(partsSelect).change(function(){
    //������ꥻ�å�
    $(variationList).empty();
    var item = $(itemSelect).find('option:selected').val();
    var parts = $(this).find('option:selected').val();
    var variations = get_item_parts_variations(db,item,parts);
    for(var i=0;i<variations.length;i++) {
      //leather�Υꥹ�Ȥˤ����Τϥ������󤬶���
      if(leather.indexOf(parts)>=0) {
        parts = "0000";
      }
      //nylon�Υꥹ�Ȥˤ����Τϥ������󤬶���
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
        //̾����������˥��顼��ɽ���Ƚ��֤��ѹ�
        $(variationList).children().eq(1).before($(variationList).children().eq(2));
        //$(".o-select-parts-output #alert").show();
      } else {
        //$(".o-select-parts-output #alert").hide();
        //alert("̾����ä�");
        $("#insert_name_value_input").hide(); 
      }
    }
    //�������ѹ�����
    setImage(itemSelect,partsSelect,variationList);
    //����
    var parts = $(this).find('option:selected').val();
    $(imageBox).find('.blink').removeClass('blink');
    $(imageBox).find('.parts'+parts).addClass('blink');
  }).change();
  //�Хꥨ�������򲡤��줿���(����å�)
  $(document).on("click",variationList+" li",function(){
    var select = $(this).find(value).text();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    //�������ѹ�����
    setImage(itemSelect,partsSelect,variationList,"click");
  });
});

//����
setInterval(function(){
  var elem = $('body').find('.blink');
  if(elem.css('opacity')=="1") {
    elem.css('opacity',0);
  } else {
    elem.css('opacity',1);
  }
},500);

//�������˥ե�����˥ǡ�������Ͽ
$('#submit').click(function(){
  //�ǥ����󥭡��򥵡��С���¸
  var get = '?background=material/white.png';
  $(partsSelect+" option").each(function(){
    var e = $(this).attr('value');
    var src = $(imageBox+" img.parts"+e+":last-of-type").attr("src");
    if(!src) {
      //:last-of-type����1�Ĥ����λ���¸�Ǥ��ʤ�
      src = $(imageBox+" img.parts"+e).attr("src");
    }
    if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
      if(e== "0019" || e=="0020"){
        return true;
      }
    }
    get += '&image'+e+'='+src;
  });
  //�㳰Ū�˺���ɽ�����Ƥ������Ǥ�����а��־�ˤ⤦����
  $(imageBox+" img").each(function(){
    if($(this).css('z-index')=="30"){
      get += '&image'+$(this).attr('value')+'_30='+$(this).attr('src');
    }
  });
  //�ե졼���ʸ��������ɲ�
  get += '&frame='+$(imageBox).find('.frame').attr('src');
  get += '&title=material/title/i-'+$('#item').val()+'.png';
  //���ʤ�0019�ξ���̾����ȥۥåȥ�����פ���˻��äƤ���
  if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
    get += '&image0019='+$(imageBox+" img.parts0019").attr("src");;
    get += '&image0020='+$(imageBox+" img.parts0020").attr("src");;
  }
  var design_img = encodeURIComponent(pgurl()+"magik.php"+get);
  
  let hash_txt = sha256(design_img).then(hash => {
    //�ϥå�����ͤ�DB���ͤù���
    var ajax_flg = 0;
    $.ajax({
      type: "POST",
      url: pgurl()+"insert_design_url.php",
      data: {
        "design_key":hash,
        "parameter":design_img
      },
    }).done(function(data){
      console.log('[SUCCESS]ajax���̿����������ޤ�����');
      //�Ϥ��ե�������ɲä���
      var error = false;
      //�ֻ������å��Υ��顼��ǧ
      $(".o-section-02 #warning input").each(function(){
        if($(this).parent('label').css('display')!="none"){
          if($(this).prop('checked')==false) {
            alert('���顼: �ܥ�����������ϥƥ����Ȥ��ǧ���Ƥ��������������å���������ꤤ���ޤ���');
            error = true;
          }
        }
      });
      //̾����ʸ���ΥХ�ǡ���
      //̾����ʸ�������򤵤�Ƥ��뤳�Ȥ�����å�����
      if($('#insert_name_option').val()!="̾����ʤ�"){
        if(insert_name_value_validate($('#insert_name_value_input').val()) == false){
          alert('̾����ʸ���η���������������ޤ���');
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
          //�����ƥ��ֹ�Ϻ��
          item = item.replace("i-0001_","");
          //���ץ���??
          //����"2,�ȼ����ʥ�����,1,N,���ץ�����ȼ�������"�������Ѵ�
          //codex:ms-manual.makeshop.jp/wp-content/uploads/download/Kago_Dake_MakeShop_UserManualV1.0.pdf
          item = item.replace("p-0001_v-","2,leather-0001,1,N,leather-0001_v-");
          //���ץ�����ȼ������ɤ򥪥ץ����ID���Ѵ�
          var index = item.indexOf("N,");
          opt = item.slice(index+2);
          for(var i=0;i<opts.length;i++) {
            if(opts[i][0] == opt) {
              item = item.replace(opt,opts[i][1]);
              break;
            }
          }
          //�ե�����ե����ޥå�
          item = item+"||";
          var val = input.attr('value');
          //input.attr('value',val+item)
        });
      }
      if(!error){
        //���ʥ����ɤ���Ƭ���ɲ�
        var ep = "2,EP-"+$('#item').val()+",1||";
        //input.attr('value',ep+input.attr('value'));
        //�Ǹ�Υ��ץ�����||��������
        //input.attr('value',input.attr('value').slice(0,-2));
        //��������
        $('#image_url').val(pgurl()+'redirect.php?design_key='+hash);
        if($('#insert_name_option').val()!="̾����ʤ�"){
          $('#insert_name_value').val($('#insert_name_value_input').val());                               
        }
        $('body').append('<div id="jsalert"><div><p>�������Ƥǥ����Ȥؿʤߤޤ���</p><a>�����Ȥؿʤ�</a></div></div>');
        $('#jsalert').show();
        $('#jsalert a').click(function(){
          $('#submit').parents('form').submit();
          $('#jsalert').hide();
        });
      } else {
        alert('���顼: �ѡ��Ĥ��������򤷤Ƥ���������');
      }
    }).fail(function () {
      alert('�����С��Ȥ��̿��˼��Ԥ��ޤ��������٤������������');
      console.log('[FAIL]ajax���̿��˼��Ԥ��ޤ�����');
    });
  });
});

//ipad�Ǥ�ư��ô��
var ua = navigator.userAgent;
if(ua.indexOf('iPad') > 0){
  $("head").append('<meta name="viewport" content="width=1024px, initial-scale=1">');
}

//��¸����
$('#save').click(function(){
  var get = '?background=material/white.png';
  $(partsSelect+" option").each(function(){
    var e = $(this).attr('value');
    var src = $(imageBox+" img.parts"+e+":last-of-type").attr("src");
    if(!src) {
      //:last-of-type����1�Ĥ����λ���¸�Ǥ��ʤ�
      src = $(imageBox+" img.parts"+e).attr("src");
    }
    
    if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
      if(e== "0019" || e=="0020"){
        return true;
      }
    }
    get += '&image'+e+'='+src;
  });
  //�㳰Ū�˺���ɽ�����Ƥ������Ǥ�����а��־�ˤ⤦����
  $(imageBox+" img").each(function(){
    if($(this).css('z-index')=="30"){
      get += '&image'+$(this).attr('value')+'_30='+$(this).attr('src');
    }
  });
  //�ե졼���ʸ��������ɲ�
  get += '&frame='+$(imageBox).find('.frame').attr('src');
  get += '&title=material/title/i-'+$('#item').val()+'.png';
  //���ʤ�0019�ξ���̾����ȥۥåȥ�����פ���˻��äƤ���
  if($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020"){
    get += '&image0019='+$(imageBox+" img.parts0019").attr("src");;
    get += '&image0020='+$(imageBox+" img.parts0020").attr("src");;
  }
  //�֥�󥯤ǳ���
  window.open(pgurl()+"magik.php"+get,'newwindow');
});

//��¸����
$('#link').click(function(){
  var get = '?item='+_i_+'&defaultset=1';
  $(partsSelect+" option").each(function(){
    var e = $(this).attr('value');
    var p = $(imageBox+" img.parts"+e+":last-of-type").attr("data-parts");
    var v = $(imageBox+" img.parts"+e+":last-of-type").attr("data-variation");
    if(!p||!v) {
      //:last-of-type����1�Ĥ�����??��¸�Ǥ��ʤ�
      p = $(imageBox+" img.parts"+e).attr("data-parts");
      v = $(imageBox+" img.parts"+e).attr("data-variation");
    }
    get += '&parts'+p+'='+v;
  });
  //�֥�󥯤ǳ���
  window.open(location.pathname+get,'newwindow');
});

//action��makeshop������쥯���Ѥ�ID��ɳ�դ�
$('#customForm').each(function(){
  var id = return_action_db(_i_);
  $(this).attr('action',"https://www.e-mono.co.jp/shopdetail/00000000"+id);
  $(this).attr('data-sp-action',"https://www.e-mono.co.jp/smartphone/detail.html?id=00000000"+id);
});

});

//Ǽ���׻�
$(document).ready(function(){
  var datetime = new Date();
  var month = datetime.getMonth()+1;
  var day = datetime.getDate();
  if(day<=10) {
    var nouki = (month+1) + "�����ܺ�";
    if((month+1)>12){
      var nouki = ((month+1)-12) + "�����ܺ�";
    }
  } else if(day<=20) {
    var nouki = (month+1) + "��β��ܺ�";
    if((month+1)>12){
      var nouki = ((month+1)-12) + "��β��ܺ�";
    }
  } else {
    var nouki = (month+2) + "��ξ�ܺ�";
    if((month+2)>12){
      var nouki = ((month+2)-12) + "��ξ�ܺ�";
    }
  }
  $(".o-select-parts-input+p b").text(nouki);
});

//���ޥۥե����Ѥ��ѿ�
var thisOffset;
$(document).ready(function(){
  var headerElem = $('#spfloat');
  //����������ڤ��ؤ�
  $(window).scroll(function(){
    //�إå������Ǥ����/����fixed���ڤ��ؤ���
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

//���ޤ���ɽ��
$(document).ready(function(){
  $(".o-select-parts-input+p").after('<div class="message"><img src="'+pgurl()+'images/message.jpg" class="pc"><img src="'+pgurl()+'images/message_sp.jpg" class="sp"></div><div class="message" style="margin-top: 10px;"></div>');
});

//̾����ΥХ�ǡ���
$(document).ready(function(){
  $("#insert_name_value_input").bind("blur", function() {
    var _textbox = $(this).val();
    if(insert_name_value_validate(_textbox) == false){
      alert('̾����ʸ���η���������������ޤ���');
      $("#insert_name_value_input").css("background-color","#ffebeb");
    }else{
      $("#insert_name_value_input").css("background-color","white");
    }
  });
});

//sha256�ǰŹ沽
async function sha256(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

//�Х�ǡ�������Ѥ�����ɽ��
function insert_name_value_validate(str){
  str = (str==null)?"":str;
  if(str.match(/^[A-Za-z0-9@&:/.\-_,' ]+$/)){
    return true;
  }else{
    return false;
  }
}