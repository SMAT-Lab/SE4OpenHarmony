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

function addDocument() {
  let list = '';
  for (let i = 0; i < productList.length; i++) {
    list += `<li onclick='jumpDetail(${i})'>`;
    list += `<img alt='' src='${productList[i].img}' />`;
    list += '<div>';
    list += `<p>${productList[i].name}</p>`;
    list += `<span><span>¥</span> ${productList[i].price}</span>`;
    list += '</div>';
    list += '</li>';

    let tmp = document.getElementById('productList');
    tmp.innerHTML = list; // 添加到div里
  }
}

addDocument();

function jumpDetail(index) {
  window.location.href = 'product_detail.html?index=' + index;
}
