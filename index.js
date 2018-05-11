const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = {
    description: 'title of note',
    demand: true,
    alias: 't'
},
bodyOptions = {
    description: 'content of the note',
    demand: false,
    alias: 'b'
};
const vargs = yargs
                .command('add', 'Add a new note', {
                    title: titleOptions,
                    body: bodyOptions
                })
                .command('remove', 'Remove a note', {
                    title: titleOptions
                })
                .command('find', 'Find a note from notes ', {
                    title: titleOptions
                })
                .command('list', 'List all notes')
                .help()
                .argv;

// console.log('yargs vargs', vargs);

const command = vargs._[0];

switch (command) {
    case 'add': notes.add(vargs.title, vargs.body);
        break;
    case 'remove': notes.remove(vargs.title);
        break;
    case 'find': notes.find(vargs.title);
        break;
    case 'list': notes.list();
        break;
    default: notes.list();
        break;
}
