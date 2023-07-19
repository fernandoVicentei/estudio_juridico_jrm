
import axios from 'axios';


export const ruta_servidor = 'http://localhost:80/apiEstudiojuridico/public/api/'


export const getFetch = (url,data) => {
  return axios.get(url,data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const postFetch = (url,data) => {
  return axios.post(url,data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
