import axios from "axios";

export const formCreate = (data) => async () => {
  console.log("data en actions", data);
  await axios({
    method: "POST",
    url: `http://localhost:3001/product/createProduct`,
    data: data,
  });
};

export const logIn = (user, password) => {
  return function (dispatch) {
    return axios
      .post(`enlacedelBack`, {
        user,
        password,
      })
      .then((response) => {
        const user = response.data;
        dispatch({
          type: "LOGIN",
          payload: user,
        });
      })
      .catch((error) => {
        const messageError = error.response.data;
        dispatch({
          type: "LOGIN",
          payload: messageError,
        });
      });
  };
};
