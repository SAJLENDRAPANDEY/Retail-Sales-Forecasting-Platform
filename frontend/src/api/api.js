import axios from "axios";

const API = axios.create({
  baseURL: "https://retail-sales-forecasting-platform.onrender.com",
});

export default API;

export const getSalesTrend = () =>
  API.get("/sales-trend");

export const getCategorySales = () =>
  API.get("/category-sales");