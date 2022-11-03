import express from 'express';
const router = express.Router();

const { login } = require('../controller/user');
const {
  findAllCodeBlocks,
  findOneCodeBlock,
  changeCodeBlockName,
} = require('../controller/codeBlock');

router.put('/login', login);
router.get('/findAllCodeBlocks', findAllCodeBlocks);
router.get('/findOneCodeBlock/:id', findOneCodeBlock);
router.put('/changeCodeBlockName', changeCodeBlockName);
export default router;
