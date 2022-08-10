export const addOptions = (err, data) => {
    if (err) {
      console.warn(err, data);
    }
  
    const allOption = data.map(createOption);
    console.log('allOption: ', allOption);


  
    const datalist = document.querySelector('#category-list')
  
    document.querySelector('#category-list').append(...allOption);
  
    console.log('datalist: ', datalist);
  
  }
  
  const createOption = (i) => {
     const opt = document.createElement('option');
      opt.value = i;
      return opt;
  }