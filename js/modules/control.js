import {getElements} from './getElements.js';
import { getTotal } from "./calc.js";
import { isNumber } from "./calc.js";
import { createRow } from "./createElements.js";
import { newTotalSum } from "./calc.js";

const {
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
    checkInput
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

// export const openModal = (formOverlay) => {
//   formOverlay.classList.add("overlay_disabled");
// };
const closeModal = () => {
  formOverlay.classList.remove("overlay_disabled");
  checkInput.disabled = true;
  productSum.textContent = "$ 0.00";
  productId.contentEditable = "false";
  productForm.reset();
};

export const addProductData = (data, product) => {
  data.push(product);
};

export const addProductPage = (product) => {
  tBody.append(createRow(product));
};

export const modalProductSum = () => {
  productForm.addEventListener("change", (e) => {
    checkInput.value = checkInput.value.toUpperCase();
    const price = isNumber(productForm.querySelector("[name=price]").value);
    const count = isNumber(productForm.querySelector("[name=count]").value);
    const discont = checkPromo(productForm.querySelector('[name=discont]').value); 
    
    productSum.textContent = `$ ${getTotal(price, count, discont).toFixed(2)}`;
    console.log(discont);
  });
};

const checkPromo = (promo) => {
    //promo = promo.toUpperCase();
    if (promo === 'METHED') {  
        //checkInput.value = 15; 
        return 15;  
      } else   
      if (promo === 'NEWYEAR') {   
        //checkInput.value = 5;
        return 15;
      } else {  
        checkInput.value = ''; 
        return '';   
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
      target.classList.contains("add-product__button-close")
    ) {
        closeModal()
    }
  });
};

export const delProduct = (tBody, data) => {
  tBody.addEventListener("click", (e) => {
    if (e.target.closest(".list-product__button-delete")) {
      data.splice(
        [...document.querySelectorAll(".list-product__button-delete")].indexOf(
          e.target
        ),
        1
      );
      e.target.closest(".list-product__table-tr").remove();
      newTotalSum(allProductSum, data);
    }
    console.log(data);
  });
};

export const editId = () => {
  buttonId.addEventListener("click", () => {
    productId.contentEditable = "true";
    productId.focus();
  });
};

export const addNewProduct = (data) => {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = {};
    inputId.value = +productId.textContent;
    const formData = new FormData(productForm);

    formData.forEach((value, key) => {
      if (key !== "discount-checkbox") {
        product[key] =
          key === "price" || key === "count" 
            ? +value
            : value;
      }
    });
    if (product.description.trim() === "") return;
    // if (!("discont" in product)) {
    //   product.discont = false;
    // }
    if (product.discont === 'METHED') {
        product.discont = 15
  } else if (product.discont === 'NEWYEAR') {
        product.discont = 5
  } else {
        product.discont = false
  }

    addProductData(data, product);
    addProductPage(product);
    newTotalSum(allProductSum, data);
    closeModal();
    console.log(data);
    console.log(product);
  });
};
