const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
  // get all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update User by id
  updateUserById({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User
  deleteUserById({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },


// add Friend
addFriend({ params, body }, res){
  User.findOneAndUpdate({ _id: params.userId}, { $pull: {friends: params.friendId} }, {new: true})
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: "User with this ID not found."});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => res.status(400).json(err));
},

//delete Friend 
  deleteFriend({ params, body }, res){
        User.findOneAndDelete({ _id: params.userId}, { $pull: {friends: params.friendId} }, {new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No User found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }


};



module.exports = userController;