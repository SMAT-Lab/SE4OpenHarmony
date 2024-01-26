let productList = [
  {
    'id': 1,
    'name': 'HW nove9 新品手机【官方标配】8+128G全网通',
    'img': 'imgs/ic_1.png',
    'price': 4488
  },
  {
    'id': 2,
    'name': 'XX设备  新品优惠！新品优惠！新品优惠！',
    'img': 'imgs/ic_2.png',
    'price': 4488
  },
  {
    'id': 3,
    'name': 'HW nove9 新品手机【官方标配】8+128G全网通',
    'img': 'imgs/ic_3.png',
    'price': 4488
  },
  {
    'id': 4,
    'name': 'XX设备  新品优惠！新品优惠！新品优惠！',
    'img': 'imgs/ic_4.png',
    'price': 4488
  },
  {
    'id': 5,
    'name': 'HW nove9 新品手机【官方标配】8+128G全网通',
    'img': 'imgs/ic_5.png',
    'price': 4488
  },
  {
    'id': 6,
    'name': 'HW nove9 新品手机【官方标配】8+128G全网通',
    'img': 'imgs/ic_6.png',
    'price': 4488
  }
];

let urlSearchParams = new URLSearchParams(window.location.search);
let productIndex = urlSearchParams.get('index');
let productDetail = productList[productIndex];
productDetail.sku = '冰晶蓝，8GB+128GB，4G网网通，官电视剧还是快点好4G网网通';
let swiperStr = '<img alt="" class="showing" src="' + productDetail.img + '" />';
for (let i = 0; i < 3; i++) {
  swiperStr += '<img alt="" src="imgs/ic_' + ((productDetail.id + i) % 6 + 1) + '.png" />'
}
swiperStr += '<div id="dot" >1/4</div>';
document.getElementById('swiper').innerHTML = swiperStr;
document.getElementById('price').innerHTML = '<span>¥ </span>' + productDetail.price;
document.getElementById('product-name').innerHTML = productDetail.name;

let currentIndex = 0;
let images = document.querySelectorAll('#swiper img');

function showNext() {
  var currentImg = document.querySelector('.showing');
  if (currentImg) {
    currentImg.classList.remove('showing');

    currentIndex += 1;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    var dot = document.querySelector('#dot');
    dot.innerHTML = (currentIndex + 1) + '/4';
    images[currentIndex].classList.add('showing');
  } else {
    images[0].classList.add('showing');
  }
}

setInterval(showNext, 2000);

function orderConfirm() {
  arkTSFunObj.jumpOrderConfirm(JSON.stringify(productDetail));
}
