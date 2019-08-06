const router = require('express').Router();
const data = require('../data/db');

router.get('/', (req, res) => {
    data.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: "Could not find posts." }));
});

module.exports = router;