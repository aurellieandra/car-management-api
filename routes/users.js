var express = require('express');
var router = express.Router();

const UserController = require('../controller/user')

const isSuperAdmin = require('../middleware/isSuperAdmin')
const isAdmin = require('../middleware/isAdmin')
const isMember = require('../middleware/isMember')

const authAdmins = require('../middleware/authAdmins')
const authRegistered = require('../middleware/authRegistered')

// All
router.get('/login', UserController.login)
router.post('/register-member', UserController.registerMember)

// Registered
router.get('/info', authRegistered, UserController.currentUser)

// Super Admin
router.post('/register-admin', isSuperAdmin, UserController.registerAdmin)

// Admins Only
router.get('/', authAdmins, UserController.getAllUsers)

module.exports = router;