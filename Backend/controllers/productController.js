const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next)=>{
    const resPerPage = 6;
    
    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().filter()
    }
    
    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await Product.countDocuments({});
    let productsCount = totalProductsCount;

    if(filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount;
    }
    
    const products = await buildQuery().paginate(resPerPage).query;

    res.status(200).json({
        success : true,
        count: productsCount,
        resPerPage,
        products
    })
})


//Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next)=>{
    let images = []
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if(req.files && req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});


//Get Single Product - api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id).populate('reviews.user','name email');

    if(!product) {
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(201).json({
        success: true,
        product
    })
})

//Update Product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    //uploading images
    let images = []

    //if images not cleared we keep existing images
    if(req.body.imagesCleared === 'false' ) {
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }


    req.body.images = images;
    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })

})

//Delete Product - api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findByIdAndRemove(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    //await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

})

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) =>{
    const  { productId, rating, comment } = req.body;

    const review = {
        user : req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId);
   //finding user review exists
    const isReviewed = product.reviews.find(review => {
       return review.user.toString() == req.user.id.toString()
    })

    if(isReviewed){
        //updating the  review
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }

        })

    }else{
        //creating the review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    //find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })


})

//Get Reviews - api/v1/reviews?id={productId}
// exports.getReviews = catchAsyncError(async (req, res, next) =>{
//     const product = await Product.findById(req.query.id).populate('reviews.user','name email');
//     // const product = await Product.findById(req.query.id).populate('reviews.user','name email');

//     res.status(200).json({
//         success: true,
//         reviews: product.reviews
//     })
// })


// exports.getReviews = catchAsyncError(async (req, res, next) => {
//     try {
//         const product = await Product.findById(req.query.id).populate('reviews.user', 'name email');

//         // Check if the product was found
//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Product not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             reviews: product.reviews
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// });



exports.getReviews = catchAsyncError(async (req, res, next) => {
    try {
        const products = await Product.find({}).populate('reviews.user', 'name email');

        // Map through products to get only their reviews
        const reviews = products.map(product => ({
            productId: product._id,
            productName: product.name,
            reviews: product.reviews,
        }));

        res.status(200).json({
            success: true,
            reviews: reviews,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});




  exports.deleteReview = catchAsyncError(async (req, res, next) => {
    try {
        const productId = req.query.id;
        const reviewId = req.query.id; // Use query parameter to get reviewId

        // Find the product by _id and populate the 'reviews' field
        const product = await Product.findOne({ productId }).populate('reviews');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Check if the product has reviews
        if (!product.reviews || product.reviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product does not have any reviews',
            });
        }

        // Filter out the review to be deleted
        const updatedReviews = product.reviews.filter((review) => {
            return review._id.toString() !== reviewId;
        });

        // Update the number of reviews and ratings
        const numOfReviews = updatedReviews.length;
        const ratings = numOfReviews > 0 ?
            updatedReviews.reduce((acc, review) => {
                return review.rating + acc;
            }, 0) / numOfReviews :
            0;

        // Update the product document with the new reviews array, numOfReviews, and ratings
        const updatedProduct = await Product.findOneAndUpdate(
            productId,
            {
                reviews: updatedReviews,
                numOfReviews: numOfReviews,
                ratings: ratings,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update product',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product reviews updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});



  
  


// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
});




exports.getProductFiler =  async (req, res) => {
    try {
      const { minPrice, maxPrice, sizes, color } = req.query;
  
      // Build the filter object based on the provided criteria
      const filter = {};
      if (minPrice && maxPrice) {
        filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
      }
      if (sizes) {
        filter.sizes = { $in: sizes.split(',') }; // Assuming sizes is a comma-separated list
      }
      if (color) {
        filter.color = color;
      }
  
      // Query the database with the constructed filter
      const filteredProducts = await Product.find(filter);
  
      res.status(200).json({ success: true, data: filteredProducts });
    } catch (error) {
      console.error('Error filtering products:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
  


  
///
  exports.getProducts = async (req, res, next) => {
    try {
        let query = {}; // Initialize query object

        // 🔹 Filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        // 🔹 Add price range filter
        if (req.query.price) {
            const [min, max] = req.query.price.split(",");
            query.price = { $gte: min, $lte: max };
        }

        // 🔹 Fetch filtered products from the database
        const products = await Product.find(query);

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        return next(error);
    }
};
