import { newTotalSum } from "./table.js";
import { addOptions, addBtnFilter } from "./createLists.js";
import { paginate } from "./pagination.js";

export const URL = "https://limitless-beach-97190.herokuapp.com/api/goods";
export const urlPic = "https://limitless-beach-97190.herokuapp.com/";

const urlCategory = "https://limitless-beach-97190.herokuapp.com/api/category";

export const fetchRequest = async (
  url,
  { method = "", callback, body, headers }
) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      //   console.log(data);
      if (callback) callback(null, data);
      return;
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

export const getRenderGoods = () => {
  fetchRequest(URL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: paginate,
  });
};

export const getRenderTotalSum = () => {
  fetchRequest(URL, {
    method: "get",
    callback: newTotalSum,
  });
};

export const getRenderCategory = () => {
  fetchRequest(urlCategory, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: addOptions,
  });
};

export const getRenderSearchGoods = (text) => {
  fetchRequest(`${URL}?search=${text}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: paginate,
  });
};

export const getRenderBtnCategory = () => {
  fetchRequest(urlCategory, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: addBtnFilter,
  });
};

export const getRenderCategoryGoods = (text) => {
  fetchRequest(`${URL}/category/${text}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: paginate,
  });
};

export const getRenderDiscountGoods = (text) => {
  fetchRequest(`${URL}/${text}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: paginate,
  });
};
// export const httpRequest = (url, {
//     method = 'GET',
//     callback,
//     body = {},
//     headers,
//   }) => {
//     try {
//       const xhr = new XMLHttpRequest();
//       xhr.open(method, url);

//       if (headers) {
//         for (const [key, value] of Object.entries(headers)) {
//           xhr.setRequestHeader(key, value); //'Content-Type', 'application/json; charset=UTF8'
//         }
//       }

//       xhr.addEventListener('load', () => {
//         if (xhr.status < 200 || xhr.status >= 300) {
//           callback(new Error(xhr.status), xhr.response);
//           return;
//         }
//         const data = JSON.parse(xhr.response);
//         if (callback) callback(null, data);
//       });

//       xhr.addEventListener('error', () => {
//         callback(new Error(xhr.status), xhr.response);
//       });

//       xhr.send(JSON.stringify(body));
//       } catch (err) {
//         callback(new Error(err));
//       }

//     };
