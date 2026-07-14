import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

const getNotes = async () => {
  const response = await axiosInstance.get("/api/notes");
  return response.data;
};

const addNote = async (newNote) => {
  const response = await axiosInstance.post("/api/notes", newNote);
  return response.data;
};

const updateNote = async (id, updatedNote) => {
  const response = await axiosInstance.put(`/api/notes/${id}`, updatedNote);
  return response.data;
};

const deleteNote = async (id) => {
  await axiosInstance.delete(`/api/notes/${id}`);
};

export default { getNotes, addNote, updateNote, deleteNote };
