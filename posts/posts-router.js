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
    console.log(req.body);

    if(post.title && post.contents) {
        data.insert(post)
        .then(() => res.status(201).json({ message: "Successfully posted!" }))
        .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database"  }));
    } else {
        res.status(400).json({ error: "Please provide title and contents for the post."  });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    data.remove(id)
        .then(post => {
            if(post) {
                res.status(204).json(post);
            } else {
                res.status(404).json({ error: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => status(500).json({ error: "The post could not be removed" }));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if(changes.title && changes.contents) {
        data.update(id, changes)
            .then(updated => {
                if(updated) {
                    res.status(202).json(changes);
                } else {
                    res.status(404).json({ error: "The post with the specified ID does not exist." });
                }
            })
            .catch(error => res.status(500).json({ error: "The post information could not be modified." }));
    } else {
        res.status(400).json({ error: "Please provide title and contents for the post."  })
    }
})

module.exports = router;