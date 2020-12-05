const {
  Thoughts,
  User
} = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get single thought
  getThoughtById({
    params
  }, res) {
    Thoughts.findOne({
        _id: params.thoughtId
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: "Thought with that ID does not exist"
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // create a thought
  createThought({
    params,
    body
  }, res) {
    Thoughts.create(body)
      .select("-__v")
      .then(({
        _id
      }) => {
        //returns _id from params.userId then $pushes to thoughts
        returnUser.findOneAndUpdate({
            _id: params.userId
          }, {
            $push: {
              thoughts: _id
            }
          }, {
            new: true
          }

        );

      })

      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({
            message: "User with that id does not exist"
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
 // add reaction to thought
 addReaction({ params, body }, res) {
  Comment.findOneAndUpdate(
    { _id: params.thoughtId},
    { $push: { reaction: body } },
    { new: true, runValidators: true }
  )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
  // delete a thought

  removeThoughtById({
    params
  }, res) {
    Thoughts.findOneAndDelete({
        _id: params.thoughtId
      })
      .select("-__v")
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({
              message: "Thought with that ID does not exist"
            });
        }
        return User.findOneAndUpdate({
          _id: params.userId
        }, {
          $pull: {
            thoughts: params.thoughtId
          }
        }, {
          new: true
        });
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "User with that ID not found"
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // remove reaction
  removeReaction({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },



  //update thoughts
  updateThoughtById({
    params,
    body
  }, res) {
    Thoughts.findOneAndUpdate({
        _id: params.thoughtId
      }, body, {
        new: true,
        runValidators: true,
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: "Thought with that ID not found"
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};

module.exports = thoughtController;