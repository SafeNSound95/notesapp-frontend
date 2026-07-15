import axios from "axios";

const getNotes = async () => {
  const response = await axios.get("/api/notes");
  return response.data;
};

const addNote = async (newNote) => {
  const response = await axios.post("/api/notes", newNote);
  return response.data;
};

const updateNote = async (id, updatedNote) => {
  const response = await axios.put(`/api/notes/${id}`, updatedNote);
  return response.data;
};

const deleteNote = async (id) => {
  await axios.delete(`/api/notes/${id}`);
};

export default { getNotes, addNote, updateNote, deleteNote };
