const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts, getProductFiler } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })


/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/product'); // Adjust path if needed
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage }); */


router.route('/products').get( getProducts);
router.route('/product/:id')
                            .get(getSingleProduct);
            
        
router.route('/review').put(isAuthenticatedUser, createReview);
router.route('/filter-products').get( getProductFiler);
/* router.route('/review/:id').get */
                      


//Admin routes
router.route('/admin/product/new')
    .post(upload.array('images'),isAuthenticatedUser, authorizeRoles('admin'), newProduct);
//router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/admin/product/:id').put(upload.array('images'),isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
// router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRoles('admin'),getReviews)
router.route('/admin/reviews').get(getReviews)
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteReview)
module.exports = router;