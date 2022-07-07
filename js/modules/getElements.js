export const getElements = () => {
    const addProduct = document.querySelector('.list-product__table-add');
    const tBody = document.querySelector('.list-product__table-body');
    const allProductSum = document.querySelector('.list-product .card-sum__price');
    
    const formOverlay = document.querySelector('.overlay');
    const modalTitle = formOverlay.querySelector('.add-product__title');
    const productId = formOverlay.querySelectorAll('.add-product__id')[1];
    const buttonId = formOverlay.querySelector('.add-product__id-button');
    const productSum = formOverlay.querySelector('.card-sum__price');
    
    const productForm = formOverlay.querySelector('.add-product__form');
    const inputId = productForm.querySelectorAll('.add-product__input')[0];
    const checkbox = productForm.querySelector(".add-product__checkbox");
    const checkInput = productForm.querySelectorAll(".add-product__input")[4];

    return {
      addProduct,
      tBody,
      allProductSum,
      formOverlay,
      productId,
      buttonId,
      productSum,
      productForm,
      inputId,
      checkbox,
      checkInput
    }
};