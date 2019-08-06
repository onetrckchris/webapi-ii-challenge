const router = require('express').Router();
const data = require('../data/db');

router.get('/:postId/comments', (req, res) => {
    const postId = req.params.postId;
    console.log(req.path);

    data.findPostComments(postId)
        .then(comments => {
            if(comments.length !== 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ error: "Could not find any comments for a post with this ID." });
            }
        })
        .catch(error => res.status(500).json({ error: "Server error when searching for comments that belong to a post with this ID." }));
});

router.get('/comments/:commentId', (req, res) => {
    const commentId = req.params.commentId;

    data.findCommentById(commentId)
        .then(comment => {
            if(comment.length !== 0) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ error: "Could not find any comment with this ID." });
            }
        })
        .catch(error => res.status(500).json({ error: "Server error when searching for comment with this ID." }));
});

router.post('/:postId/comments', (req, res) => {
    const comment = req.body;
    console.log(comment);

    if(comment.text && comment.post_id) {
        data.insertComment(comment)
            .then(comment => res.status(201).json({ message: "Successfully posted!" }))
            .catch(error => res.status(404).json({ error: "The post with the specified ID does not exist." }));
    } else {
        res.status(400).json({ error: "Please provide some text and a post ID." })
    }
})

module.exports = router;