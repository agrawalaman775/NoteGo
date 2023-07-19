import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import SignIn from "../Login/Signin";
import { useUserAuth } from "../../context/UserAuthContext";
import { collection, addDoc, deleteDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../../firebase";

function App() {
  const { userUID }=useUserAuth();
  console.log(userUID);
  const [notes, setNotes] = useState([]);

  // Fetch notes from Firestore for the logged-in user on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, "notes"), where("userUID", "==", userUID));
        const querySnapshot = await getDocs(q);
        const notesData = [];
        querySnapshot.forEach((doc) => {
          const noteData = doc.data();
          notesData.push({
            id: doc.id,
            title: noteData.title,
            content: noteData.content,
          });
        });
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (userUID) {
      fetchNotes();
    }
  }, [userUID]);

  function addNoteToFirestore(newNote) {
    try {
      // Add the note to Firestore collection "notes" with userUID as the user identifier
      const noteRef = collection(db, "notes");
      addDoc(noteRef, {
        userUID,
        title: newNote.title,
        content: newNote.content,
      });
    } catch (error) {
      console.error("Error adding note to Firestore:", error);
    }
  }

  function deleteNoteFromFirestore(id) {
    try {
      // Delete the note from Firestore collection "notes" with the provided id
      deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Error deleting note from Firestore:", error);
    }
  }

  function addNote(newNote) {
    // Update local state with the new note
    setNotes(prevNotes => [...prevNotes, newNote]);

    // Update Firestore with the new note
    addNoteToFirestore(newNote);
  }

  function deleteNote(id) {
    // Update local state by filtering out the deleted note
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));

    // Update Firestore by deleting the note
    deleteNoteFromFirestore(id);
  }

  return (
    <div>
      <Header />
      
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
