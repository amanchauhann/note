import { useEffect, useState } from "react";
import Form from "../../Components/Form";
import "./Home.css"
import { v4 as uuidv4 } from 'uuid';
import NotesCard from "../../Components/Notes/NotesCard";

const Home = () => {
    const [showForm, setShowForm] = useState(false)
    const [fromUpdate, setFromUpdate] = useState(false)
    const [existingNotes, setExistingNotes] = useState([])
    const [notesToShow, setNotesToShow] = useState([])
    const [page, setPage] = useState(1)
    const [newNoteForm, setNewNoteForm] = useState({
        id: uuidv4(),
        title: "",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    const notesFromLocal = JSON.parse(localStorage?.getItem('newNoteForm')) || []
    useEffect(() => {
        setExistingNotes(notesFromLocal)
    }, [showForm])

    useEffect(() => {
        setNotesToShow(existingNotes)
        setPage(1)
    }, [existingNotes])

    const searchHandler = (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        setNotesToShow(() => existingNotes.filter(({ title, description }) =>
            title.toLowerCase().includes(searchTerm) ||
            description.toLowerCase().includes(searchTerm)
        ))
    }

    const sortHandler = (e) => {
        let sorted = e.target.value;
        const sortedNotes = [...notesToShow].sort((a, b) => new Date(a[sorted]) - new Date(b[sorted]));
        setNotesToShow(sortedNotes);
    }

    const selectPageHandler = (selectedPage) => {
        setPage(selectedPage)
    }

    const notePerPage = 1
    const pagesAvailable = notesToShow.length / notePerPage
    return (
        <div className="homeContainer">
            <div className="addNoteContainer">
                <nav className="noteNav">
                    My notes
                </nav>
                <div className="notesMain">
                    {showForm && <Form setShowForm={setShowForm} setNewNoteForm={setNewNoteForm} newNoteForm={newNoteForm} toUpdate={fromUpdate} />}
                    {!showForm && <div className="addNote" onClick={() => {
                        setShowForm(true)
                        setFromUpdate(false)
                    }}>Add new Note</div>}
                    <div className="notesLowerContainer">
                        <h3 className="myNotesTitle">My notes</h3>
                        {notesToShow.length > 0 ? <div className="filterContainer">
                            <input className="searchBar" onChange={searchHandler} />

                            <select id="cars" onChange={sortHandler}>
                                <option selected disabled>Sort by Update or create</option>
                                <option value="createdAt">Creation</option>
                                <option value="updatedAt">Updated</option>
                            </select>
                        </div> :
                            <h2>NO Notes to show</h2>}

                        <div className="notesContainer">
                            {notesToShow.slice(page * notePerPage - notePerPage, page * notePerPage).map((eachNote) => <NotesCard {...eachNote} setNewNoteForm={setNewNoteForm} setShowForm={setShowForm} setFromUpdate={setFromUpdate} setExistingNotes={setExistingNotes} />)}
                        </div>
                        <div className="pagesContainer">
                            {[...Array(Math.ceil(pagesAvailable))].map((_, i) => <div onClick={() => selectPageHandler(i + 1)} className={page === i + 1 ? "pages pageSelected" : "pages"}>{i + 1}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;