$(function () {
    $('.login-manner2').click(function () {
        $('.right2').css('display', 'none');
        $('.right').css('display', 'block')
    });
    $('.login-manner').click(function () {
        $('.right').css('display', 'none');
        $('.right2').css('display', 'block')
    });

    $('#tab-login').click(function () {
        $('.login-input2').css('display', 'none');
    });
    $('#tab-login2').click(function () {
        $('.login-input2').css('display', 'block')
    });

    $('.pas-login').click(function () {
        $('.right2').css('display', 'none');
        $('.right').css('display', 'block')
    });


    //滑动验证
    var sliding = document.getElementById('sliding');
    var bgc = document.getElementById('bgc');
    var move = document.getElementById('move');
    var gou = document.getElementById('gou');
    var inf = document.getElementById('inf');
    var right = document.getElementById('right');
    var login = document.getElementById('login-input');
    var mian = document.getElementById('main');
    var loginC = document.getElementById('login-c');
    
    var istrue = false;
    move.onmousedown = function (ev) {
        var nowLoad = ev.offsetX;
        // console.log(nowLoad)
        move.onmousemove = function (ev) {
            var moved = ev.clientX - nowLoad - sliding.offsetLeft - right.offsetLeft - login.offsetLeft - mian.offsetLeft - loginC.offsetLeft;
            console.log(moved)
            // console.log(moved)
            if (moved < 0) {
                moved = 0
            } else if (moved >= sliding.offsetWidth - move.offsetWidth) {
                moved = sliding.offsetWidth - move.offsetWidth;
            }
            move.style.left = moved + 'px'
            bgc.style.width = moved + 'px';
        }
        var isok = true;
        document.onmouseup = function (ev) {
            var moved2 = ev.clientX - nowLoad - sliding.offsetLeft - right.offsetLeft - login.offsetLeft - mian.offsetLeft - loginC.offsetLeft;;
            if (isok) {
                if (moved2 < sliding.offsetWidth - move.offsetWidth) {
                    move.style.left = 0;
                    bgc.style.width = 0;
                    istrue = false;
                } else {
                    move.onmousedown = null;
                    gou.style.display = 'block';
                    bgc.innerHTML = '验证通过';
                    inf.innerHTML = '';
                    istrue = true;
                    isok = false;
                }
            }
            move.onmousemove = null;
        }
    }


    // let str = location.search.slice(1); //把带过来的用户名进行截取
    let str = decodeURI(location.search.slice(1)); //decodeERL()中文转码
    $('#username').val(str);
    // console.log(str)

    $('#login').click(function () {
        if (getCookie('username')) {
            alert('请先退出当前账号')
        } else {
            ajax2({
                type: 'post',
                url: '../api/login.php',
                data: 'name=' + $('#username').val() + '&passw=' + $('#password').val(),
                success: function (str) {
                    if (str == 'yes' && istrue) {//存在
                        location.href = '../index.html';//跳转首页
                        setCookie('username', $('#username').val(), 1);//把数据存在Cookie中，保存1天
                    } else {
                        alert('登录失败')
                    }
                }
            })
        }

    });

})