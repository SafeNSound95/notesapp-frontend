const Note = ({ note, handleUpdateNote, handleDeleteNote }) => {
  return (
    <li className="note">
      {note.content}
      <button onClick={() => handleUpdateNote(note.id)}>
        {note.important ? "Make not important" : "Make important"}
      </button>
      <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
    </li>
  );
};

export default Note;
