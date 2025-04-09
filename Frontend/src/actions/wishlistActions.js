// wishlistActions.js

// Add Item to Wishlist

import { addToWishlistRequest, addToWishlistSuccess, addToWishlistFail, fetchWishlistRequest, fetchWishlistSuccess, fetchWishlistFail, removeFromWishlistRequest, removeFromWishlistSuccess, removeFromWishlistFail } from '../slices/wishlistSlice';
import axios from 'axios';

export const addToWishlist = _id => async dispatch => {
  const getToken =  localStorage.getItem('token');
  try {
    dispatch(addToWishlistRequest());

    //console.log(_id)

    const { data } = await axios.post(`/api/v1/add-to-wishlist/${_id}`,
    {
      headers: {
          Authorization: `Bearer ${getToken}`,
        },
  });

    dispatch(addToWishlistSuccess(data.data));
  } catch (error) {
    dispatch(addToWishlistFail(error.response.data.message));
  }
};


  // Fetch Item from Wishlist

  export const fetchWishlist = () => async dispatch => {

    const getToken =  localStorage.getItem('token');
    try {
      dispatch(fetchWishlistRequest());
      
      const user = localStorage.getItem('user');
      //console.log('Token:', user);

      
        // Parse the stored user data (assuming it's stored as a JSON string)
        const userData = JSON.parse(user);
      
        // Access the user ID
        const userId = userData._id;
      
        // console.log('User ID:', userId);     
      
      const { data } = await axios.get(`/api/v1/wishlist/${userId}`,
      {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    });

      //console.log({data:data})
        
      dispatch(fetchWishlistSuccess(data.wishlist));

      //console.log(data.wishlist)
      
      
    } catch (error) {
      dispatch(fetchWishlistFail(error.response.data.message));
    }
  };

  // Remove Item from Wishlist

export const removeFromWishlist = (_id) => async dispatch => {

  const getToken =  localStorage.getItem('token');
    try {
      dispatch(removeFromWishlistRequest());  
      
      const user = localStorage.getItem('user');
      //console.log('Token:', user);

      
        // Parse the stored user data (assuming it's stored as a JSON string)
        const userData = JSON.parse(user);
      
        // Access the user ID
        const userId = userData._id;
  
      const { data } = await axios.delete(`/api/v1/remove-from-wishlist/${_id}`,{
        params: { userId: userId },
      },
      {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    });

      console.log(data)
  
      dispatch(removeFromWishlistSuccess(data.data));
    } catch (error) {
      dispatch(removeFromWishlistFail(error.response.data.message));
    }
  };
