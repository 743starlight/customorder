<body>
  <script>
    var _i_ = ['<?php echo $_GET['i']; ?>'];
    if (getParam('item')) {
      _i_ = [getParam('item')];
    }
    //�ץ�����URL�����
    function pgurl() {
      return "<?php echo $pgurl; ?>/";
    }
    //��: ?item=0002&defaultset=1&parts0001=0003&parts0002=0004&parts0003=0006&parts0004=0007&parts0005=0010&parts0006=0011&parts0007=0008&parts0008=0003&parts0009=0012&parts0017=0003&parts0018=0002&parts0019=0006&parts0020=0001&parts0021=0002
    //GET�ѿ������
    function getParam(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  </script>

  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/css/top.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/js/slick/slick.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/js/slick/slick-theme.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/css/lity.min.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/css/layerBoard.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/css/base.css">
  <link rel="stylesheet" type="text/css" href="https://gigaplus.makeshop.jp/emonostore/customorder/css/add.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/css/main.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $pgurl; ?>/css/customorder.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
  <script src="<?php echo $pgurl; ?>/js/jquery-modalLayerBoard.js"></script>
  <script src="<?php echo $pgurl; ?>/js/TweenMax.min.js"></script>
  <script src="<?php echo $pgurl; ?>/js/slick/slick.min.js"></script>
  <script src="<?php echo $pgurl; ?>/js/ofi.min.js"></script>
  <script src="<?php echo $pgurl; ?>/js/lity.min.js"></script>
  <script src="<?php echo $pgurl; ?>/js_engine/db_item.js"></script>
  <script src="<?php echo $pgurl; ?>/js_engine/db_title.js"></script>
  <script src="<?php echo $pgurl; ?>/js_engine/db_options.js"></script>
  <script src="<?php echo $pgurl; ?>/js_engine/db_template.js"></script>
  <script src="<?php echo $pgurl; ?>/js_engine/customorder.js" charset="EUC-JP"></script>
  <script src="<?php echo $pgurl; ?>/js_engine/layout.js" charset="EUC-JP"></script>

  <div class="dark"></div>
  <div id="layer_board_area">
    <div class="layer_board_bg"></div>
    <section class="layer_board">
      <div class="modal_head">
        �١������顼��������
      </div>
      <div class="layer_borad_content">
        <div id="base_color" class="modal_items"></div>
        <a href="#" class="modal_button mdl_btn_close">�١������顼��Ȥ鷺�˥������ޥ���</a>
      </div>
      <div class="mdl_btn_close circle_btn"></div>
    </section>
  </div>

  <a id="pagetop">
    <img src="//gigaplus.makeshop.jp/emonostore/customorder/images/btn_pagetop.png" alt="PAGETOP" width="101" height="100" class="pagetop">
  </a>

  <div id="float_save_button">
    <a class="save sp">�� �������Ƥ���ʸ����</a>
    <a class="login">�� ������</a>
  </div>

  <div id="wrapper">
    <header id="header">
      <div id="nav-toggle">
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="nav_area"></div>
      <div id="layer_save_area">
        <div class="layer_board_bg"></div>
        <section class="layer_board">
          <div class="layer_borad_content">
            <div class="modal_head"></div>
            <div class="modal_items"></div>
          </div>
          <div class="mdl_btn_close circle_btn"></div>
          <div class="layer_board_bottom">
            <p class="layer_board_bottom_text">����¸�����ǥ�����κ���ϰ����ڡ�������Ԥ��ޤ���</p>
            <a href="" class="to_item_list modal_button mdl_btn_close">��¸�����������४���������ʤΰ���</a>
          </div>
        </section>
      </div>
      <div id="confirm_save_area">
        <div class="layer_board_bg"></div>
        <section class="layer_board">
          <div class="layer_borad_content">
            <div class="modal_head"></div>
            <div class="modal_items">
              <div class="modal_item">
                <img src="">
              </div>
            </div>
          </div>
          <div class="mdl_btn_close circle_btn"></div>
          <div class="layer_board_bottom">
            <p class="layer_board_bottom_text">��Ĥξ��ʤ���¸�Ǥ���ǥ�����Ϻ��磶��ޤǤǤ���</p>
            <a href="#" id="design_save" class="modal_button mdl_btn_close">�ǥ��������¸����</a>
          </div>
        </section>
      </div>
    </header>

    <main class="l-main o-page-order">
      <article class="o-section-01">
        <div class="moodal_btn sp_button">
          <img src="<?php echo $pgurl; ?>/images/sp_recommend_btn.png" class="layer_board_btn">
        </div>
        <section class="o-sect">
          <div class="o-container">
            <div class="wrap first" style="padding: 20px 0;display: block;height: auto;">
              <ul class="o-flow-list">
                <li class="item">
                  <h2 class="cap">STEP 1</h2>
                  <h3 class="lead">�ѡ��Ĥ�<br>���򤷤ޤ�</h3>
                </li>
                <li class="item">
                  <h2 class="cap">STEP 2</h2>
                  <h3 class="lead">�Хꥨ��������<br>���򤷤ޤ�</h3>
                </>
                <li class="item">
                  <h2 class="cap">STEP 3</h2>
                  <h3 class="lead">�����ƥ��<br>��������</h3>
                </li>
              </ul>
              <div class="o-select-parts-input"><select id="item"></select></div>
              <p>����������ʸ��<b></b>�ˤ��Ϥ��������ޤ���</p>
              <div class="moodal_btn pc_button"><img src="<?php echo $pgurl; ?>/images/sp_recommend_btn.png" class="layer_board_btn"></div>
            </div>
            <div class="wrap second">
              <div class="inner o-overview-layout">
                <div class="box first">
                  <div class="o-img-overview-area"></div>
                  <a class="o-btn-default-s btn" id="link" style="cursor:pointer;display:none;">�����Ȥ߹�碌��󥯤�ȯ��</a>
                  <div class="btn_group">
                    <a class="o-btn-default-s btn" id="item_save" style="cursor: pointer; display: inline;">�ǥ��������¸</a>
                    <a class="o-btn-default-s btn" id="item_load" style="cursor: pointer; display: inline;">��¸�����ǥ��������</a>
                  </div>
                  <p class="save_text">
                    ����������󤹤�ȥǥ�����ǡ�������¸���뤳�Ȥ��Ǥ��ޤ���
                    <a>������&#183;���������Ͽ�Ϥ�����</a>
                  </p>
                </div>
                <div class="box second">
                  <aside>
                    <h1 class="o-head-item-name o-head-copy-l">
                      <span class="cap">�����ƥ�̾</span>
                      <span class="name"></span>
                    </h1>
                    <p class="cost"><span></span> (�ǹ�)</p>
                    <div class="detail"></div>
                  </aside>
                  <div id="spfloat">
                    <h4 class="lead">�ѡ��Ĥ����򤷤ƿ�����������Ǥ�������</h4>
                    <div class="o-select-parts-input">
                      <select id="parts"></select>
                    </div>
                    <input type="text" name="insert_name_value_input" id="insert_name_value_input"
                      style="color:black;width:300px;margin-bottom:25px;display:none;background:white;border: 1px solid grey;"
                      placeholder="̾����ʸ��">
                    <div class="o-select-parts-output">
                      <div class="o-select-parts-output-cont">
                        <h3 class="parts_text"></h3>
                        <h4 class="lead">
                          �ѡ��Ĥ����򤷤ƿ�����������Ǥ�������
                          <img class="close" src="<?php echo $pgurl; ?>/images/tb/close.png" alt="">
                        </h4>
                        <ul class="list">
                          <!--������֤����Ϥ��Ƥ����ʤ��ȥ��ޥ�float���׻��Ǥ��ʤ���ɽ������̯�ˤʤ�-->
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0001.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0001</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0002.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0002</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0003.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0003</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0004.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0004</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0005.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0005</div>
                              </div>
                            </a></li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0006.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0006</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0007.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0007</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0008.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0008</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0009.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0009</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0010.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0010</div>
                              </div>
                            </a>
                          </li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0011.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0011</div>
                              </div>
                            </a></li>
                          <li class="item">
                            <a href="javascript:void(0)">
                              <div class="o-select-parts-output-cont-box">
                                <div class="o-select-parts-output-cont-thumb">
                                  <img src="<?php echo $pgurl; ?>/material/icon/0000-0012.jpg" alt="">
                                </div>
                                <div class="o-select-parts-output-cont-name">0012</div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <p id="alert" style="display:none;">̾����ʸ���Ϥ���ʸ�κݤ�<br>����ʸ���͡פˤ�������������</p>
                    </div>
                    <article class="o-section-02">
                      <section class="o-sect">
                        <div class="o-container">
                          <div class="wrap first">
                            <h2 class="head o-head-copy-l">
                            </h2>
                          </div>
                          <div class="wrap second">
                            <ul class="o-list-parts-meta" id="partsList"></ul>
                          </div>
                        </div>
                      </section>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            <!-- -->
          </div>
        </section>
      </article>

      <article class="o-section-02">
        <section class="o-sect">
          <div class="o-container">
            <div class="wrap first">
              <h2 class="head o-head-copy-l">
                <span class="name"></span>
                <span class="txt">�����򤷤��ѡ��İ���</span>
              </h2>
            </div>
            <div class="wrap second">
              <ul class="o-list-parts-meta" id="partsList"></ul>
            </div>
          </div>
        </section>
      </article>

      <article class="o-section-01 sp">
        <section class="o-sect">
          <div class="o-container"></div>
        </section>
      </article>

    </main>
    <footer id="footer"></footer>
  </div>

</body>
</html>