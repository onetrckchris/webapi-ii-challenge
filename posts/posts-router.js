const router = require('express').Router();
const data = require('../data/db');

router.get('/', (req, res) => {
    data.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: "Could not find posts." }));
});

router.get('/:id', (req, res) => {
    console.log("This is the path I'm looking at: ", req.path);
    const id = req.params.id;

    data.findById(id)
        .then(post => {
            // How come just checking if the post exists 
            // worked in users-api but not here?
            if(post.length !== 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: "Could not find post with that ID." })
            }
        })
        .catch(error => res.status(500).json({ error: "Server error when searching for post with this ID." }))
});

router.post('/', (req, res) => {
    const post = req.body;

    if(post.title && post.contents) {
        data.insert(post)
        .then(() => res.status(201).json({ message: "Successfully posted!" }))
        .catch(error => res.status(400).json({ error: "Please provide title and content for the blog post." }));
    } else {
        res.status(500).json({ error: "Server error when posting." });
    }
});

module.exports = router;