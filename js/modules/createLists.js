import { getRenderCategoryGoods, getRenderGoods, getRenderDiscountGoods } from "./service.js";

export const addOptions = (err, data) => {
  if (err) {
    console.warn(err, data);
  }
  const allOption = data.map(createOption);
  document.querySelector("#category-list").append(...allOption);
};

const createOption = (i) => {
  const opt = document.createElement("option");
  opt.value = i;
  return opt;
};

export const addBtnFilter = (err, data) => {
  if (err) {
    console.warn(err, data);
  }
  const filterBlock = document.querySelector(".list-product__filter-block");
  const btnDiscount = createBtnDiscount();
  btnDiscount.textContent = 'Дисконт';

  const btnAll = createBtnDiscount();
  btnAll.textContent = 'Показать все';

  const allBtn = data.map(createBtns);

  filterBlock.innerHTML = '';
  filterBlock.append(btnAll);
  filterBlock.append(btnDiscount);
  filterBlock.append(...allBtn);

  allBtn.forEach((i) => {
    i.addEventListener('click', () => {
      const text = i.textContent;
      
      getRenderCategoryGoods(text);
    });
  });

  btnDiscount.addEventListener('click', () => {
    const text = 'discount';
    
    getRenderDiscountGoods(text);
  });

  btnAll.addEventListener('click', () => {
    getRenderGoods();
  });
};

const createBtns = (i) => {
  const btn = document.createElement("button");
  btn.className = 'list-product__filter-btns'
  btn.textContent = i;
  return btn;
};

const createBtnDiscount = () => {
  const btn = document.createElement("button");
  btn.className = 'list-product__filter-btns'
  return btn;
};