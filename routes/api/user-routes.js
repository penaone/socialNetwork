const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend  
} = require('../../controllers/user-controller.js');
// /api/user
router
.route('/')
.get(getAllUsers)
.post(createUser)

router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)
// /api/user/:userId/friends/:friendId>
router
.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(deleteFriend)
module.exports = router;