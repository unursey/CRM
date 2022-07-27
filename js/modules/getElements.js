export const getElements = () => {
    const productTable = document.querySelector('.list-product');
    const addProduct = productTable.querySelector('.list-product__table-add');
    const tBody = productTable.querySelector('.list-product__table-body');
    const allProductSum = productTable.querySelector('.list-product .card-sum__price');
    
    return {
      productTable,
      addProduct,
      tBody,
      allProductSum,
    }
};