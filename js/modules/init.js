import {getElements} from './getElements.js';
import {renderGoods} from './createElements.js';
import {
  changeCheckbox,
  modalProductSum,
  addOpenModal,
  addCloseModal,
  delProduct,
  addNewProduct,
  editId
} from './control.js';
import {newTotalSum} from './calc.js';

  export const init = (data) => {
    const {
      tBody,
      allProductSum,
    } = getElements();

    renderGoods(data, tBody);
    newTotalSum(allProductSum, data);
    changeCheckbox();
    modalProductSum();
    addOpenModal();
    addCloseModal();
    delProduct (tBody, data);
    addNewProduct(data)
    editId();
  }
