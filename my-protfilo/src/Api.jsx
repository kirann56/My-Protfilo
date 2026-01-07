import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // 👈 no trailing slash
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
