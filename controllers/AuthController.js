/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const recordRoutes = express.Router();
const connetToMongoDB = require('../lib/db');

recordRoutes.post('/insertUser', async (req, res) => {
  const client = await connetToMongoDB();

  if (req.body.mobile.length === 10) {
    const userExist = await client.db('E-Commerce').collection('User_Details').findOne({ Mobile: req.body.mobile });
    if (userExist == null) {
      const matchUser = {
        Firstname: req.body.fname,
        Lastname: req.body.lname,
        Email: req.body.email,
        Mobile: req.body.mobile,
        Password: req.body.password,
      };

      await client
        .db('E-Commerce')
        .collection('User_Details')
        .insertOne(matchUser, (err, result) => {
          if (err) {
            res.status(400).send('Error inserting User!');
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res.json(matchUser);
          }
        });
    } else {
      res.status(400).send('User Already Exist');
    }
  } else {
    res.status(400).send('Please check credentials');
  }
});

recordRoutes.post('/authUser', async (req, res) => {
  const client = await connetToMongoDB();

  if (req.body.mobile.length === 10) {
    const userExist = await client.db('E-Commerce').collection('User_Details').findOne({ Mobile: req.body.mobile });
    if (userExist == null) {
      res.status(400).send('Incorrect Credentials OR Not have Account then please sign up');
    } else {
      const {
        Password,
      } = userExist;

      if (String(Password) === String(req.body.password)) {
        console.log('Authentication Successfull');
        res.json(userExist);
      } else {
        res.status(400).send('Incorrect Credentials');
      }
    }
  } else {
    res.status(400).send('Please check credentials');
  }
});

recordRoutes.post('/updateUser', async (req, res) => {
  const client = await connetToMongoDB();

  if (req.body.oldmobile.length === 10 && req.body.newmobile.length === 10) {
    const userExist = await client.db('E-Commerce').collection('User_Details').findOne({ Mobile: req.body.oldmobile });
    const checkMobileNo = await client.db('E-Commerce').collection('User_Details').findOne({ Mobile: req.body.newmobile });

    if (userExist == null) {
      res.status(400).send('User not Exist, please check credentials');
    } else if (checkMobileNo == null) {
      const updation = {
        $set: {
          Firstname: req.body.fname,
          Lastname: req.body.lname,
          Email: req.body.email,
          Mobile: req.body.newmobile,
          Password: req.body.password,
        },
      };

      await client.db('E-Commerce').collection('User_Details').updateOne({ Mobile: req.body.oldmobile }, updation, (err, _result) => {
        if (err) {
          res.status(400).send(`Error updating user on listing with id ${userExist.id}!`);
        } else {
          console.log('1 user updated successfully');
          res.json(updation);
        }
      });
    } else {
      res.status(400).send('Updation User already Exist');
    }
  } else {
    res.status(400).send('Please check credentials');
  }
});

recordRoutes.delete('/deleteUser', async (req, res) => {
  const client = await connetToMongoDB();

  if (req.body.mobile.length === 10) {
    const userExist = await client.db('E-Commerce').collection('User_Details').findOne({ Mobile: req.body.mobile });
    if (userExist == null) {
      res.status(400).send('Incorrect Credentials');
    } else {
      client.db('E-Commerce').collection('User_Details').deleteOne({ Mobile: req.body.mobile }, (err, _result) => {
        if (err) {
          res.status(400).send(`Error deleting user with id ${userExist.id}!`);
        } else {
          console.log('1 user deleted successfully');
          res.json(userExist);
        }
      });
    }
  } else {
    res.status(400).send('Please check credentials');
  }
});

recordRoutes.get('/getUsers', async (req, res) => {
  const client = await connetToMongoDB();

  client.db('E-Commerce').collection('User_Details').find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send('Error Users fetching, Please check connection');
    } else {
      res.json(result);
    }
  });
});

module.exports = recordRoutes;
