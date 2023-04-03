const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll =  (req, res) => {
 mongodb
 .getDB()
 .db('new-project')
 .collection('project')
 .find()
 .toArray((err, lists) => {
  if (err) {
    res.status(400).json({message: err});
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(lists);
 });
};

const getSingle =  (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact. ');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
  .getDB()
  .db('new-project')
  .collection('project')
  .find({_id: userId})
  .toArray((err, result) => {
   if (err) {
     res.status(400).json({message: err});
   }
   res.setHeader('Content-Type', 'application/json');
   res.status(200).json(result[0]);
  });
 };

const createNewContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteCompany: req.body.favoriteCompany,
    birthday: req.body.birthday,
    major: req.body.major,
    graduation: req.body.graduaction,
    favoriteSong: req.body.favoriteSong
  };
  const response = await mongodb.getDB().db('new-project').collection('project').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateExistingContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact. ');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteCompany: req.body.favoriteCompany,
    birthday: req.body.birthday,
    major: req.body.major,
    graduation: req.body.graduaction,
    favoriteSong: req.body.favoriteSong
  };
  const response = await mongodb
    .getDB()
    .db('new-project')
    .collection('project')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteSomeContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact. ');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDB().db('new-project').collection('project').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle, createNewContact, updateExistingContact, deleteSomeContact };
