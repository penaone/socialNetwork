const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  removeThoughtById 
} = require('../../controllers/thought-controller');
// /api/users
router
.route('/')
.get(getAllThoughts)
.post(createThought)

router
.route('/:id')
.get(getThoughtById)
.put(updateThoughtById)
.delete(removeThoughtById)

// /api/thoughts/:thoughtId/reactions>


module.exports = router;