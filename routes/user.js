const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/user');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);

module.exports = router;