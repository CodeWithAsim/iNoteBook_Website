import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Notesitem = (props) => {

    const { note, editNote } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3" >

            {/* {note.title}
            <br/>
            {note.description} */}

            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title" style={{ margin: "3px" }}>{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-3" onClick={() => { deleteNote(note._id); props.showAlert("success", "Note is deleted successfully !"); }}></i>
                        <i className="fa-solid fa-pen-clip" onClick={() => { editNote(note) }}></i>
                    </div>
                    <p className="card-text" style={{ margin: "3px" }}>{note.description}</p>

                </div>
            </div>

        </div>
    )
}

export default Notesitem
