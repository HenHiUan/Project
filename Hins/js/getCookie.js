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