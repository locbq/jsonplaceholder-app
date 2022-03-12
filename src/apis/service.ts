import axios from "axios";

export const SERVICE_API = "https://jsonplaceholder.typicode.com";

export const request = axios.create({
  baseURL: SERVICE_API,
  headers: {
    "Content-Type": "application/json"
  }
});
