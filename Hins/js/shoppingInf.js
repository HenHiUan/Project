$(function () {


    var ipage = 1;
    var tiao = 12;

    function init(ipage) {
        var p = new Promise(function (resolve) {
            ajax2({
                type: 'get',
                url: 'api/page.php',
                data: 'page=' + ipage + '&num=' + tiao,
                success: function (str) {
                    // create(str);
                    resolve(str);
                }
            })
        });

        p.then(function (str) {
            create(str);
        })
    };


    init(ipage);





    // 请求数据并渲染
    // ajax2({
    //     type: 'get',
    //     url: ('api/shoppingInf.php'),
    //     success: function (str) {
    //         // console.log(str);
    //         create(str);
    //     }
    // });
    function create(str) {
        var arr = JSON.parse(str); //把后端传回来的数据转成数组
        // console.log(arr);
        var res = arr.data2.map(function (item) {
            return `<li data-id="${item.gid}">
                        <a href="###">
                            <div class="imgbox">
                                <img src="images/${item.image}" alt="">
                                <div class="imgbox-hide">
                                    <span>${item.residue}</span>
                                </div>
                            </div>
                            <p class="commodity-pri">
                                <span>￥${item.price}</span>
                            </p>
                            <p class="commodity-til">
                                <span>${item.title}</span>
                            </p>
                        </a>
                    </li>`
        }).join('');
        $('#tl-commodity').html(res);

        var total = arr.total;
        var num = arr.num;
        $(window).load(function () {
            setTimeout(function () {
                console.log(1)
                $('#paging-btn').paging({
                    totalPage: Math.ceil(total / num),
                    totalSize: total,
                    callback: function (num) {
                        init(num);
                    }
                });
            }, 500);
        });

        // $('#paging-btn').on('click','a',function(){
        //     window.scrollTo(0,1380)
        // });

        var res2 = arr.data.map(function (item) {
            return `<li data-id="${item.gid}" kucun="${item.kucun}">
            <a href="###">
                <div class="boximg">
                    <div class="quan">
                        <a href="">${item.ticket}元券</a>
                        <a href="">点击领取</a>
                    </div>
                    <img src="images/${item.image}" alt="">
                    <div class="li-hide">
                        <a href="">找相似></a>
                    </div>
                </div>
                <p class="tu-commodity-til">
                    <a href="">${item.title}</a>
                    
                </p>
                <p class="tu-commodity-pri">
                    <span>￥${item.price}</span>
                    <i><del>￥${item.oprice}</del></i>
                </p>
            </a>
            <div class="div-hide">
                <span>${item.exemption}</span>
                <p>
                    <a href=""><img src="images/xingxing.png" alt="">收藏</a>&nbsp;
                    <a href="">[详情]</a>
                </p>
            </div>
        </li>`
        }).join('');
        $('#commodity-list').html(res2);
    }


    // 切换
    var next = document.getElementById('tl-next');
    var prev = document.getElementById('tl-prev')
    var tl_commodity = document.getElementById('tl-commodity');

    var iw = tl_commodity.offsetWidth;
    var num = 0;
    next.onclick = function () {
        num++
        startMove(tl_commodity, { 'left': (num * -1218) });
        var right = css(tl_commodity, 'left');
        console.log(parseInt(right))
        if (parseInt(right) <= (-iw + 1218)) {
            startMove(tl_commodity, { 'left': 0 });
            num = 0;
        }
    }

    prev.onclick = function () {
        num--
        startMove(tl_commodity, { 'left': num * -1218 });
    }


    // 轮播图
    curIndex = 0;
    var autoChange = setInterval(function () {
        if (curIndex < $("#banner-fade li").length - 1) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        //调用变换处理函数
        changeTo(curIndex);
    }, 3000);

    $("#banner-fade").hover(function () {
        clearInterval(autoChange);
    }, function () {
        autoChange = setInterval(function () {
            if (curIndex < $("#banner-fade li").length - 1) {
                curIndex++;
            } else {
                curIndex = 0;
            }
            //调用变换处理函数
            changeTo(curIndex);
        }, 3000);
    });

    $("#focus").find("span").each(function (item) {
        $(this).mouseover(function () {
            clearInterval(autoChange);
            changeTo(item);
            curIndex = item;
        });
    });

    function changeTo(num) {
        $("#banner-fade").find("li").removeClass("fade").hide().eq(num).show().addClass("fade");

        $("#focus").find("span").removeClass("infoOn").eq(num).addClass("infoOn");
    }

    //回到顶部
    window.onscroll = function () {
        //在窗口滚动的时候触发
        var scrollTop = window.scrollY;
        if (scrollTop >= 1000) {
            $('#toTop').css('display', 'block');
        } else {
            $('#toTop').css('display', 'none');
        }

        //吸顶菜单
        var wh = window.innerHeight;
        var nh = window.scrollY;
        if (nh >= wh) {
            $('#adsorb-menu').css('display', 'block');
        } else {
            $('#adsorb-menu').css('display', 'none');
        }
    }

    $('#toTop').click(function () {
        //点击回到顶部，可以快速回到顶部
        var scrollTop = window.scrollY;//获取当前的滚动距离 
        var timer = setInterval(function () {
            scrollTop -= 500;//步长
            if (scrollTop <= 0) {//临界值
                clearInterval(timer);
                window.scrollTo(0, 0);
            } else {
                window.scrollTo(0, scrollTop);
            }
        }, 30);
    });


    //getCookie
    //获取用户名存到xx
    let name = getCookie('username');
    if (name) {
        $('#name').html('您好，' + '<a href="">' + name + '</a>');
        $('#exit').html('<a href="" class="col">退出</a>');
    }

    $("#exit").click(function () {
        removeCookie('username');
        //删除Cookie的存储信息
        $('#name').html('<a href="">登录</a>');
        $('#exit').html('<a href="">免费注册</a>');
    });


    //点击跳转带id
    $('#commodity-list').on('click', 'li', function () {
        var id = $(this).attr('data-id');
        // var kucun = $(this).attr('kucun')
        window.open('html/detail.html?' + id)
    });


});