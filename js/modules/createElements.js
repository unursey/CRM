import { getTotal } from "./calc.js";
import { getElements } from "./getElements.js";
import { newTotalSum, delProduct } from "./control.js";

const { tBody } = getElements();


export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const allRow = data.map(createRow);
  tBody.append(...allRow);
  delProduct();
  newTotalSum(err, data);
};

export const createRow = ({
  id,
  title,
  category,
  units,
  count,
  price,
  discount,
}) => {
  const tr = document.createElement("tr");
  tr.classList.add("list-product__table-tr");
  tr.dataset.pic = "./img/ksks.jpg";
  tr.insertAdjacentHTML(
    "afterbegin",
    `
      <td class=list-product__table-td>${id}</td>
      <td class=list-product__table-td>${title}</td>
      <td class=list-product__table-td>${category}</td>
      <td class=list-product__table-td>${units}</td>
      <td class=list-product__table-td>${count}</td>
      <td class=list-product__table-td>$${price}</td>
      <td class=list-product__table-td>$${getTotal(
        price,
        count,
        discount
      ).toFixed(2)}</td>
      <td class=list-product__table-td>
        <button class='list-product__table-button list-product__button-img' aria-label="image"></button>
        <button class='list-product__table-button list-product__button-edit' aria-label="edit"></button>
        <button class='list-product__table-button list-product__button-delete' aria-label="delete" data-id="${id}"></button>
      </td> 
    `
  );
  return tr;
};
