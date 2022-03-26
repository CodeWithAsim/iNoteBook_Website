import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000/";

    const initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);

    const getNotes = async () => {

        const response = await fetch(`${host}api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxZDIwOWQ4NTI4NTM1OTJhOGFmMjE1In0sImlhdCI6MTY0NzQ4OTA2OX0.n69SgprVSLA7g-mIe8z6Tv_oHOa9TmGx01SWjGwCfiY'
            }
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        setNotes(json);

    }

    // ADD A NOTE
    const addNote = async (title, description, tag) => {

        //TODO : API CALL rehti ... abhi sirf frontend tyar aur change in frontend hum ne ye changes in backend bhi krni hai 

        // API call

        const response = await fetch(`${host}api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        const note = json;

        // const note = {
        //     "_id": "86223a9ac014d3b40fec7b4531",
        //     "user": "621d209d852853592a8af215",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-03-05T18:19:24.457Z",
        //     "__v": 0
        // }

        setNotes(notes.concat(note));

    }

    //DELETE A NOTE 
    const deleteNote = async (id) => {

        //TODO : API CALL rehti ... abhi sirf frontend tyar aur change in frontend hum ne ye changes in backend bhi krni hai  

        // API call

        const response = await fetch(`${host}api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        console.log("Deleting a note with id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);

    }

    //UPDATE A NOTE 
    const updateNote = async (id, title, description, tag) => {

        // API call

        const response = await fetch(`${host}api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        // Edit at client side 

        let newState = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newState.length; index++) {

            // const element = notes[index];
            // if (element._id === id) {
            //     element.title = title;
            //     element.description = description;
            //     element.tag = tag;
            // }
            // const element = newState[index];

            if (newState[index]._id === id) {
                newState[index].title = title;
                newState[index].description = description;
                newState[index].tag = tag;
                break;
            }

        }

        setNotes(newState);

    }

    // const s = {
    //     "name": "asim",
    //     "class": "engineering"
    // }

    // const [state, setState] = useState(s);

    // const update = () => {

    //     setTimeout(() => {
    //         setState({
    //             "name": "Asim",
    //             "class": "Engineering"
    //         });

    //     }, 2000);

    // }

    return (

        // <noteContext.Provider value={{ state, update }} >
        // <noteContext.Provider value={{ notes, setNotes }} >
        <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }} >
            {props.children}
        </noteContext.Provider>

    )

}

export default NoteState;