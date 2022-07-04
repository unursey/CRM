"use strict";

const addProduct = document.querySelector('.list-product__table-add');
const tBody = document.querySelector('.list-product__table-body');

const modalTitle = document.querySelector('.add-product__title');
const productId = document.querySelectorAll('.add-product__id')[1];

const buttonId = document.querySelector('.add-product__id-button');
const formOverlay = document.querySelector('.overlay');
const productForm = document.querySelector('.add-product__form');
const inputId = productForm.querySelectorAll('.add-product__input')[0];

const productSum = formOverlay.querySelector('.card-sum__price');
const allProductSum = document.querySelector('.list-product .card-sum__price');

const checkbox = productForm.querySelector(".add-product__checkbox");
const checkInput = productForm.querySelectorAll(".add-product__input")[4];

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkInput.disabled = false;
    checkInput.focus();
  } else {
    checkInput.disabled = true;
    checkInput.value = '';
  }
});

const data = [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 215796548,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 246258248,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "v",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
];

const addProductData = product => {
  data.push(product);
};

const setDiscount = (discont) => (discont ? (100 - discont) / 100 : 1);

const getTotal = (price, count, discont) => {
  if (price <= 0 || count <= 0) return 0
  return price * count * setDiscount(discont)
};

const getTotalTable = (prices = []) => {
  return prices.reduce(
    (acc, { count, price, discont }) => acc + getTotal(price, count, discont),
    0
  )
};

const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num) ? +num : null
};

const newTotalSum = () => {
  allProductSum.textContent = `$ ${getTotalTable(data).toFixed(2)}`;
};
newTotalSum();

productForm.addEventListener('change', () => {
  const price = isNumber(productForm.querySelector('[name=price]').value)
  const count = isNumber(productForm.querySelector('[name=count]').value)
  const discont = isNumber(productForm.querySelector('[name=discont]').value)
  productSum.textContent = `$ ${getTotal(price, count, discont).toFixed(2)}`;
});


const createRow = ({id, title, category, units, count, price, discont}) => {
  
  // const tr = document.createElement('tr');
  // tr.classList.add('list-product__table-tr');
  // const tdId = document.createElement('td');
  // tdId.textContent = id;
  // const tdTitle = document.createElement('td');
  // tdTitle.textContent = title;
  // const tdCategory = document.createElement('td');
  // tdCategory.textContent = category;
  // const tdUnits = document.createElement('td');
  // tdUnits.textContent = units;
  // const tdCount = document.createElement('td');
  // tdCount.textContent = count;
  // const tdPrice = document.createElement('td');
  // tdPrice.textContent = price;

  // tr.append(tdId, tdTitle, tdCategory, tdUnits, tdCount, tdPrice);
  // return tr;

  const tr = document.createElement('tr'); 
  tr.classList.add('list-product__table-tr'); 
  tr.insertAdjacentHTML('afterbegin', `
    <td class=list-product__table-td>${id}</td>
    <td class=list-product__table-td>${title}</td>
    <td class=list-product__table-td>${category}</td>
    <td class=list-product__table-td>${units}</td>
    <td class=list-product__table-td>${count}</td>
    <td class=list-product__table-td>$${price}</td>
    <td class=list-product__table-td>$${getTotal(
      price,
      count,
      discont
    ).toFixed(2)}</td>
    <td class=list-product__table-td>
      <button class='list-product__table-button list-product__button-img' aria-label="image"></button>
      <button class='list-product__table-button list-product__button-edit' aria-label="edit"></button>
      <button class='list-product__table-button list-product__button-delete' aria-label="delete"></button>
    </td> 
  `);
  return tr;
};

const renderGoods = (elem, data) => {
  const allRow = data.map(createRow);

  elem.append(...allRow); 
};

renderGoods(tBody, data);

// const handleForm = () => {
//   formOverlay.classList.toggle("overlay_disabled");
// };
// const toggleForm = (e) => {
//   if (formOverlay.classList.contains("overlay_disabled")) {
//     if (!e.target.closest(".add-product")) {
//       handleForm();
//     } else if (e.target.classList.contains("add-product__button-close")) {
//       e.preventDefault();
//       handleForm();
//     }
//   } else if (e.target.closest(".add-product")) {
//     handleForm();
//   }
// };
// formOverlay.addEventListener("click", toggleForm);
const openModal = () => {
  formOverlay.classList.add('overlay_disabled');
};
const closeModal = () => {
  formOverlay.classList.remove('overlay_disabled');
};

addProduct.addEventListener('click', () => {
  productId.textContent = `${Date.now().toString().slice(4)}`;
  openModal();
});

formOverlay.addEventListener('click', (e) => {
  const target = e.target;
  if (target === formOverlay || target.classList.contains('add-product__button-close')) {
    closeModal();
  }
});

  tBody.addEventListener('click', (e) => {
    if (e.target.closest('.list-product__button-delete')) {
      data.splice([...document.querySelectorAll('.list-product__button-delete')]
      .indexOf(e.target), 1);
      e.target.closest('.list-product__table-tr').remove();
      newTotalSum();
    }
    console.log(data);
  }); 
  
console.log(data);

buttonId.addEventListener('click', () => {
  productId.contentEditable = 'true';
  productId.focus();
});

const addProductPage = (product, tBody) => {
  tBody.append(createRow(product))
};
 
productForm.addEventListener('submit', e => {
  e.preventDefault();
  inputId.value = +productId.textContent;

  const formData = new FormData(e.target);
  const newProduct = Object.fromEntries(formData);
  console.log('newProduct: ', newProduct);

  addProductPage(newProduct, tBody);
  addProductData(newProduct);
  productId.contentEditable = 'false';
  productForm.reset();
  closeModal();
  checkInput.disabled = true;
  inputId.value = '$ 0.00';
  newTotalSum();
});
