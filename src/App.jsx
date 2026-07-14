import Note from "./components/Note";
import Form from "./components/Form";
import Notification from "./components/Notification";
import notesService from "./services/notes";
import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await notesService.getNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (noteContent) => {
    const newNote = {
      content: noteContent,
      important: Math.random() > 0.5,
    };

    try {
      const note = await notesService.addNote(newNote);
      setNotes([...notes, note]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (id) => {
    const noteToUpdate = notes.find((n) => n.id === id);
    const updatedNote = {
      ...noteToUpdate,
      important: !noteToUpdate.important,
    };

    try {
      const note = await notesService.updateNote(id, updatedNote);

      setNotes(notes.map((n) => (n.id !== id ? n : note)));
    } catch (error) {
      console.log(error.response.data.error);
      setErrorMessage(
        `the note ${noteToUpdate.content} was already deleted from the server`,
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const handleDeleteNote = async (id) => {
    const noteToDelete = notes.find((n) => n.id === id);

    try {
      await notesService.deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `the note ${noteToDelete.content} was already deleted from the server`,
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      {errorMessage && <Notification message={errorMessage} />}
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "show important notes" : "show all notes"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleUpdateNote={handleUpdateNote}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </ul>
      <Form handleAddNote={handleAddNote} />
    </div>
  );
};

export default App;
