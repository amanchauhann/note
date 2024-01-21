import "./NoteCard.css"
import HTMLReactParser from 'html-react-parser'

const NotesCard = ({ setNewNoteForm, setShowForm, setFromUpdate, setExistingNotes, ...eachNote }) => {
    const { title, description, id, createdAt, updatedAt } = eachNote
    const updateHandler = () => {
        setNewNoteForm({
            id,
            title,
            description,
            createdAt,
            updatedAt
        })
        setFromUpdate(true)
        setShowForm(true)
    }

    const deleteHandler = () => {
        const existingNotes = JSON.parse(localStorage?.getItem('newNoteForm'))
        const updated = existingNotes.filter((each) => each.id !== id);
        localStorage.setItem("newNoteForm", JSON.stringify(updated));
        setExistingNotes(updated)
        setShowForm(false)
    }
    return (
        <div className="myNotesContainer">
            <div className="upperContainer">
                <div>
                    <h2 className="NoteCardName">{title}</h2>
                    <p>Description: <div className="fontWeight">{HTMLReactParser(description)}</div></p>
                </div>
                {updatedAt && <div className="dateContainer">
                    <p>Updated At:</p>
                    <p>{new Date(updatedAt).toLocaleTimeString()}</p>
                </div>}
            </div>
            <div className="lowerContainer">
                <div>
                    <button onClick={updateHandler}>Update</button>
                    <button onClick={deleteHandler}>Delete</button>
                </div>
                <div className="dateContainer">
                    <p>Created At:</p>
                    <p>{new Date(createdAt).toLocaleTimeString()}</p>
                </div>
            </div>
        </div>
    )
}

export default NotesCard