import "./NoteCard.css"

const NotesCard = ({ setNewNoteForm, setShowForm, setFromUpdate, setExistingNotes, ...eachNote }) => {
    const { title, description, author, published_date, id, createdAt, updatedtAt } = eachNote
    const updateHandler = () => {
        setNewNoteForm({
            id,
            title,
            description,
            createdAt,
            updatedtAt
            // author,
            // published_date,
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
                    {/* <p >URL: <span className="fontWeight">{url}</span></p> */}
                    <p>Description: <div className="fontWeight">{description}</div></p>
                </div>
                {updatedtAt && <div className="dateContainer">
                    <p>Updated At:</p>
                    <p>{updatedtAt.slice(11, 19)}</p>
                </div>}
            </div>

            {/* <p>Published Date: <span className="fontWeight">{published_date}</span></p> */}
            <div className="lowerContainer">
                <div>
                    <button onClick={updateHandler}>Update</button>
                    <button onClick={deleteHandler}>Delete</button>
                </div>
                <div className="dateContainer">
                    <p>Created At:</p>
                    <p>{createdAt.slice(11, 19)}</p>
                </div>
            </div>

        </div>
    )
}

export default NotesCard