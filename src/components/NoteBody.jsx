import React, { useState, useEffect } from "react";
import "../styles/NoteBody.css";
import NoteHeader from "./NoteHeader";
import NoteInputBox from "./NoteInputBox";
import { GoDotFill } from "react-icons/go";

const NoteBody = ({ name, color, id, isPhone, display, setDisplay }) => {
  const [notes, setNotes] = useState([]);
  const [groupId, setGroupId] = useState(id);

  const fetchNotes = async (id) => {
    // setGroupId(id)
    console.log("Calling this",id);
    try {
      const response = await fetch(`https://pocket-notes-u16r.onrender.com/note-groups/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    console.log(id);
    setGroupId(id)
    fetchNotes(id)
  }, [id]);


  const handleNewNote = (value) => {
    setNotes((prevNotes) => [...prevNotes, value]);
  };

  return (
    <div
      className="noteContainer flex justify-start"
      style={{ display: isPhone && !display ? "none" : "" }}
    >
      <NoteHeader
        name={name}
        color={color}
        isPhone={isPhone}
        display={display}
        setDisplay={setDisplay}
      />
      {notes &&
        notes.map((note, index) => {
          return (
            <div className="noteBody flex justify-start" key={index}>
              <div className="notesBox">
                <div className="descriptionContainer">
                  <div className="description">{note.content}</div>
                </div>
                <div className="timeStampContainer">
                  <span style={{ display: 'inline-block', marginRight: '4px' }}>
                    {note.date}
                  </span>
                  &nbsp;&nbsp;
                  <span style={{ display: 'inline-block' }}>
                    <GoDotFill />
                    {note.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      {notes.length === 0 && (
        <p className="displayTxt">Start Writing Notes Here!</p>
      )}
      <NoteInputBox id={groupId} handleNewNote={handleNewNote} />
    </div>
  );
};

export default NoteBody;
