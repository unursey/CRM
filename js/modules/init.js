
import {getRenderGoods} from './service.js'

import {
  addTableBtnEvent,
} from './table.js';

  export const init = () => {
    getRenderGoods();
    addTableBtnEvent();
  }
