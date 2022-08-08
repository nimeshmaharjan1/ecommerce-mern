import axios from "axios";

export const axiosGet = (url: string, params = {}) => {
  return axios({
    url,
    method: "GET",
    params,
  }).then((res) => res.data);
};
export const axiosPost = (url: string, data: any) => {
  console.log(data);
  return axios({
    url,
    method: "post",
    data,
  })
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return err;
    });
};
