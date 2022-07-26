import { getElements } from "./getElements.js";
import { getTotal, getTotalTable } from "./calc.js";
import { isNumber } from "./calc.js";

import { createRow } from "./createElements.js";

import { fetchRequest, URL, getRenderTotalSum } from "./service.js";

const {
  productTable,
  addProduct,
  tBody,
  allProductSum,
  formOverlay,
  productId,
  buttonId,
  productSum,
  productForm,
  inputId,
  checkbox,
  checkInput,
  errorModal,
  warning,
} = getElements();

export const changeCheckbox = () => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      checkInput.disabled = false;
      checkInput.focus();
    } else {
      checkInput.disabled = true;
      checkInput.value = "";
    }
  });
};

const closeModal = () => {
  formOverlay.classList.remove("overlay_disabled");
  checkInput.disabled = true;
  productSum.textContent = "$ 0.00";
  productId.contentEditable = "false";
  productForm.reset();
};

export const addProductPage = (data) => {
  tBody.append(createRow(data));
};

export const newTotalSum = (err, data) => {
  if (err) {
    console.warn(err, data);
  }
  allProductSum.textContent = `$ ${getTotalTable(data).toFixed(2)}`;
  console.log("общая новая дата", data);
};

export const modalProductSum = () => {
  const inputPrice = productForm.querySelector("[name=price]");
  const inputCount = productForm.querySelector("[name=count]");
  const inputDiscount = productForm.querySelector("[name=discount]");
  productForm.addEventListener("change", () => {
    checkInput.value = checkInput.value.toUpperCase();
    const price = isNumber(inputPrice.value);
    const count = isNumber(inputCount.value);
    const discount = checkPromo(inputDiscount.value);

    productSum.textContent = `$ ${getTotal(price, count, discount).toFixed(2)}`;
  });
};

const checkPromo = (promo) => {
  //promo = promo.toUpperCase();
  if (promo === "METHED") {
    //checkInput.value = 15;
    return 15;
  } else if (promo === "NEWYEAR") {
    //checkInput.value = 5;
    return 5;
  } else {
    checkInput.value = "";
    return "";
  }
};

export const addOpenModal = () => {
  addProduct.addEventListener("click", () => {
    productId.textContent = `${Date.now().toString().slice(4)}`;
    formOverlay.classList.add("overlay_disabled");
  });
};

export const addCloseModal = () => {
  formOverlay.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target === formOverlay ||
      target.classList.contains("add-product__btnModal-close")
    ) {
      closeModal();
    }
  });
};

const addCloseError = () => {
  formOverlay.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("add-product__btnError-close") ||
      (e.target.closest(".add-product") &&
        !e.target.closest(".add-product__error"))
    ) {
      errorModal.style.display = "none";
    }
  });
};

export const delProduct = () => {
  productTable.addEventListener("click", (e) => {
    if (e.target.closest(".list-product__button-delete")) {
      //const id = e.target.dataset.id;

      fetchRequest(`${URL}/${e.target.dataset.id}`, {
        method: "DELETE",
        callback(err, data) {
          if (err) {
            console.warn(err, data);
          } else {
            e.target.closest(".list-product__table-tr").remove();
            getRenderTotalSum();
          }
        },
      });
    }
  });
};

export const editId = () => {
  buttonId.addEventListener("click", () => {
    productId.contentEditable = "true";
    productId.focus();
  });
};

export const addNewProduct = () => {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {};
    inputId.value = +productId.textContent;
    const formData = new FormData(productForm);

    formData.forEach((value, key) => {
      if (key !== "discount-checkbox") {
        product[key] = key === "price" || key === "count" ? +value : value;
      }
    });
    if (product.description.trim() === "") return;
    // if (!("discount" in product)) {
    //   product.discount = false;
    // }
    if (product.discount === "METHED") {
      product.discount = 15;
    } else if (product.discount === "NEWYEAR") {
      product.discount = 5;
    } else {
      product.discount = false;
    }

    fetchRequest(URL, {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      body: product,
      callback(err, data) {
        if ((err) || (data === null)) {
          console.log(err);
          const errNum = err.toString().replace(/[^0-9]/g, "");
          console.log(errNum);
          if (errNum == 404 || errNum == 422 || errNum > 500) {
            console.warn(err, data);
            warning.innerHTML = err;
          } else {
            errorModal.style.display = "flex";
            addCloseError();
            console.warn(err, data);
          }
        } else {
          closeModal();
          console.log("Новый товар", data);
          addProductPage(data);
          getRenderTotalSum();
        }
      },
    });
  });
};

export const openImg = () => {
  productTable.addEventListener("click", (e) => {
    if (e.target.closest(".list-product__button-img")) {
      const tr = e.target.closest("tr");
      const src = `${tr.dataset.pic}`;

      const top = screen.height / 2 - 600 / 2;
      const left = screen.width / 2 - 600 / 2;

      const win = open(
        src,
        "",
        `width=600, height=600, top=${top}, left=${left}`
      );
      win.focus();
    }
  });
};

// win.document.write(`<img src='${document.querySelectorAll('.list-product__table-tr')[index].dataset.pic}'
// alt='Киса лижет лапку' />`);

// win.document.body.innerHTML = `
// <img
// src='./img/ksks.jpg') alt='some text'
// alt="Киса лижет лапку"
// >
// `;
