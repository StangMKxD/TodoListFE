import axios from "axios";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const getData = async() => 
    await axios.get(ENDPOINT);

export const removeData = async(id: number) => 
    await axios.delete(`${ENDPOINT}/${id}`);

export const createData = async (newTodo: { title: string }) =>
    await axios.post(ENDPOINT, newTodo);

export const updateData = async (id: number, payload: { title: string }) => {
  return await axios.put(`${ENDPOINT}/${id}`, payload);};

