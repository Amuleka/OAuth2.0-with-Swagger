const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/project');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.saveContact, contactsController.createNewContact);

router.put('/:id', validation.saveContact, contactsController.updateExistingContact);

router.delete('/:id', contactsController.deleteSomeContact);

module.exports = router;
