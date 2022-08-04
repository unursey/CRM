import { loadStyle } from "./loadStyle.js";
import { isNumber, getTotal } from "./calc.js";
import { addProductPage } from "./table.js";
import { fetchRequest, URL, urlPic, getRenderTotalSum } from "./service.js";
import { renderGoods } from "./createTable.js";
import { addFileImg, toBase64, loadImg } from "./addFileImg.js";
import { valid, validate } from "./valid.js";

export const showModal = async (err, data) => {
  await loadStyle("css/add-product.css");
  if (err) {
    console.warn(err, data);
    return;
  }
  const obj = {
    titleHead: "Добавить товар",
    id: "", //Date.now().toString().slice(4),
    title: "",
    category: "",
    units: "",
    discount: "",
    description: "",
    count: "",
    price: "",
    image: "",
  };

  if (data) {
    obj.titleHead = "Изменить товар";
    obj.id = data.id;
    obj.title = data.title;
    obj.category = data.category;
    obj.units = data.units;
    obj.discount = data.discount;
    obj.description = data.description;
    obj.count = data.count;
    obj.price = data.price;
    if (data.image === "image/notimage.jpg") {
      obj.image = "";
    } else {
      obj.image = `${urlPic}${data.image}`;
    }
  }

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="add-product">
        <div class="add-product__header">
          <h2 class="add-product__title">${obj.titleHead}</h2>

          <div class="add-product__id-block">
            <div class="add-product__id">id: </div>
            <div class="add-product__id">${obj.id}</div>

            <button class="add-product__id-button" aria-label="Редактировать номер товара"></button>
          </div>
        </div>

        <form id="form" class="add-product__form">
          <fieldset class="add-product__fieldset">
            <input class="add-product__input" type="hidden" name="id" value="">

            <label class="add-product__label add-product__label-name">
              Наименование
              <input
                class="add-product__input add-product__input-name"
                type="text"
                name="title"
                value="${obj.title}"
                required
              />
            </label>

            <label class="add-product__label add-product__label-category">
              Категория
              <input
                class="add-product__input add-product__input-name"
                type="text"
                name="category"
                value="${obj.category}"
                required
              />
            </label>

            <label class="add-product__label add-product__label-units">
              Единицы измерения
              <input
                class="add-product__input add-product__input-units"
                type="text"
                name="units"
                value="${obj.units}"
                required
              />
            </label>

            <label class="add-product__label add-product__label-discount" for="discount"> Дисконт </label>

            <div class="add-product__discount">
              <input
                class="add-product__checkbox"
                type="checkbox"
                name="discount-checkbox"
              />

              <input
                class="add-product__input"
                id="discount"
                type="text"
                name="discount"
                value="${obj.discount}"
                disabled
                required
              />
            </div>

            <label class="add-product__label add-product__label-description">
              Описание
              <textarea
                class="add-product__input add-product__input-name add-product__input_large"
                name="description"
                required
              >${obj.description}</textarea>
            </label>

            <label class="add-product__label add-product__label-count">
              Количество
              <input
                class="add-product__input add-product__input-num"
                type="number"
                name="count"
                value="${obj.count}"
                required
              />
            </label>

            <label class="add-product__label add-product__label-price">
              Цена
              <input
                class="add-product__input add-product__input-num"
                type="number"
                name="price"
                value="${obj.price}"
                required
              />
            </label>

            <label class="add-product__label add-product__label-image">
              Добавить изображение
              <input class="add-product__input add-product__input-image" type="file" name="image" accept="image/*">
            </label>

            <div class="add-product__warning"></div>

            <div class="add-product__file-block">
              <img class="add-product__file-img" src="${obj.image}">
            </div>
           
          </fieldset>
        </form>

        <div class="add-product__total-block">
          <div class="add-product__sum card-sum">
            <span class="card-sum__text">Итоговая стоимость:</span>
            <span class="card-sum__price">$ ${getTotal(
              obj.price,
              obj.count,
              obj.discount
            ).toFixed(2)}</span>
          </div>
  
          <button form="form" class="add-product__button" type="submit">
            Добавить товар
          </button>
        </div>

        <button class="add-product__button-close add-product__btnModal-close" aria-label="close">
        </button>

        <div class="add-product__error"> 
          <button class="add-product__button-close add-product__btnError-close add-product__button-close_top_max" aria-label="close">
          </button>

          <svg
            class="add-product__img-error"
            xmlns="http://www.w3.org/2000/svg"
            >
            <use href="./img/img.svg#error"></use>
          </svg>

          <p class="add-product__text-error">Что-то пошло не так</p>
        </div>
      </div>
        `
  );

  document.body.append(overlay);

  document.body.style.overflow = "hidden";

  const img = document.querySelector(".add-product__file-img");

  if (obj.image !== "") {
    loadImg(img, obj.image);
  }

  checked(obj.discount);
  valid();
  addCloseModal();
  changeCheckbox();
  modalProductSum(overlay);
  addNewProduct(obj.id, img);
  addFileImg(img);
  deleteImg(overlay, img);
};

const addCloseModal = () => {
  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", (e) => {
    if (
      e.target === overlay ||
      e.target.classList.contains("add-product__btnModal-close")
    ) {
      overlay.remove();
      document.body.style.overflow = "";
    }
  });
};

const checked = (discount) => {
  const checkbox = document.querySelector(".add-product__checkbox");
  const checkInput = document.querySelectorAll(".add-product__input")[4];
  if (discount !== 0 && discount !== "") {
    checkbox.setAttribute("checked", "");
    checkInput.disabled = false;

    if (discount === 15) {
      checkInput.value = "METHED";
    } else if (discount === 5) {
      checkInput.value = "NEWYEAR";
    } else if (discount === 10) {
      checkInput.value = "SALE";
    } else if (discount === 20) {
      checkInput.value = "JARA2022";
    } else if (discount === 40) {
      checkInput.value = "1XBET";
    }
  } else {
    checkInput.value = "";
  }
};

const changeCheckbox = () => {
  const checkbox = document.querySelector(".add-product__checkbox");
  const checkInput = document.querySelectorAll(".add-product__input")[4];
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

export const modalProductSum = (overlay) => {
  const productForm = overlay.querySelector(".add-product__form");
  const productSum = overlay.querySelector(".card-sum__price");
  const checkInput = overlay.querySelectorAll(".add-product__input")[4];

  const inputPrice = productForm.querySelector("[name=price]");
  const inputCount = productForm.querySelector("[name=count]");
  const inputDiscount = productForm.querySelector("[name=discount]");
  productForm.addEventListener("change", () => {
    checkInput.value = checkInput.value.toUpperCase();
    const price = isNumber(inputPrice.value);
    const count = isNumber(inputCount.value);
    const discount = checkPromo(inputDiscount.value, checkInput);

    productSum.textContent = `$ ${getTotal(price, count, discount).toFixed(2)}`;
  });
};

const checkPromo = (promo, checkInput) => {
  //promo = promo.toUpperCase();
  if (promo === "METHED") {
    //checkInput.value = 15;
    return 15;
  } else if (promo === "NEWYEAR") {
    //checkInput.value = 5;
    return 5;
  } else if (promo === "SALE") {
    return 10;
  } else if (promo === "JARA2022") {
    return 20;
  } else if (promo === "1XBET") {
    return 40;
  } else {
    checkInput.value = "";
    return "";
  }
};

const addCloseError = () => {
  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("add-product__btnError-close") ||
      (e.target.closest(".add-product") &&
        !e.target.closest(".add-product__error"))
    ) {
      document.querySelector(".add-product__error").style.display = "none";
    }
  });
};

// const editId = () => {
//   buttonId.addEventListener("click", () => {
//     productId.contentEditable = "true";
//     productId.focus();
//   });
// };

const addNewProduct = (id, img) => {
  const productForm = document.querySelector(".add-product__form");
  const warning = document.querySelector(".add-product__warning");
  const inputId = document.querySelector(".add-product__input");
  const productId = document.querySelectorAll(".add-product__id")[1];

  productForm.addEventListener("submit", async (e) => {
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

    if (product.discount === "METHED") {
      product.discount = 15;
    } else if (product.discount === "NEWYEAR") {
      product.discount = 5;
    } else if (product.discount === "SALE") {
      product.discount = 10;
    } else if (product.discount === "JARA2022") {
      product.discount = 20;
    } else if (product.discount === "1XBET") {
      product.discount = 40;
    } else {
      product.discount = false;
    }

    if (product.image.size === 0 && img.src) {
      delete product.image;
    } else {
      product.image = await toBase64(product.image); 
    }
    
    if (validate(product)) {
      if (id) {
        document.querySelectorAll(".list-product__table-tr").forEach((item) => {
          if (item.dataset.id === `${id}`) {
            fetchRequest(`${URL}/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: product,
              callback(err, data) {
                console.log("Какая то дата", data);
                if (err || data === null) {
                  handlingErrors(err, data);
                } else {
                  document.querySelector(".overlay").remove();
                  document.body.style.overflow = "";
                  //console.log("Измененный товар", product);
                  renderGoods(err, data, item);
                  getRenderTotalSum();
                }
              },
            });
          }
        });
      } else {
        fetchRequest(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: product,
          callback(err, data) {
            if (err || data === null) {
              handlingErrors(err, data);
            } else {
              document.querySelector(".overlay").remove();
              document.body.style.overflow = "";
              //console.log("Новый товар", data);
              addProductPage(data);
              getRenderTotalSum();
            }
          },
        });
      }
    } else {
      warning.innerHTML = "Данные не валидны!";
    }
  });
};

const handlingErrors = (err, data) => {
  const warning = document.querySelector(".add-product__warning");
  console.log(err);
  const errNum = err.toString().replace(/[^0-9]/g, "");
  console.log(errNum);
  if (errNum == 404 || errNum == 422 || errNum > 500) {
    console.warn(err, data);
    warning.innerHTML = err;
  } else {
    document.querySelector(".add-product__error").style.display = "flex";
    addCloseError();
    console.warn(err, data);
  }
};

const deleteImg = (overlay, img) => {
  overlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-product__file-block")) {
      img.removeAttribute("src");
    }
  });
};
