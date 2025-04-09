const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');



//Create New Order - api/v1/order/new

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    });

    // Fetch user details for sending the email
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new Error('User not found'));
    }

    // Format order details for the email
    const orderDetails = orderItems.map(item => 
        `Product: ${item.name}\nQuantity: ${item.quantity}\nPrice: ₹${item.price}\n`
    ).join('\n');

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASS  
        }
    });

    // Email options
    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL, 
        to: user.email, 
        subject: 'Order Confirmation', 
        text: `Hello ${user.name},\n\nYour order has been placed successfully!.\n\nOrder Details:\n${orderDetails}\nTotal Price: ₹${totalPrice}\nThank you for your purchase!`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });

    res.status(200).json({
        success: true,
        order
    });
});



//Get Single Order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

//Get Loggedin User Orders - /api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id});

    res.status(200).json({
        success: true,
        orders
    })
})

//Admin: Get All Orders - api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Admin: Update Order / Order Status - api/v1/order/:id
exports.updateOrder =  catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }
    //Updating the product stock of each order item
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true
    })
    
});

async function updateStock (productId, quantity){
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false})
}

//Admin: Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    //await order.remove();
    res.status(200).json({
        success: true
    })
})

//User: Cancel Order - api/v1/order/:id
exports.cancelOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    //await order.remove();
    res.status(200).json({
        success: true
    })
})

//Admin:Get Order by order status - api/v1/admin/order/orderStatus
exports.getOrderStatus = catchAsyncError(async (req, res, next) => {
    const order = await Order.find(req.params.orderStatus);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        order
    })
});


// Function to get total sales by day
exports.getTotalSales = async (req, res, next) => {
    try {
        // Match orders based on the specified date range (optional)
        const match = {
            $match: {
                createdAt: {
                    $gte: new Date(`${req.query.startDate}T00:00:00Z`), 
                    $lt: new Date(`${req.query.endDate}T23:59:59Z`) 
                }
            }
        };

        // Group orders by day and calculate total sales
        const group = {
            $group: {
                _id: {
                    day: { $dayOfMonth: '$createdAt' },
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' },
                    product: '$orderItems.product'
                },
                totalSales: { $sum: '$totalPrice' } // Assuming totalPrice is the total amount for the order
            }
        };

        // Aggregate the orders using the defined pipeline
        const salesByDay = await Order.aggregate([match, group]);

        // Send the aggregated data as the response
        res.status(200).json({
            success: true,
            data: salesByDay
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};



