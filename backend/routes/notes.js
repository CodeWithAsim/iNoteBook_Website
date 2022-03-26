const express = require("express");
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Fetching user's all notes using : GET /api/notes/fetchnotes . Login Required !

router.get("/fetchnotes", fetchUser, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {

        console.error(error.message);
        // res.status(500).send("Some error occured");
        res.status(500).send("Internal Server Error !");

    }

});

// ROUTE 2 : Adding user's notes using : POST /api/notes/addnotes . Login Required !

router.post("/addnotes", fetchUser, [

    body('title', "Enter a valid title !").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters !").isLength({ min: 5 })

], async (req, res) => {

    //If there are errors return badrequest 404 and the errors while checking the above validation ! 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { title, description, tag } = req.body;
        const notes = new Notes({
            user: req.user.id, title, description, tag
        })
        const savedNotes = await notes.save();
        res.json(savedNotes);

    } catch (error) {

        console.error(error.message);
        // res.status(500).send("Some error occured");
        res.status(500).send("Internal Server Error !");

    }

});

// ROUTE 3 : Update an existing notes using : PUT /api/notes/updatenotes . Login Required !

// parameter se wo id notes ki bhejni jo search kr k update krni hai

router.put("/updatenotes/:id", fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {

        const newNote = {}; // create an empty object , then appending 

        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // notes searching
        let notes = await Notes.findById(req.params.id); // let lagaya because neeche ja kr {new:true} se create kr k set kr rha hun  
        if (!notes) {
            return res.status(404).send("Not Found!");
        }

        // kh woapna hi notes change kr pae warna return 
        if (req.user.id !== notes.user.toString()) // user mai ObjectId type hoti hai so converting 
        {
            return res.status(401).send("Not Allowed!");
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        // res.send(notes);
        res.json({ notes });

    } catch (error) {
        console.error(error.message);
        // res.status(500).send("Some error occured");
        res.status(500).send("Internal Server Error !");
    }

});

// ROUTE 4 : Delete an existing notes using : DELETE /api/notes/deletenotes . Login Required !

// parameter se wo id notes ki bhejni jo search kr k delete krni hai

router.delete("/deletenotes/:id", fetchUser, async (req, res) => {

    // try catch lagao ga kh agr mongo db down huwa tw koi unknown error na aye "internal server error" ka message show kre

    try {

        // Search the note to be deleted and then delete it
        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Not Found!");
        }

        // Allow the user if the user really owns this note 
        if (req.user.id !== notes.user.toString()) // user mai ObjectId type hoti hai so converting 
        {
            return res.status(401).send("Not Allowed!");
        }

        // ab uper wale route mai yaad kro new:true isliye tha ta kh update kr k wo wahan db mai create kr de
        // aur ye findByIdAndDelete aur findByIdAndUpdate tw wese hi return kr dete notes 
        notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note is deleted successfully", note: notes });

    } catch (error) {
        console.error(error.message);
        // res.status(500).send("Some error occured");
        res.status(500).send("Internal Server Error !");
    }

});

module.exports = router