import axios from "axios";

const api = axios.create({
  baseURL: 'https://us-central1-desafio-bycoders-app.cloudfunctions.net/desafioBycoders/api',
  //baseURL: 'http://127.0.0.1:5001/desafio-bycoders-app/us-central1/desafioBycoders/api'
});

export default api;