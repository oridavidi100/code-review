import express from 'express';
const router = express.Router();

const { login } = require('../controller/user');
const {
  findAllCodeBlocks,
  findOneCodeBlock,
} = require('../controller/codeBlock');

router.put('/login', login);
router.get('/findAllCodeBlocks', findAllCodeBlocks);
router.get('/findOneCodeBlock/:id', findOneCodeBlock);
export default router;
