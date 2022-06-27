"use strict";

const modalTitle = document.querySelector('.add-product__title');
const productId = document.querySelector('.add-product__id');
const buttonId = document.querySelector('.add-product__id-button');
const productForm = document.querySelector('.add-product__form');

const checkbox = document.querySelector(".add-product__checkbox");
const checkInput = document.querySelectorAll(".add-product__input")[3];
const sumPrice = document.querySelectorAll('.card-sum__price')[1];

const tableBody = document.querySelector('.list-product__table-body');

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkInput.disabled = false;
  } else {
    checkInput.disabled = true;
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
]
const createRow = ({id, title, category, units, count, price}) => {
  
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
    <td class=list-product__table-td>$${count*price}</td>
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

renderGoods(tableBody, data);

// const myData = {
//   productName: "",
//   productCount: "",
//   productCategory: "",
//   productPrice: "",

//   check: function (v) {
//     let e = +prompt(v);
//     if (!Number.isNaN(e)) {
//       return e;
//     } else {
//       alert("Вы ввели некорректные данные!");
//       return this.check(v);
//     }
//   },

//   question: function () {
//     this.productName = prompt("Наименование товара");
//     this.productCount = this.check("Количество товара");
//     this.productCategory = prompt("Категория товара");
//     this.productPrice = this.check("Цена товара");

//     console.log(`Наименование товара: ${this.productName}`);
//     console.log(`Количество товара: ${this.productCount}`);
//     console.log(`Категория товара: ${this.productCategory}`);
//     console.log(`Цена товара: ${this.productPrice}`);
//     console.log(
//       `На складе ${this.productCount} единицы товара "${
//         this.productName
//       }" на сумму ${this.productPrice * this.productCount} деревянных`
//     );
//   },
// };

// myData.question();
