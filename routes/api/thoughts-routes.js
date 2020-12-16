const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  removeThoughtById,
  createReaction,
  removeReaction 
} = require('../../controllers/thought-controller');
// /api/users
router
.route('/:userId')
.get(getAllThoughts)
.post(createThought)

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThoughtById)
.delete(removeThoughtById)

// /api/thoughts/:thoughtId/reaction>
router
.route('/:userId/:thoughtId/reaction')
.put(createReaction)

router
.route('/:userId/:thoughtId/reaction/:reactionId')
.delete(removeReaction)


module.exports = router;