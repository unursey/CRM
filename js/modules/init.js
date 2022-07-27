
import {getRenderGoods} from './service.js'

import {
  addTableBtnEvent,
} from './control.js';

  export const init = () => {
    getRenderGoods()
    addTableBtnEvent();
  }
