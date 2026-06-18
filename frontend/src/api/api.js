import axios from "axios";



const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});



export default API;

export const getSalesTrend = () =>
  axios.get("http://127.0.0.1:8000/sales-trend");

export const getCategorySales = () =>
  axios.get(`${API}/category-sales`);