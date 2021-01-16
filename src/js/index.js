import '../js/library/jquery.js';

/* ajax请求数据 */
$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function (res) {
        //console.log(res);
        /* 声明一个空字符串 */
        let temp = '';
        res.forEach((elem, i) => {
            /* 遍历图片数组 */
            let pic = JSON.parse(elem.picture);
            //console.log(pic);
            /* 进行模板字符串拼接 */
            temp += ` 
            <li class="mobile-products mobile-products-m mobile-products-m-2">
                                    <a href="../html/productDetails.html">
                                        <div class="product product-img">
                                            <img src="${pic[0].src}" alt="" lazy="loaded">
                                        </div>
                                        <h3 class="title">${elem.title}</h3>
                                        <p class="desc">${elem.details}</p>
                                        <p class="price">
                                            <span class="num">${elem.price}</span>元<span>起</span>
                                        </p>
                                    </a>
                                </li>
            `;
        });
        /* 将拼接好的模板字符串添加到页面中 */
        $('.brick-list').append(temp);
    }
});

//轮播图
$(function () {
    //转成DOM对象
    var moveleft = $('.swiper-btn-prev');
    var moveright = $('.swiper-btn-next');

    //遍历分页器添加索引值
    var pagechangebtns = $('.swiper-pagination-bullet');
    for (var i = 0; i < pagechangebtns.length; i++) {
        pagechangebtns[i].index = i;
    }
    /* 将第一张图片设置为可见 */
    $('#homeSwiper .swiper-slide').eq(0).css({
        opacity: '1'
    });
    $('.swiper-pagination-bullet').eq(0).addClass('swiper-pagination-bullet-active');

    //注册点击事件函数
    var slideImgs = $('#homeSwiper .swiper-slide');
    $('.swiper-pagination-bullet').on('click', function () {
        var index = this.index;
        slideImgs.eq(index).css({
            opacity: '1'
        }).siblings().css({
            opacity: '0'
        });
        slideImgs.eq(index).fadeIn(800).siblings().fadeOut(800);
        $(this).addClass('swiper-pagination-bullet-active').siblings().removeClass('swiper-pagination-bullet-active');
    });
    //向左移动事件函数
    var keyIndex = 0;
    function moveLeft() {
        keyIndex--;
        if (keyIndex < 0) {
            keyIndex = slideImgs.length - 1;
        }
        slideImgs.eq(keyIndex).css({
            opacity: '1'
        }).siblings().css({
            opacity: '0'
        });
        slideImgs.eq(keyIndex).stop().fadeIn(800).siblings().stop().fadeOut(800);

        $('.swiper-pagination-bullet').eq(keyIndex).addClass('swiper-pagination-bullet-active').siblings().removeClass('swiper-pagination-bullet-active');
    };
    /* 左键添加点击事件 */
    //moveleft.on('click', moveLeft);
    moveleft.click(moveLeft);

    /* 向右移动点击事件 */
    function moveRight() {
        keyIndex++;
        if (keyIndex > slideImgs.length) {
            keyIndex = 0;
        };
        slideImgs.eq(keyIndex).css({
            opacity: '1'
        }).siblings().css({
            opacity: '0'
        });
        slideImgs.eq(keyIndex).stop().fadeIn(800).siblings().stop().fadeOut(800);

        $('.swiper-pagination-bullet').eq(keyIndex).addClass('swiper-pagination-bullet-active').siblings().removeClass('swiper-pagination-bullet-active');
    };
    //向左按钮点击事件
    //moveright.on('click', moveRight);
    moveright.click(moveRight);
    //定时器实现轮播
    var timer = setInterval(moveRight, 3000);
    // 当鼠标停在轮播图上面停止滑动，移开后恢复滑动
    $('#homeSwiper').hover(function () {
        clearInterval(timer);
    });
});
