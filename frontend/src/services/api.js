import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getProjects = async () => {
  const res = await axios.get(`${API_URL}/projects`);
  return res.data;
};

export const sendContact = async (data) => {
  const res = await axios.post(`${API_URL}/contact`, data);
  return res.data;
};