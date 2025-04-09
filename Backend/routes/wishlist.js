const express = require('express');
const { addProductToWishList, deleteWishListItems, getWishListItems } = require('../controllers/wishListController')
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/add-to-wishlist/:id').post( isAuthenticatedUser, addProductToWishList);
router.route('/remove-from-wishlist/:id').delete( isAuthenticatedUser, deleteWishListItems);
router.route('/wishlist/:id').get( isAuthenticatedUser, getWishListItems);



module.exports = router;