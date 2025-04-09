import axios from 'axios';
import { productsFail, productsSuccess, productsRequest, adminProductsRequest, adminProductsSuccess, adminProductsFail } from '../slices/productsSlice';
import { productFail, productSuccess, productRequest, createReviewRequest, createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slices/productSlice';




export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 

        let  link = `/api/v1/products`;
        
        /* if(currentPage){
             link = `/api/v1/products?page=${currentPage || 0}`;
        }  */  
        if(currentPage){
            link += `${link.includes('?') ? '&' : '?'}page=${currentPage || 0}`;

       }    
        
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
        
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        console.log(error.response.data.message)
        dispatch(productsFail(error.response.data.message))
    }
    
}

export const getProduct = id => async (dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(productRequest()) 
        const { data }  =  await axios.get(`/api/v1/product/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(productSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message))
    }
    
}

export const createReview = reviewData => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(createReviewRequest()) 
        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        }
        const { data }  =  await axios.put(`/api/v1/review`,reviewData, config,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(createReviewSuccess(data))
    } catch (error) {
        //handle error
        dispatch(createReviewFail(error.response.data.message))
    }
    
}




export const getAdminProducts  =  async (dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(adminProductsRequest()) 
        const { data }  =  await axios.get(`/api/v1/admin/products`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}


export const createNewProduct  =  productData => async (dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(newProductRequest()) 

        /* const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}; */
            
        const { data }  =  await axios.post(`/api/v1/admin/product/new`, productData,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message))
    }
    
}

export const deleteProduct  =  id => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`/api/v1/admin/product/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}

export const updateProduct  =  (id, productData) => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`/api/v1/admin/product/${id}`,
        productData,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}


export const getReviews =  id => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(reviewsRequest()) 
        const { data }  =  await axios.get(`/api/v1/admin/reviews`,{params: {id}},
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(reviewsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(reviewsFail(error.response.data.message))
    }
    
}

export const deleteReview =  (productId, id) => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {  
        dispatch(deleteReviewRequest()) 
        await axios.delete(`/api/v1/admin/review`,{query: {productId, id}},
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}
