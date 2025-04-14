const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

router.post('/', ArticleController.create);
router.get('/:index/:id', ArticleController.get);
router.put('/:index/:id', ArticleController.update);
router.delete('/:index/:id', ArticleController.remove);
router.post('/:index/_search', ArticleController.search);
router.post('/:index/_bulk', ArticleController.bulkInsert);

module.exports = router;
