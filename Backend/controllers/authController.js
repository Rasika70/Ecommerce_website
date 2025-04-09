const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const orderModel = require('../models/orderModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')



//Register User - /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password, role } = req.body

    let avatar;
    
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar,
        role
    });

    sendToken(user, 201, res)

})


//Login User - /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} =  req.body

    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding the user database
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
    
})

//Logout - /api/v1/logout
exports.logoutUser = (req, res, next) => {
        res.cookie('token',null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .status(200)
        .json({
            success: true,
            message: "Loggedout"
        })

}

//Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
    const user =  await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false})
    
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }


    //Create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try{
        sendEmail({
            email: user.email,
            subject: "USER Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error){
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }

})  

//Reset Password - /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async (req, res, next) => {
   const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 

    const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }

    if( req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    sendToken(user, 201, res)

})

//Get User Profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.user.id)
   res.status(200).json({
        success:true,
        user
   })
})

//Change Password  - api/v1/password/change
exports.changePassword  = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    //assigning new password
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true,
    })
 })

//Update Profile - /api/v1/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    let avatar;
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        newUserData = {...newUserData,avatar }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })

})

//Admin: Get All Users - /api/v1/admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
   const users = await User.find();
   res.status(200).json({
        success: true,
        users
   })
})

//Admin: Get Specific User - api/v1/admin/user/:id
exports.getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
   })
});

//Admin: Update User - api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Admin: Delete User - api/v1/admin/user/:id
// exports.deleteUser = catchAsyncError(async (req, res, next) => {
//     const user = await User.findById(req.params.id);
//     if(!user) {
//         return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
//     }
//     await user.remove();
//     res.status(200).json({
//         success: true,
//     })
// })

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`));
    }

    // Use findByIdAndDelete instead
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
});



var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


exports.sendMail = async (req, res) => {
    try{
        const { cartTotal } = req.body;
        //const token = req.body;
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization token not provided' });
        }

        //console.log(token)

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {

                //console.log(decoded)

                console.log('Error verifying token:', err);
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: 'Token has expired' });
                } else {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }
            
            const userId = decoded.id;
            //const _id = req.body;
    
        const user = await User.findById(userId);

        //console.log(user)
    
        if (!user) {
          console.log('User not found');
          return res.status(500).json({ success: false, message: 'User not found' });
        }

    const adminUser = await User.findOne({ role: 'admin' });

    //console.log(adminUser)

    if (!adminUser) {
      console.log('Admin user not found');
      return res.status(500).json({ success: false, message: 'Admin user not found' });
    }
   

    if (cartTotal >= 1500){
        var transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false,
              },    
          });
          
          var mailOptions = {
            from: user.email,
            to: adminUser.email,
            subject: 'Sending Email using Node.js',
            text: `Hello ${adminUser.name}! \n` +
            `${user.name} has purchased items worth more than 500 rupees.`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                res.send('Email sent Successfully')
              console.log('Email sent: ' + info.response);
            }
          });
    } else {
        res.send('Email not send. Because cart price is below 500')
        console.log('Email not send. Because cart price is below 500')
    }

    })} catch (error) {
        console.log(error);
    }
}



/* =============== News letter Implementaion ================ */


const sendNewsletter = async (subject, content, recipients) => {
    const adminUser = await User.findOne({ role: 'admin' });
  
    if (!adminUser) {
      console.log('Admin user not found');
      throw new Error('Admin user not found');
    }
  
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    const mailOptions = {
      from: adminUser.email,
      to: recipients.join(', '),
      subject: subject,
      html: content,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  exports.sendNewsletter = async (req, res) => {
    const { subject, content } = req.body;
  
    if (!subject || !content) {
      return res.status(400).json({ message: 'Subject and content are required' });
    }
  
    try {
      const users = await User.find({ role: 'user' }, 'email');
      const userEmails = users.map((user) => user.email);
  
      await sendNewsletter(subject, content, userEmails);
      res.status(200).json({ message: 'Newsletter sent successfully' });
    } catch (error) {
      console.error('Error sending newsletter:', error.message);
      res.status(500).json({ message: 'Failed to send newsletter. Please try again later.' });
    }
  };

