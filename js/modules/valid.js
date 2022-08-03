export const valid = () => {
    const form = document.querySelector(".add-product__form");
    const text = form.querySelectorAll(".add-product__input-name");
    const desc = form.querySelectorAll(".add-product__input-name")[2];
    const units = form.querySelector(".add-product__input-units");
    const num = form.querySelectorAll(".add-product__input-num");

    const validName = (param) => {
        param.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^а-яА-Я, ]/, "");
        });
    };

    const validUnits = (param) => {
        param.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^а-яА-Я]/, "");
        });
    };

    const validNum = (param) => {
        param.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/\D+/, "");
        });
    };

    const validDesc = (param) => {
      param.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/^\s*(\d\s*){80,}$/, "");
      });
    }

    text.forEach((el) => {
      validName(el);
    });

    num.forEach((el) => {
      validNum(el);
    });

    validUnits(units);
    validDesc(desc);




};


export const validate = (product) => {
  let success = true;

  if ((product["title"].length == 0) ||
      (product["category"].length == 0) ||
      (product["units"].length == 0) ||
      (product["count"].length == 0) ||
      (product["price"].length == 0)) {
      success = false;
  }
  if (
    product["description"].length < 80
  ) {
    success = false;
  }

  return success;
};