import {getElements} from './getElements.js';
import { getTotal, getTotalTable } from "./calc.js";
import { isNumber } from "./calc.js";
import { createRow } from "./createElements.js";

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

export const newTotalSum = (allProductSum, data) => {
  allProductSum.textContent = `$ ${getTotalTable(data).toFixed(2)}`;
};

export const modalProductSum = () => {
  const inputPrice = productForm.querySelector("[name=price]");
  const inputCount = productForm.querySelector("[name=count]");
  const inputDiscont = productForm.querySelector('[name=discont]');
  productForm.addEventListener("change", () => {
    checkInput.value = checkInput.value.toUpperCase();
    const price = isNumber(inputPrice.value);
    const count = isNumber(inputCount.value);
    const discont = checkPromo(inputDiscont.value); 
    
    productSum.textContent = `$ ${getTotal(price, count, discont).toFixed(2)}`;
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
        return 5;
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
    console.log(product);
    console.log(data);
  });
};

export const openImg = () => {
  const buttonImg = document.querySelectorAll(".list-product__button-img");
  buttonImg.forEach((btn) => {
    btn.addEventListener("click", () => {

      const tr = btn.closest('tr');
      const src = `${tr.dataset.pic}`;

      const top = screen.height/2 - 600/2;
      const left = screen.width/2 - 600/2;

      const win = open(src, '', `width=600, height=600, top=${top}, left=${left}`);
      win.focus();

      // win.document.write(`<img src='${document.querySelectorAll('.list-product__table-tr')[index].dataset.pic}'
      // alt='Киса лижет лапку' />`);

      // win.document.body.innerHTML = `
      // <img
      // src='./img/ksks.jpg') alt='some text'
      // alt="Киса лижет лапку"
      // >
      // `;
    })
  
  })
};
