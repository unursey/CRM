import { getElements } from "./getElements.js";
import { getTotalTable } from "./calc.js";
import { createRow } from "./createTable.js";
import { fetchRequest, URL, urlPic, getRenderTotalSum } from "./service.js";
import { showModal } from "./modal.js";
import { loadImg } from "./addFileImg.js";

const { productTable, tBody, allProductSum } = getElements();

export const addTableBtnEvent = () => {
  productTable.addEventListener("click", (e) => {
    //Новое модальное окно
    if (e.target.classList.contains("list-product__table-add")) {
      showModal();
    }

    //Редактирование
    if (e.target.classList.contains("list-product__button-edit")) {
      fetchRequest(`${URL}/${e.target.dataset.id}`, {
        method: "get",
        callback: showModal,
      });
    }

    //Открыть изображение
    if (e.target.closest(".list-product__button-img")) {
      const tr = e.target.closest("tr");
      const src = `${urlPic}${tr.dataset.pic}`;

      const top = screen.height / 2 - 600 / 2;
      const left = screen.width / 2 - 600 / 2;

      const win = open(
        "about:blance",
        "",
        `width=600, height=600, top=${top}, left=${left}`
      );

      win.document.body.innerHTML = `
        <img class='add-product__file-img'
          src='${src}' alt='some text'
          alt=""
        >
      `;

      const img = win.document.querySelector(".add-product__file-img");
      loadImg(img, src);  
      win.focus();
    }

    //Удаление
    if (e.target.closest(".list-product__button-delete")) {
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

// win.document.write(`<img src='${document.querySelectorAll('.list-product__table-tr')[index].dataset.pic}'
// alt='Киса лижет лапку' />`);

// win.document.body.innerHTML = `
// <img
// src='${location.origin}/img/ksks.jpg') alt='some text'
// alt="Киса лижет лапку"
// >
// `;
