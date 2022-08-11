import { renderGoods } from "./createTable.js";

export const paginate = (err, data) => {
  console.log("data получена: ", data);
  if (err) {
    console.warn(err, data);
    return;
  }

  createPage(data);
};

const createPage = (data) => {
  const selectQty = document.querySelector(".list-product__table-select");
  let pages = null;
  
  let selectedItemsPerPage = +selectQty.value;
  let currentPageIndex = 0;

  pages = createPagination(data, selectedItemsPerPage);

  renderGoods(pages[currentPageIndex]);

  document.querySelector(".list-product__total-elem").innerHTML = data.length;

  if (selectedItemsPerPage > data.length) {
    document.querySelector(
      ".list-product__elem"
    ).innerHTML = `1-${data.length} of`;
  } else {
    document.querySelector(
      ".list-product__elem"
    ).innerHTML = `1-${selectedItemsPerPage} of`;
  }

  changeCountItem(data, selectedItemsPerPage, currentPageIndex);
  arrowBtn(currentPageIndex, pages);
};

const createPagination = (itemsTotal, itemsPerPage) => {
  const numberOfPages = Math.ceil(itemsTotal.length / itemsPerPage);
  if (numberOfPages <= 1) return [itemsTotal];

  return Array.from({ length: numberOfPages }, (_, i) => {
    const startIndex = i * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return itemsTotal.slice(startIndex, endIndex);   
  });
};

const arrowBtn = (currentPageIndex, pages) => {
    
  document
    .querySelector(".list-product__table-right")
    .addEventListener("click", () => {
    currentPageIndex++;
      if (currentPageIndex >= pages.length) {
        currentPageIndex = pages.length - 1;
      } 
      renderGoods(pages[currentPageIndex])
    });

  document
    .querySelector(".list-product__table-left")
    .addEventListener("click", () => {
      currentPageIndex--;

      if (currentPageIndex < 0) {
        currentPageIndex = 0;
      } 
      renderGoods(pages[currentPageIndex])
    });
};

const changeCountItem = (data, selectedItemsPerPage, currentPageIndex) => {
  document
    .querySelector(".list-product__table-select")
    .addEventListener("change", ({ target }) => {
      selectedItemsPerPage = +target.value;
      currentPageIndex = 0;
      createPage(data);
    });
};
