import express from 'express';
const router = express.Router();
const { login } = require('../controller/user');

router.get('/login', login);
export default router;
