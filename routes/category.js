const  { Router } = require('express');

const {
    categoryGet, categoryPost,
} = require('../controllers/category');

const router = Router();

    router.get('/', categoryGet );
    router.post('/', categoryPost);


module.exports = router;