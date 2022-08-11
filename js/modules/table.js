import { getElements } from "./getElements.js";
import { getTotalTable } from "./calc.js";
import { createRow } from "./createTable.js";
import {
  fetchRequest,
  URL,
  urlPic,
  getRenderTotalSum,
  getRenderSearchGoods,
  getRenderGoods,
} from "./service.js";
import { showModal } from "./modal.js";
import { loadImg } from "./addFileImg.js";

const { productTable, tBody, allProductSum } = getElements();


export const addTableBtnEvent = () => {
  const input = document.querySelector(".list-product__table-input");
  const btnFilter = document.querySelector(".list-product__table-filter");
  const filterBlock = document.querySelector(".list-product__filter-block");

  let t;

// ПОИСК
  input.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      const text = input.value;
      getRenderSearchGoods(text);
    }, 300);
  });

  // Фильтр
  btnFilter.addEventListener('click', () => {
    filterBlock.classList.toggle('hide');
  });

  document.querySelector('.list-product').addEventListener('click', (e) => {
    if (!e.target.classList.contains('list-product__filter-block') &&
    (!e.target.classList.contains('list-product__table-filter'))) {

      filterBlock.classList.add('hide');
    }
  })


//Новое модальное окно
  productTable.addEventListener("click", (e) => {  
    if (e.target.classList.contains("list-product__table-add")) {
      showModal();
    };

    //Редактирование
    if (e.target.classList.contains("list-product__button-edit")) {
      fetchRequest(`${URL}/${e.target.dataset.id}`, {
        method: "get",
        callback: showModal,
      });
    };

    //Открыть изображение
    if (e.target.closest(".list-product__button-img")) {
      const tr = e.target.closest("tr");
      const src = `${urlPic}${tr.dataset.pic}`;

      // const top = screen.height / 2 - 600 / 2;
      // const left = screen.width / 2 - 600 / 2;

      const height = 500;
      const width = 530;

      const win = open(
        "about:blank",
        "",
        `width=${height}, height=${width}, menubar=no, toolbar=no, scrollbars=no, top=${
          (screen.height - height) / 2
        },left=${(screen.width - width) / 2}`
      );

      win.document.body.innerHTML = `
        <img class='add-product__file-img' style="display:block;margin:0 auto; max-width:100%;"
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
            getRenderGoods();
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
};

