"use strict";

const modalTitle = document.querySelector('.add-product__title');
console.log(modalTitle);
const productId = document.querySelector('.add-product__id');
console.log(productId);
const buttonId = document.querySelector('.add-product__id-button');
console.log(buttonId);
const productForm = document.querySelector('.add-product__form');
console.log(productForm);

const checkbox = document.querySelector(".add-product__checkbox");
console.log(checkbox);
const checkInput = document.querySelectorAll(".add-product__input")[3];
console.log(checkInput);
const sumPrice = document.querySelectorAll('.card-sum__price')[1];
console.log(sumPrice);


checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkInput.disabled = false;
  } else {
    checkInput.disabled = true;
  }
});



const myData = {
  productName: "",
  productCount: "",
  productCategory: "",
  productPrice: "",

  check: function (v) {
    let e = +prompt(v);
    if (!Number.isNaN(e)) {
      return e;
    } else {
      alert("Вы ввели некорректные данные!");
      return this.check(v);
    }
  },

  question: function () {
    this.productName = prompt("Наименование товара");
    this.productCount = this.check("Количество товара");
    this.productCategory = prompt("Категория товара");
    this.productPrice = this.check("Цена товара");

    console.log(`Наименование товара: ${this.productName}`);
    console.log(`Количество товара: ${this.productCount}`);
    console.log(`Категория товара: ${this.productCategory}`);
    console.log(`Цена товара: ${this.productPrice}`);
    console.log(
      `На складе ${this.productCount} единицы товара "${
        this.productName
      }" на сумму ${this.productPrice * this.productCount} деревянных`
    );
  },
};

//myData.question();
