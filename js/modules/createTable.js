import { getTotal } from "./calc.js";
import { getElements } from "./getElements.js";
import {getRenderBtnCategory, getRenderTotalSum} from "./service.js";

const { tBody } = getElements();


export const renderGoods = (data, item) => {
  if (item) {
    item.replaceWith(createRow(data)); 
    return;
  }
  tBody.innerHTML ='';
  const allRow = data.map(createRow);
  
  tBody.append(...allRow);
  getRenderBtnCategory();
  getRenderTotalSum();

};

export const createRow = ({
  id,
  title,
  category,
  units,
  count,
  price,
  discount,
  image,
}) => {

  const tr = document.createElement("tr");
  tr.classList.add("list-product__table-tr");
  tr.dataset.pic = image;
  tr.dataset.id = id;
  let noImage = '';
  let disabled = '';
  if (tr.dataset.pic === 'image/notimage.jpg') {
    noImage = 'list-product__button-img_no-image';
    disabled = 'disabled';
  } 

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
        <button class='list-product__table-button list-product__button-img ${noImage}' ${disabled} aria-label="image"></button>
        <button class='list-product__table-button list-product__button-edit' aria-label="edit" data-id="${id}"></button>
        <button class='list-product__table-button list-product__button-delete' aria-label="delete" data-id="${id}"></button>
      </td> 
    `
  );

  return tr;
};
