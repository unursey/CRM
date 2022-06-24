"use strict";

const checkbox = document.querySelector(".add-product__checkbox");
const checkInput = document.querySelectorAll(".add-product__input")[3];

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkInput.disabled = false;
  } else {
    checkInput.disabled = true;
  }
});

/*const check = function (v) {
  let e = +prompt(v);
  if (!Number.isNaN(e)) {
    return e;
  } else {
    alert("Вы ввели некорректные данные!");
    return check(v);
  }
};

const question = function () {
  let productName = prompt("Наименование товара");
  let productCount = check("Количество товара");
  let productCategory = prompt("Категория товара");
  let productPrice = check("Цена товара");

  console.log(`Наименование товара: ${productName}`);
  console.log(`Количество товара: ${productCount}`);
  console.log(`Категория товара: ${productCategory}`);
  console.log(`Цена товара: ${productPrice}`);
  console.log(
    `На складе ${productCount} единицы товара "${productName}" на сумму ${
      productPrice * productCount
    } деревянных`
  );
};

question();*/

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
