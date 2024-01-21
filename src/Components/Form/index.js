import "./Form.css"
import { v4 as uuidv4 } from 'uuid';
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Form = ({ setShowForm, setNewNoteForm, newNoteForm, toUpdate }) => {
    const existingNotes = JSON.parse(localStorage?.getItem('newNoteForm')) || []

    const submitHandler = (e) => {
        e.preventDefault()
        localStorage.setItem("newNoteForm", JSON.stringify([{ ...newNoteForm, createdAt: new Date(), updatedAt: new Date(), }, ...existingNotes]));
        resetHandler()
        setShowForm(false)
    }

    const resetHandler = () => {
        setNewNoteForm({
            id: uuidv4(),
            title: "",
            description: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

    const cancelHandler = () => {
        resetHandler()
        setShowForm(false)
    }
    const updateHandler = () => {

        const updatedNotes = existingNotes.map((each) => {
            if (each.id === newNoteForm.id) {
                return { ...newNoteForm, updatedAt: new Date() }; // Update the existing note
            } else {
                return each; // Keep other note as they are
            }
        });
        localStorage.setItem("newNoteForm", JSON.stringify([...updatedNotes]));
        resetHandler()
        setShowForm(false)
    }

    const editor = useRef(null)

    return (
        <>
            <div className="add_address_form">
                <form onSubmit={submitHandler}>
                    <div className="formUpperContainer">
                        <input required value={newNoteForm.title} onChange={(e) => setNewNoteForm(prev => ({ ...prev, title: e.target.value }))} className="formInput" type="text" placeholder="Title" />
                        <JoditEditor
                            config={useMemo(() => ({
                                height: 220,
                                placeholder: "Description",
                                toolbarButtonSize: "small",
                                disablePlugins: ['spellcheck', 'speechRecognize', 'indent', 'color', 'align']
                            }),
                                []
                            )
                            }
                            ref={editor}
                            value={newNoteForm.description}
                            onChange={content => setNewNoteForm(prev => ({ ...prev, description: content }))}
                        />
                    </div>
                    <div className="addNoteBtnContainer">
                        {toUpdate ?
                            <button className="noteFormBtn noteAdd" onClick={updateHandler}>Update</button> :
                            <button type="submit" className="noteFormBtn noteAdd">Add</button>
                        }
                        <button className="noteFormBtn noteReset" onClick={resetHandler}>Reset</button>
                        <button className="noteFormBtn noteCancel" onClick={cancelHandler}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form;