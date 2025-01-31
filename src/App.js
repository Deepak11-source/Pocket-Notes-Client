import React, { useEffect, useState } from "react";
import "./styles/App.css";
import Notes from "./components/Notes";
import Sidebar from "./components/Sidebar";
import NotesModal from "./components/NotesModal";

function App() {
  const [isPhone, setIsPhone] = useState(false);
  const [display, setDisplay] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [noteActive, setNoteActive] = useState(false);
  const [noteGroups, setNoteGroups] = useState([]);
  const [newNoteGroup, setNewNoteGroup] = useState({
    id: "",
    name: "",
    notes: [],
    color: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState(""); // State to hold selected note ID

  useEffect(() => {
    const fetchNoteGroups = async () => {
      try {
        const response = await fetch("https://pocket-notes-u16r.onrender.com/note-groups");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNoteGroups(data); 
      
        if (data.length > 0) {
         
          setSelectedNoteId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching note groups:", error);
      }
    };

    fetchNoteGroups(); 
  }, []);

 

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="App flex flex-row">
        <Sidebar
          display={display}
          setDisplay={setDisplay}
          isPhone={isPhone}
          setNoteActive={setNoteActive}
          noteGroups={noteGroups}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
        />

        <Notes
          display={display}
          setDisplay={setDisplay}
          selectedNote={selectedNote}
          isPhone={isPhone}
          noteActive={noteActive}
          selectedNoteId={selectedNoteId} // Pass the selectedNote ID
        />
      </div>

      <NotesModal
        noteActive={noteActive}
        setNoteActive={setNoteActive}
        noteGroups={noteGroups}
        setNewNoteGroup={setNewNoteGroup}
        setNoteGroups={setNoteGroups}
        selectedNoteId={selectedNoteId} // Pass the selectedNote ID
      />
    </>
  );
}

export default App;