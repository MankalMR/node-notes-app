const fs = require('fs');
const _ = require('lodash');
const notesFileName = 'notes.json';
let notes = [];
try {
    const notesStr = (fs.readFileSync(notesFileName)).toString();
    notes = notesStr ? JSON.parse(notesStr) : [];
} catch (err) {
    notes = [];
}

let add = (title, body) => {
    const newNote = {
        title,
        body
    };
    const add_cb = (err) => {
        const noteTitle = `Note Title: ${title} `;
        const msg = err ? `${noteTitle} NOT added to list` : `${noteTitle} added successfully!`;
        console.log(`
            ${msg}
        `);
    };

    if (!find(title, true)) {
        notes.push(newNote);
        writeToFile(notes, add_cb);
    } else {
        console.log(`
            Note Title: '${title}' already exists!
        `);
    }
},
remove = (title) => {
    const remove_cb = (err) => {
        const noteTitle = `Note Title: ${title} `;
        const msg = err ? `${noteTitle} NOT removed from list` : `${noteTitle} removed successfully!`;
        console.log(`
            ${msg}
        `);
    };

    const noteIndex = findNoteIndex(title);

    if (noteIndex >= 0) { // which means note is found in the list of notes
        notes.splice(noteIndex, 1);
        writeToFile(notes, remove_cb);
    }
},
find = (title, hideErrors) => {
    const noteIndex = findNoteIndex(title, hideErrors ? hideErrors: false);

    if (noteIndex >= 0) { // which means note is found in the list of notes
        console.log(`
            Note found at entry ${noteIndex + 1}.
            Title: ${title}.
            Content: ${notes[noteIndex].body}
        `);
        return true;
    }
    return false;
},
list = () => {
    let index = 1;
    if (notes.length) {
        notes.forEach((note) => {
            console.log(`
                Note ${index++}.
                Title: ${note.title}
                Content: ${note.body}
            `);
        });
    } else {
        console.log(`
            Notes is EMPTY!
        `);
    }
},
findNoteIndex = (noteTitle, isHideErrors) => {
    const isNotesEmpty = notes.length === 0;
    const noteIndex = notes.findIndex((note) => {
        return noteTitle === note.title;
    });

    if (isHideErrors) return noteIndex;

    if (isNotesEmpty) {
        console.log(`
            Nothing to find. Notes is EMPTY!
        `);
    } else if (noteIndex === -1) {
        console.log(`
            Note Title: '${noteTitle}' NOT found in notes log.
        `);
    }

    return noteIndex;
},
writeToFile = (notes, callback) => {
    const notesStr = JSON.stringify(notes);
    fs.writeFile(notesFileName, notesStr, callback);
};

module.exports = {
    add,
    remove,
    find,
    list
};


