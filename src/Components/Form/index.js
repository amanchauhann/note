import { useState } from "react"
import "./Form.css"
import { v4 as uuidv4 } from 'uuid';
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser'


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
            // author: "",
            // published_date: ""
        })
    }

    const cancelHandler = () => {
        resetHandler()
        setShowForm(false)
    }
    const updateHandler = () => {

        const updatedNotes = existingNotes.map((each) => {
            if (each.id === newNoteForm.id) {
                return { ...newNoteForm, updatedAt: new Date() }; // Update the existing game
            } else {
                return each; // Keep other games as they are
            }
        });
        localStorage.setItem("newNoteForm", JSON.stringify([...updatedNotes]));
        resetHandler()
        // setNewNoteForm({
        //     id: uuidv4(),
        //     title: "",
        //     description: "",
        //     createdAt: new Date()
        // })
        setShowForm(false)
    }

    const editor = useRef(null)

    return (
        <>
            <div className="add_address_form">
                <form onSubmit={submitHandler}>
                    <div className="formUpperContainer">
                        <input required value={newNoteForm.title} onChange={(e) => setNewNoteForm(prev => ({ ...prev, title: e.target.value }))} className="formInput" type="text" placeholder="Title" />

                        {/* <input required value={newGameForm.url} onChange={(e) => setNewGameForm(prev => ({ ...prev, url: e.target.value }))} className="formInput" type="text" placeholder="URL" /> */}
                        {/* <textarea required value={newGameForm.author} onChange={(e) => setNewGameForm(prev => ({ ...prev, author: e.target.value }))} className="formInput" type="text" placeholder="Author" ></textarea> */}
                        <JoditEditor
                            config={useMemo(() => ({
                                // Jodit editor configuration options go here
                                height: 220,
                                placeholder: "Description",
                                // spellcheck: false, // Disable spell check
                                // speechRecognition: false,
                                toolbarButtonSize: "small",
                                // showTooltip: true,
                                disablePlugins: ['spellcheck', 'speechRecognize', 'indent', 'color', 'align']
                            }),
                                []
                            )
                            }
                            ref={editor}
                            value={newNoteForm.description}
                            onChange={content => setNewNoteForm(prev => ({ ...prev, description: content }))}
                        />

                        {/* <input required value={newNoteForm.description} onChange={(e) => setNewNoteForm(prev => ({ ...prev, description: e.target.value }))} className="formInput" type="text" placeholder="Description" /> */}

                        {/* <input required value={newGameForm.published_date} onChange={(e) => setNewGameForm(prev => ({ ...prev, published_date: e.target.value }))} className="formInput" placeholder="Published (2022-08-03)" /> */}
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