$(document).ready(function(){

//���ޡ��ȥե���ɽ����Ĵ��
var ua = navigator.userAgent;
if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
  $('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1">');
} else {
  $('head').prepend('<meta name="viewport" content="width=1250">');
}
if($('.sp').css('display') == "block") {
  $('.sp.o-section-01 .o-container').append($('.o-section-01 .wrap.first'));
}

//�����Х��ѿ�
var ref = document.referrer;
var member_id = $('#member_id').val();
var templates = echo_template();

//�ץꥻ�åȰ�����ƤӽФ�
var key = 0;
for(var i=0;i<templates.length;i++) {
  if(templates[i][0]==_i_){
    key++;
    $('#base_color.modal_items').append('<a href="'+location.pathname+'?'+templates[i][1]+'" class="modal_item"><img src="'+pgurl()+'/material/bc/bc_ep'+_i_+'_'+key+'.jpg"><p>'+templates[i][2]+'</p></a>')
  }
}

//Lightbox�Ѥ����
$('#layer_board_area').layerBoard({
  delayTime: 200,
  fadeTime: 500,
  alpha: 0.8,
  limitMin: 0,
  easing: 'linear',
  limitCookie: 0,
  countCookie: 1000,
});

//�ѡ��Ĥ��ɤ߹���
$('#nav_area').load('https://www.e-mono.co.jp/html/page99.html');
$('#footer').load('https://www.e-mono.co.jp/html/page101.html');

//�ǥ��������¸��ǽ
$('#item_save').on('click', function () {
  get = bind_template();
  var set_img_url = pgurl()+'magik.php'+get;
  $('#confirm_save_area img').attr('src', set_img_url);
});

//��¸�ܥ���򥻥å�
var set_item_list_url = "https://www.e-mono.co.jp/html/page114.html?member_id=" + member_id;
$('.to_item_list').attr('href', set_item_list_url);

//��������֤��ä�������ǡ������ɤ߹���ǥܥ����ͭ����
if(member_id) {
  $('#item_save').addClass('btn_on');
  $('#item_load').addClass('btn_on');
  $('.save_text').attr('style','display:none !important');
  $('body').addClass('logined');
  $('#float_save_button .login').addClass('logined').text('�� ��������(��������)');
  $('#float_save_button .login').attr('href','https://www.e-mono.co.jp/shop/logout.html');
  //����ǡ����ɤ߹���
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

//�ǥ��������¸��ǽ
$('#item_load').on('click', function () {
  var item_name = $('.o-head-item-name .name').text();
  $('#layer_save_area .modal_head').text(item_name + '����¸�ǥ�����');
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

//�����Ǥ�ԤΥХ�����
//��¸�ǥ���������Υ�󥯤�ưŪ��󥯤��ѹ�
setInterval(function(){
  $('#layer_save_area .modal_item a:last-child').each(function(){
    if($(this).attr('rel')){
      $(this).attr('href',$(this).attr('rel'));
    }
  });
},2000);

//����ʥ�
var $header = $('#header');
$(window).scroll(function(){
  if($(window).scrollTop() > 250) {
    $header.addClass('fixed');
  } else {
    $header.removeClass('fixed');
  }
});

//�����Х�ʥ�
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

//���ࡼ����������
$('#pagetop').click(function(){
  var speed = 2000;
  var target = $("#wrapper");
  var position = target.offset().top;
  $("html, body").animate({scrollTop:position}, speed, "swing");
  return false;
});

//�⡼������Ĥ�������ʥѡ���������
$(document).on('click', '.close, .dark', function () {
  $('body').removeClass('select_on');
  $('body').removeClass('detail_on');
});

//�ե�����ʸ�ܥ���
$('#float_save_button .save').on('click',function(){
  $('main form [id="submit"]').click();
});
//�ɤ߹��ߤǽ����
$.cookie("temporarilysaved", "", { path:"/",expires:1 });
$('.save_text a').click(function(){
  var page_url = $('body').attr('data-set_url');
  $.cookie("temporarilysaved", page_url, { path:"/",expires:1 });
  location.href = "https://www.e-mono.co.jp/html/page110.html";
});
$('#float_save_button .login').on('click',function(){
  $('.save_text a').click();
});

//�ѡ��Ĥ�Lightbox������Ǥ���褦�˽���
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

//��¸����
var itemSelect = '#item';
var partsSelect = '#parts';
var variationList = '.o-select-parts-output-cont .list';
var value = '.o-select-parts-output-cont-name';
var imageBox = '.o-img-overview-area';
var partsList = '#partsList';

//��¸�ν���
$('#design_save').on('click',function(){
  var get = bind_template();
  //ajax��add.php�˥ǡ�����POST����
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
  $('body').append('<div style="position:fixed;width:100%;height:100%;inset:0;background:rgba(0,0,0,0.8);z-index:99999;color:white;line-height:100vh;text-align:center;">��¸���Ƥ��ޤ�</div>')
  setInterval(function(){
    alert("��¸����λ���ޤ�����");
    location.href = $('body').attr('data-set_url');
  },5000);
});

//��¸�����ǥ������������κ������
$(document).on("click", "#layer_save_area .remove", function(e){
  e.preventDefault();
  if(window.confirm('������ޤ���������Ǥ�����')){
    var page_url = $(this).attr('data-href');
    $.ajax({
      url: page_url,
      type: 'GET',
    });
    //��å�������ɽ�����ƺ��ɤ߹���
    alert("�������λ���ޤ�����");
    $(this).parent('.modal_item').fadeOut(250,function(){
      $(this).remove();
    });
  }
});

//��¸�����Ѥζ���ư������
function bind_template(){
  //���쥯���������
  var get = '?background=material/white.png';
  $(partsSelect + " option").each(function () {
    var e = $(this).attr('value');
    var src = $(imageBox + " img.parts" + e + ":last-of-type").attr("src");
    if (!src) {
      //:last-of-type����1�Ĥ����λ���¸�Ǥ��ʤ�
      src = $(imageBox + " img.parts" + e).attr("src");
    }
    if ($(itemSelect).find('option:selected').val() == "0019" || $(itemSelect).find('option:selected').val() == "0020") {
      if (e == "0019" || e == "0020") {
        return true;
      }
    }
    get += '&image' + e + '=' + src;
  });
  //�㳰Ū�˺���ɽ�����Ƥ������Ǥ�����а��־�ˤ⤦����
  $(imageBox + " img").each(function () {
    if ($(this).css('z-index') == "30") {
      get += '&image' + $(this).attr('value') + '_30=' + $(this).attr('src');
    }
  });
  //�ե졼���ʸ��������ɲ�
  get += '&frame=' + $(imageBox).find('.frame').attr('src');
  get += '&title=material/title/i-' + $('#item').val() + '.png';
  //���ʤ�0019�ξ���̾����ȥۥåȥ�����פ���˻��äƤ���
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