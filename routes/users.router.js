const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { limit, offset } = req.query;
    if (limit && offset) {
        res.json({
            limit,
            offset
        })
    } else {
        res.send('there aren\'t params');
    }
});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    res.send('I am user ', userId);
});


module.exports = router;
