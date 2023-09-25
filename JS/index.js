const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const crypto = require('crypto')

let thoughts = [
    {id: crypto.randomUUID(), content: 'Good thought'},
    {id: crypto.randomUUID(), content: 'Everything is fine'}]

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/thoughts', (req, res) => {
    res.send(thoughts);
})

app.get('/thoughts/:id', (req, res) => {
    const id = req.params.id;

    for (const thought of thoughts) {
        if (thought.id === id) {
            res.json(thought);
            return;
        }
    }

    res.status(404).send('Thought not found');
});

app.post('/thoughts', (req, res) => {
    const thoughtContent = req.body.content;
    const thought = {id: crypto.randomUUID(), content: thoughtContent}
    thoughts.push(thought);

    res.status(201).send(thought);
});

app.delete('/thoughts/:id', (req, res) => {
    const id = req.params.id;

    for (const thought of thoughts) {
        if (thought.id === id) {
            const index = thoughts.indexOf(thought);
            thoughts.splice(index, 1);
            res.json(thought);
            return;
        }
    }

    res.status(404).send('Thought not found');

});

app.put('/thoughts/:id', (req, res) => {
    const id = req.params.id;

    for (const thought of thoughts) {
        if (thought.id === id) {
            const index = thoughts.indexOf(thought);
            thoughts.splice(index, 1);
            const updatedThought = {id: id, content: req.body.content}
            thoughts.push(updatedThought);
            res.json(updatedThought);
            return;
        }
    }

    res.status(404).send('Thought not found');

});

app.listen(port, () => console.log(`Brain running on port ${port}`));
