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
// /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser)

router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)
// /api/users/:userId/friends/:friendId>
router
.route('/:userId/friends/:friendId')
//.post(addFriend)
//.delete(deleteFriend)
module.exports = router;