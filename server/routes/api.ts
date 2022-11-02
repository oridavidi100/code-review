import express from 'express';
const router = express.Router();
const { login } = require('../controller/user');

router.put('/login', login);
export default router;
