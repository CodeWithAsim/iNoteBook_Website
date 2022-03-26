// import React, { useContext } from 'react';
// import noteContext from '../context/notes/noteContext';
import Notes from './Notes';

function Home(props) {

    const { showAlert } = props;

    // const context = useContext(noteContext);
    // const { notes, setNotes } = context;

    return (
        <div className="container">
            {/* <h1>Add Your Note</h1>

            <form className="container my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> */}

            {/* <div className="my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return note.title;
                })}
            </div> */}
            {/* hamein props drilling krni par rae hai lakin ye app itni bari ni so theek hai ... lakin hum alerts ye sare context mai rakh sakte thy alag se  */}
            {/* aur destructuring kr ke ye props bahir nikal sakte thy like ... const {showAlert} = props; */}
            <Notes showAlert={showAlert} />

        </div>
    )
}

export default Home
