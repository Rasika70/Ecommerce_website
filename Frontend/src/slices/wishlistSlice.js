// wishlistSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlistRequest: state => {
      state.loading = true;
    },
    addToWishlistSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.wishlistItems = action.payload;
    },
    addToWishlistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================ Fetch the Wishlist ================ */

    fetchWishlistRequest: state => {
        state.loading = true;
      },
      fetchWishlistSuccess: (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlistItems = action.payload;
      },
      fetchWishlistFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      /* ============ Remove from Wishlist ============= */
      removeFromWishlistRequest: state => {
        state.loading = true;
        state.isWishlistItemRemoved = false;
      },
      removeFromWishlistSuccess: (state, action) => {
        state.loading = false;
        state.error = null;
        state.isWishlistItemRemoved = true;
        state.wishlistItems = action.payload;
      },
      removeFromWishlistFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    clearWishlist: state => {
      state.wishlistItems = [];
    },
    clearWishlistItemRemoved: state => {
        state.isWishlistItemRemoved = false;
      },
  },
});

export const {
  addToWishlistRequest,
  addToWishlistSuccess,
  addToWishlistFail,
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFail,
  removeFromWishlistRequest,
  removeFromWishlistSuccess,
  removeFromWishlistFail,
  clearWishlist,
  clearWishlistItemRemoved,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
