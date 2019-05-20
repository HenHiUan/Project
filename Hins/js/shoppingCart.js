$(function () {

	//添加数量
	$('.cart-item').on('click', '.add', function () {
		var num = $(this).prev().val();
		var kucun = $(this).parent().parent().attr('kucun');
		num++;
		if (num >= parseInt(kucun)) {
			num = kucun;
		}
		$(this).prev().val(num);
		total($(this));
	});

	//减少数量
	$('.cart-item').on('click', '.cut', function () {
		var num = $(this).next().val();
		num--;
		if (num <= 1) {
			num = 1;
		}
		$(this).next().val(num);
		total($(this));
	})

	//输入数量
	$('.cart-item').on('input', '#num', function () {
		var num = $(this).val();
		var kucun = $(this).parent().parent().attr('kucun');
		
		if (num <= 1) {
			num = 1;
		} else if (num >= parseInt(kucun)) {
			num = kucun;
		}
		$(this).val(num);
		total($(this));//刷新小计
	});

	//小计的计算
	function total(now) {
		//找到数量
		var num = $(now).parent().find('#num').val();
		//找到单价
		var price = $(now).parent().prev().text();
		//小计=数量*单价
		var xiaoji = (num * price).toFixed(2);
		//console.log(num,price,xiaoji);
		$(now).parent().next().html('￥ ' + xiaoji);
		all();
	}

	//删除当行
	$('.cart-item').on('click', '.del', function () {
		var res = confirm('您确认要删除吗？');
		if (res) {
			$(this).parent().parent().remove();
		}
		all();
		update();
		$('.carts-num').html($('.goods').size());	
	});


	//全选
	$('.all-check').click(function () {
		var istrue = $('.all-check').prop('checked');
		$('.inp input').prop('checked', istrue);
		$('.all-check2').prop('checked', istrue);
		all();
	});
	$('.all-check2').click(function () {
		var istrue = $('.all-check2').prop('checked');
		$('.inp input').prop('checked', istrue);
		$('.all-check').prop('checked', istrue);
		all();
	});


	//计算总数量和总价格
	var arr = [];
	function all() {
		arr = [];//存被勾选的复选框的下标
		$('.inp input').each(function (i, item) {
			if ($(item).prop('checked')) {
				//被勾选了，把下标存起来
				arr.push(i);
			}
		});

		//总数量
		var num = 0;
		//总价格
		var price = 0;

		arr.forEach(function (item) {
			num += $('.nownum').eq(item).val() * 1;
			price += $('.sp-price').eq(item).text().slice(2) * 1;
		});
		// console.log(num)

		// console.log(num,price.toFixed(2));

		//渲染到节点
		$('.m-t span').html(num);
		$('.howmuch i').html('￥' + price.toFixed(2));

	}

	$('.cart-item').on('click', '.inp input', function () {
		var len = $('.inp input:checked').size();
		var total = $('.inp input').size();
		if (len == total) {
			//全都勾选了
			$('.all-check').prop('checked', true);
			$('.all-check2').prop('checked', true);
		} else {
			$('.all-check').prop('checked', false);
			$('.all-check2').prop('checked', false);
		}
		all();//刷新总数量和总价格
	});

	//全删
	$('.all-del').click(function () {
		var res = confirm('您确定要删除吗?');
		if (res) {
			for (var i = arr.length - 1; i >= 0; i--) {//从数组的尾部开始删除
				$('.cart-item li').eq(arr[i]).remove();
			}
			all();//刷新总数量和总价格
			update();
			$('.carts-num').html($('.goods').size());
		}
			
	});

	function update() {
		var len = $('.goods').size();
		if(len == 0) {
			$('.accounts').hide();
			$('.all-check').prop('checked', false);
			$('.cart-item').html('<img src="../images/qgg.png" alt="">')
		}else{
			$('.accounts').show();
		}
	}

	$('.carts-num').html($('.goods').size());


	ajax2({
		type:'get',
		url:'../api/shoppingCarts.php',
		success:function(str){
			create(str);
			// console.log(str);
			
		}
	});

	function create(str){
		var arr = JSON.parse(str);
		var res = arr.map(function (item) {
			return `<li class="goods" data-uid="${item.uid}" kucun="${item.kucun}">
			<div class="inp">
				<input type="checkbox" name="" id="">
			</div>
			<div class="sp-inf">
				<p class="pic">
					<img src="${item.img}" alt="">
				</p>
				<p class="title">
					<a href="">${item.title}</a>
					<span title="本商品支持7天无理由退货">
						7
					</span>
				</p>
				<p class="color-size">
					<span>颜色:</span>
					<i>${item.color}</i>
					<br>
					<span>尺码:</span>
					<i>${item.size}</i>
				</p>
			</div>
			<div class="discounts">
				<span>${item.sprice}</span>
				<br>
				
			</div>
			<div class="amount">
					<i class="cut">-</i>

					<input type="text" name="" id="num" class="nownum" value="${item.amount}" oninput = "value=value.replace(/[^0-9]/g,'')">

					<i class="add">+</i>
			</div>
			<div class="sp-price">
				<span>${item.price}</span>
			</div>
			<div class="handle">
				<a href="###" class="del">删除</a>
				<br>
				<a href="###">移入收藏</a>
			</div>
		   
		</li>`

		}).join('');
		$('.cart-item').html(res);
		$('.carts-num').html($('.goods').size());
	}
 
	$('.cart-item').on('click','.del',function(){
		var id = $(this).parent().parent().attr('data-uid');
		// console.log(id);
		ajax2({
			type:'get',
			url:'../api/shoppingCarts.php',
			data:'uid='+ id,
			success:function(str){

			}
		})
	});


});