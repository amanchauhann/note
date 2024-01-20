import { useEffect, useState } from "react";
import Form from "../../Components/Form";
import "./Home.css"
import { v4 as uuidv4 } from 'uuid';
import NotesCard from "../../Components/Notes/NotesCard";

const Home = () => {
    const [showForm, setShowForm] = useState(false)
    const [fromUpdate, setFromUpdate] = useState(false)
    const [existingNotes, setExistingNotes] = useState([])
    const Note = {
        "id": 999,
        "title": "Bottle Flip",
        "description": "This is dummy",
        // "author": "Simple Viral Games",
        // "published_date": "2022-08-01"
    }
    const [newNoteForm, setNewNoteForm] = useState({
        id: uuidv4(),
        title: "",
        description: "",
        createdAt: new Date()
        // author: "",
        // published_date: ""
    })

    const notesFromLocal = JSON.parse(localStorage?.getItem('newNoteForm')) || []
    useEffect(() => {
        setExistingNotes(notesFromLocal)
    }, [showForm])
    return (
        <div className="homeContainer">
            <div className="addNoteContainer">
                <nav className="noteNav">
                    My notes
                </nav>
                <div className="Notesmain">
                    {showForm && <Form setShowForm={setShowForm} setNewNoteForm={setNewNoteForm} newNoteForm={newNoteForm} toUpdate={fromUpdate} />}
                    {!showForm && <div className="addNote" onClick={() => {
                        setShowForm(true)
                        setFromUpdate(false)
                    }}>Add new Note</div>}
                    <h3 className="myNotesTitle">My notes</h3>
                    <div className="notesContainer">
                        {existingNotes.map((eachNote) => <NotesCard {...eachNote} setNewNoteForm={setNewNoteForm} setShowForm={setShowForm} setFromUpdate={setFromUpdate} setExistingNotes={setExistingNotes} />)}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home;