import express from 'express';
const router = express.Router();
const { login } = require('../controller/user');

const { findAllCodeBlocks } = require('../controller/codeBlock');

router.put('/login', login);
router.get('/findAllCodeBlocks', findAllCodeBlocks);

export default router;
