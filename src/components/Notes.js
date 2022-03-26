import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Notesitem from './Notesitem';
import { useHistory } from 'react-router-dom';

const Notes = (props) => {

    const history = useHistory();

    const { showAlert } = props;

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const editNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const context = useContext(noteContext);
    // const { notes, setNotes } = context;
    const { notes, getNotes, updateNote } = context;

    const OnChangeHandler = (e) => {
        //spread (...) operator use kiya hai -> jo kuch hai note mai + jo new properties add ki hai wo add ya overwrite ... darmyan wali property hai ... isliye hum ne name and id add kiye aur un ko wo hi name jo state mai diye initially chaheye diye
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const AddItHandler = (e) => {
        // e.preventDefault(); // because update it ka button form se bahir hai so ... iski zaroorat ni hai so 
        console.log(note);

        updateNote(note.id, note.etitle, note.edescription, note.etag)

        refClose.current.click();

        showAlert("success", "Your note is updated successfully !");
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            // //eslint-disable-next-line
        }
        else {
            showAlert("danger", "Please login first to access your notes !");
            history.push("/login");
        }
        // getNotes()
        // //eslint-disable-next-line
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <Addnote showAlert={showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container my-3">

                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={OnChangeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={OnChangeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={OnChangeHandler} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Back</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={AddItHandler} className="btn btn-dark">Update It</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-3">
                    {notes.length === 0 && <h6 className='text-center mt-5'>You have no notes to read for now . . . </h6>}
                </div>
                {notes.map((note) => {
                    return <Notesitem showAlert={showAlert} key={note._id} note={note} editNote={editNote} />
                })}
            </div>
        </>
    )
}

export default Notes
