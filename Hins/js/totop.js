window.onscroll = function () {
    //在窗口滚动的时候触发
    var scrollTop = window.scrollY;
    if (scrollTop >= 1000) {
        $('#toTop').css('display','block');
    } else {
        $('#toTop').css('display','none');
    }
}

$('#toTop').click(function(){
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