import axios from "axios";

const api = axios.create({
  baseURL: "https://sortmyscene-ticket-booking.onrender.com/api",
});

export default api;
