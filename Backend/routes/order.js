const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder, cancelOrder, getOrderStatus, getTotalSales } = require('../controllers/orderController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser,myOrders);
router.route('/:id').delete(isAuthenticatedUser,cancelOrder);



//Admin Routes
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders)
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
                        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)
router.route('/admin/order/orderStatus').get(isAuthenticatedUser, authorizeRoles('admin'), getOrderStatus);
router.route('/admin/order/get-total-sales').get(isAuthenticatedUser, authorizeRoles('admin'), getTotalSales);

module.exports = router;