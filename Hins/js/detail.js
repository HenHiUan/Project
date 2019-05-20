$(function () {

    var data = decodeURI(location.search);
    // var kucun = data.split('&')[1];
    // var id1 = data.split('&')[0];
    var id = data.slice(1);

    var $p = new Promise(function (resolve) {
        ajax2({
            type: 'get',
            url: '../api/detail.php',
            data: 'id=' + id,
            success: function (str) {
                resolve(str);
                // console.log(str)
            }
        });

    });
    $p.then(function (str) {
        create(str);
        tabControl();
        magnifying();
        orderInf();
    });

    function create(str) {
        var arr = JSON.parse(str);
        var res = arr.map(function (item) {
            return `<div class="commodity-index">
            <a href="">特卖商城</a> <em>></em> <a href="">女装</a>  <em> > 上衣 > </em> <i>${item.title}</i>
        </div>
    <div class="commodity-inf">
        <div class="left">
            <div class="imgbox">
            <img src="../images/${item.b1}.jpg" alt="" class="my-foto">
            <img src="../images/${item.b2}.jpg" alt="" class="my-foto">
            <img src="../images/${item.b3}.jpg" alt="" class="my-foto">
            <span></span>
            </div>
            <ul class="small-img">
                <li><img src="../images/${item.s1}.jpg" alt=""></li>
                <li><img src="../images/${item.s2}.jpg" alt=""></li>
                <li><img src="../images/${item.s3}.jpg" alt=""></li>
            </ul>
            <div class="sanlian">
                <a href="">
                    <i class="sc"></i>
                    <span>收藏</span>
                </a>
                <a href="" class="sharing">
                    <i class="fx"></i>
                    <span>分享</span>
                    <div class="hide"></div>
                </a>
                <a href="">
                    <i class="jb"></i>
                     <span>举报</span>
                </a>    
            </div>
        </div>

        <div class="center">
            <div class="title">
                <h2>${item.title}</h2>
                <h3>${item.title}</h3>
            </div>
            <div class="rush-shopping">
                <div class="time-limit">
                    <i>限时秒杀</i>
                    <i>&nbsp;丨&nbsp;</i>
                    <span>今日限量100件，抢完恢复原价</span>
                </div>

                <div class="price-inf">
                    <div class="price">
                        <b>￥</b>
                        <span id="sprice">${item.price}</span>
                        <i>价格: ${item.oprice}</i>
                        <em>
                            去客户端签到可领取红包
                            <div class="rq-hide">
                                <img src="../images/rq.png" alt="">
                                <p>折800 App -> 我的 -> 设置 -> 扫一扫</p>
                            </div>
                        </em>
                    </div>
                    <div class="time-over">
                        <span></span>
                        <i>2天13时8分5秒后结束</i>
                    </div>

                    <div class="integral">
                        <span>积分</span>
                        <a href="">
                            Z0 最多反12积分 ∨
                            <ul class="int-hide">
                                <li>Z0 最多反12积分</li>
                                <li>Z1 最多反12积分</li>
                                <li>Z2 最多反15积分</li>
                                <li>Z3 最多反15积分</li>
                                <li>Z4 最多反15积分</li>
                                <li>Z5 最多反18积分</li>
                                <li>部分情况不返积分</li>
                            </ul>
                        </a>
                        <a href="">积分可抵订单金额</a>
                    </div>

                    <div class="discounts">
                        <span>优惠</span>
                        <i>下单实付满50元返100元（5.10-5.17）  <em>详情&nbsp;&nbsp;></em>
                        </i>
                    </div>
                </div>
            </div>

            <div class="purchase">
                <dl>
                    <dt>运费</dt>
                    <dd class="address">
                        <span>广东 东莞 <i>至</i><em>广东 ∨</em></a> 免运费</span>
                    </dd>
                </dl>
                <dl class="m-t">
                    <dt>服务</dt>
                    <dd class="serve">
                        <p>
                            <i>折</i>本商品由折800买手砍价
                        </p>
                        <p>
                            <i>24</i>支付成功后，24小时内发货
                        </p>
                    </dd>
                </dl>
                <dl class="m-eleven">
                    <dt>颜色</dt>
                    <dd class="color">
                        <div class="active2"><img title="红色" src="../images/${item.s1}.jpg" alt=""></div>
                        <div><img title="黄色" src="../images/${item.s2}.jpg" alt=""></div>
                        <div><img title="蓝色" src="../images/${item.s3}.jpg" alt=""></div>
                    </dd>
                </dl>
                <dl class="m-eleven">
                    <dt>尺码</dt>
                    <dd class="size"> 
                        <div class="active3">S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </dd>
                </dl>
                <dl>
                    <dt>数量</dt>
                    <dd class="amount">
                            <i class="cut">-</i>
                            <input type="text" name="" id="num" value="1" kucun="${item.kucun}">
                            <i class="add">+</i>
                        <span>库存${item.kucun}件</span>
                    </dd>
                </dl>

                <div class="operation">
                    <input type="button" name="" id="buy" value="立即购买">
                    <input type="button" name="" id="add-carts" value="加入购物车">
                </div>

                <div class="safeguard">
                    <a href="">
                        <i>7</i>7天无理由退货
                    </a>
                    <a href="">
                        <i><img src="../images/tk.png" alt=""></i>退款补贴优惠券
                    </a>
                </div>
            </div>

        </div>

        <div class="right">
            <h4>
                <a href="" id="shopname">${item.shopname}</a>
                <span><img src="../images/jinp.png" alt=""></span>
            </h4>
            <ul class="honor">
                <li><i>信誉 ：</i><span></span></li>
                <li><i>资质 ：</i><em></em></li>
            </ul>
            <ul class="grade">
                <li>描述综合评分 ：<span>4.8 ↑</span></li>
                <li>服务综合评分 ：<span>4.9 ↑</span></li>
                <li>发货综合评分 ：<span>4.9 ↑</span></li>
            </ul>
            <div class="gointo">
                <input type="button" name="" id="into" value="进入店铺">
                <input type="button" name="" id="enshrine" value="收藏本店">
            </div>
        </div>
    </div>`
        }).join('');
        $('#main').html(res);
    }

    //选项卡
    var img = 0;
    var size = 0;
    var color = 0;
    function tabControl() {
        $('.small-img').on('mouseover', 'li', function () {
            $(this).attr('class', 'active').siblings().attr('class', '');
            $('.imgbox').find('img').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
        });

        //颜色选择
        $('.color').on('click', 'div', function () {
            $(this).attr('class', 'active2').siblings().attr('class', '');
            $('.imgbox').find('img').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
            $('.small-img li').attr('class', '');
            img = $(this).index();
            color = $(this).index();
        });


        //尺寸选择
        $('.size').on('click', 'div', function () {
            $(this).attr('class', 'active3').siblings().attr('class', '');
            size = $(this).index();
            console.log(size)
        });

        //添加数量
        $('.amount').on('click', '.add', function () {
            var num = parseInt($(this).prev().val());
            var kucun = parseInt($(this).prev().attr('kucun'));
            num++;
            if (num >= kucun) {
                num = kucun;
            }
            $(this).prev().val(num);
        });

        //减少数量
        $('.amount').on('click', '.cut', function () {
            var num = $(this).next().val();
            num--;
            if (num <= 1) {
                num = 1;
            }
            $(this).next().val(num);
        })

        //输入数量
        $('.amount').on('input', '#num', function () {
            var num = $(this).val();
            var kucun = parseInt($(this).attr('kucun'));
            if (num <= 1) {
                num = 1;
            } else if (num >= kucun) {
                num = kucun;
            }
            $(this).val(num);
        });
        $("#num").attr("oninput", "value=value.replace(/[^0-9]/g,'')");
    }

    //放大镜
    function magnifying() {
        $(".my-foto").imagezoomsl({
            zoomrange: [3, 3]
        });
    }

    //把数据存进数据库
    function orderInf() {
        var name = $('#name a').html();
        var shopname = $('#shopname').html();
        var sprice = $('#sprice').html();
        var title = $('.title h2').html();
        var kucun = $('#num').attr('kucun');
        // var num = $('#num').val();

        $('#add-carts').click(function () {
            if (getCookie('username')) {
                ajax2({
                    type: 'get',
                    url: '../api/order.php',
                    data: 'username=' + name + '&shopname=' + shopname + '&sprice=' + sprice + '&num=' + $('#num').val() + '&title=' + title + '&img=' + $('.color:eq(0) img').eq(img).attr('src') + '&size=' + $('.size div').eq(size).html() + '&color=' + $('.color:eq(0) img').eq(color).attr('title') + '&kucun=' + kucun,
                    success: function (str) {
                        console.log(str)
                    }
                });
                $('.zhezhao').css('display', 'block');


            } else {
                alert('请登录');
                window.open('../html/login.html');
                // ajax2({
                //     type: 'get',
                //     url: '../api/order.php',
                //     data: 'shopname=' + shopname + '&sprice=' + sprice + '&num=' + $('#num').val(),
                //     success: function (str) {
                //         console.log(str)
                //     }
                // });
            }
        });

    }



    var wh = $('#box').height();
    $('.zhezhao').css('height', wh);

    $('.head i').click(function () {
        $('.zhezhao').css('display', 'none');
    });
    $('.choice i').click(function () {
        $('.zhezhao').css('display', 'none');
    });

    $('.choice span').click(function () {
        $('.zhezhao').css('display', 'none');
        window.open('../html/shoppingCart.html');
    });





});