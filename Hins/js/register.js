$(function () {



    var yzm = null;


    var onOff = true;
    $('#more').click(function () {
        if (onOff) {
            $('.loging-hide').show();
            $(this).html('更多&nbsp;∧')
        } else {
            $('.loging-hide').hide();
            $(this).html('更多&nbsp;∨')
        }
        onOff = !onOff;
    });

    //验证手机号码及查询是否被已被注册
    var isok = false;
    $('#tel-num').blur(function () {
        var telNum = ($('#tel-num').val());
        if (telNum) {
            var res = checkReg.tel(telNum);
            if (res) {
                ajax2({
                    type: 'get',
                    url: '../api/check.php',//查重接口
                    data: 'name=' + $('#tel-num').val(),
                    success: function (str) {
                        // console.log(str)
                        if (str == 'no') {
                            $('.p-num p').css('color', 'red');
                            $('.p-num p').html('该号码已被注册');
                            $('.p-num span').html('');
                            isok = false;

                            // isok = false; //验证不通过
                        } else {
                            $('.p-num span').html(' √');
                            $('.p-num span').css('color', '#58bc58');
                            $('.p-num p').html('');
                            isok = true;
                            // isok = true; //验证通过
                        }
                    }
                });


                // 短信验证码
                $('#yzm').css('color', '#3d3c3c');
                $('#yzm').click(function () {
                    countDown();

                    ajax2({
                        type: 'post',
                        url: '../api/duanxin.php',
                        data: 'userphone=' + $('#tel-num').val(),
                        success: function (str) {
                            console.log(str);
                            var obj = JSON.parse(str);
                            yzm = obj.phonecode;
                        }
                    });


                    // var str = '{"phonecode":124636,"message":{"reason":"操作成功","result":{"sid":"1905184420021929","fee":1,"count":1},"error_code":0}}';
                    // var obj = JSON.parse(str);
                    // yzm = obj.phonecode;
                    // console.log(yzm)

                });


            } else {
                $('.p-num p').html('手机号码输入错误');
                $('.p-num p').css('color', 'red');
                $('.p-num span').html('');
                $('#yzm').css('color', '#999');
            }
        } else {
            $('.p-num p').html('手机号码不能为空');
            $('.p-num p').css('color', 'red');
            $('.p-num span').html('');
        }
    });

    function countDown() {
        var sec = 60;
        var timer = null;
        timer = setInterval(function () {
            --sec;
            $('#yzm').html(sec + '秒后重新获取验证码');
            if (sec > 0) {
                $("#yzm").attr("disabled", true).css("pointer-events", "none");
            } else if (sec <= 0) {
                $('#yzm').html('点击获取手机验证码');
                $("#yzm").attr("disabled", false).css("pointer-events", "");
                clearInterval(timer);
            }
        }, 1000)
    };



    //密码格式正则
    var istrue = false;
    $('#password').blur(function () {
        var password = ($('#password').val());
        if (password) {
            var res = checkReg.psweasy(password);
            if (res) {
                $('.pas span').html(' √');
                $('.pas span').css('color', '#58bc58');
                $('.pas p').html('');
                istrue = true;
                // console.log(istrue)
            } else {
                $('.pas p').html('密码格式有误');
                $('.pas p').css('color', 'red');
                $('.pas span').html('');
                istrue = false;
                // console.log(istrue)
            }
        } else {
            $('.pas p').html('密码不能为空');
            $('.pas p').css('color', 'red');
            $('.pas span').html('');
        }
    });
    // console.log(istrue)

    //确认密码
    var istrue2 = false;
    $('#repeatPassword').blur(function () {
        var password = ($('#password').val());
        var repeatPassword = ($('#repeatPassword').val());;
        if (repeatPassword) {
            if (repeatPassword == password) {
                $('.pas-again span').html(' √');
                $('.pas-again span').css('color', '#58bc58');
                $('.pas-again p').html('');
                istrue2 = true;
            } else if (repeatPassword != password) {
                $('.pas-again p').html('输入不一致');
                $('.pas-again p').css('color', 'red');
                $('.pas-again span').html('');
                istrue2 = false
            }
        } else {
            $('.pas-again p').html('请再次确认密码');
            $('.pas-again p').css('color', 'red');
            $('.pas-again span').html('');
        }
    });


    //滑动验证
    var sliding = document.getElementById('sliding');
    var bgc = document.getElementById('bgc');
    var move = document.getElementById('move');
    var gou = document.getElementById('gou');
    var inf = document.getElementById('inf');
    var istrue3 = false;
    // console.log(bgc, move);
    move.onmousedown = function (ev) {
        var nowLoad = ev.offsetX;
        // console.log(nowLoad)
        move.onmousemove = function (ev) {
            var moved = ev.clientX - nowLoad - sliding.offsetLeft;
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
            var moved2 = ev.clientX - nowLoad - sliding.offsetLeft;
            if (isok) {
                if (moved2 < sliding.offsetWidth - move.offsetWidth) {
                    move.style.left = 0;
                    bgc.style.width = 0;
                    istrue3 = false;
                } else {
                    move.onmousedown = null;
                    gou.style.display = 'block';
                    bgc.innerHTML = '验证通过';
                    inf.innerHTML = '';
                    istrue3 = true;
                    isok = false;
                }
            }
            move.onmousemove = null;
        }
    }

    var istrue4 = false;
    $('.checkbox').click(function () {
        istrue4 = $(".checkbox[type='checkbox']").is(':checked');
    });


    //点击注册并跳转
    $('.agree').click(function () {

        if (isok && istrue && istrue2 && istrue3 && istrue4 && $('.verification').val() == yzm) {
            ajax2({
                type: 'post',
                url: '../api/register.php',
                data: 'name=' + $('#tel-num').val() + '&passw=' + $('#password').val(),
                success: function (str) {
                    if (str == 'yes') {
                        location.href = 'login.html?' + $('#tel-num').val(); //注册通跳转登录页面 带用户名
                    } else {
                        alert('注册失败')
                    }
                }
            });
        } else {
            alert('信息还需完善')
        }
        if ($('.verification').val() != yzm) {
            $('#yzmInf').html('验证码不一致');
            $('#yzmInf').css('color', 'red');
        }

    });











})