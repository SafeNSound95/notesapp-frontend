import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

const getNotes = async () => {
  const response = await axiosInstance.get("/notes");
  return response.data;
};

const addNote = async (newNote) => {
  const response = await axiosInstance.post("/notes", newNote);
  return response.data;
};

const updateNote = async (id, updatedNote) => {
  const response = await axiosInstance.put(`/notes/${id}`, updatedNote);
  return response.data;
};

const deleteNote = async (id) => {
  await axiosInstance.delete(`/notes/${id}`);
};

export default { getNotes, addNote, updateNote, deleteNote };
