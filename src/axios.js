import axios from "axios";

const instance = axios.create({
  baseURL: "https://grupo-jorani.firebaseio.com/"
});

export default instance;
