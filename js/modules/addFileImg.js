export const addFileImg = () => {
    const file = document.querySelector('.add-product__input-image'); 

    file.addEventListener('change', () => {
      if (file.files[0].size > 1000000) {
        document.querySelector('.add-product__warning').textContent = 
        'Изображение не должно превышать размер 1 Мб'
      } else

      if (file.files.length > 0) { 
        const src = URL.createObjectURL(file.files[0]);
        document.querySelector('.add-product__file-img').src = src;
        document.querySelector('.add-product__warning').textContent = '';
      }
    })
  };

   export const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', err => {
        reject(err);
      });

      reader.readAsDataURL(file);
    });