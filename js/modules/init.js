
import {getRenderGoods} from './service.js'

import {
  changeCheckbox,
  modalProductSum,
  addOpenModal,
  addCloseModal,
  delProduct,
  addNewProduct,
  editId,
  openImg,
} from './control.js';

  export const init = () => {
    getRenderGoods()
 
    changeCheckbox();
    modalProductSum();
    addOpenModal();
    addCloseModal();

    addNewProduct()

    delProduct();
    editId();
    openImg();
  }
