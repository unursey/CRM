import { getTotal } from "./calc.js";

export const createRow = ({id, title, category, units, count, price, discont}) => {
    const tr = document.createElement('tr'); 
    tr.classList.add('list-product__table-tr'); 
    tr.insertAdjacentHTML('afterbegin', `
      <td class=list-product__table-td>${id}</td>
      <td class=list-product__table-td>${title}</td>
      <td class=list-product__table-td>${category}</td>
      <td class=list-product__table-td>${units}</td>
      <td class=list-product__table-td>${count}</td>
      <td class=list-product__table-td>$${price}</td>
      <td class=list-product__table-td>$${getTotal(
        price,
        count,
        discont
      ).toFixed(2)}</td>
      <td class=list-product__table-td>
        <button class='list-product__table-button list-product__button-img' aria-label="image"></button>
        <button class='list-product__table-button list-product__button-edit' aria-label="edit"></button>
        <button class='list-product__table-button list-product__button-delete' aria-label="delete"></button>
      </td> 
    `);
    return tr;
  };
  
  export const renderGoods = (data, elem) => {
    const allRow = data.map(createRow);
  console.log()
    elem.append(...allRow); 
  };