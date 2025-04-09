// Wishlist.js

import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";
import { fetchWishlist, removeFromWishlist } from "../../actions/wishlistActions";
import { clearWishlist, clearWishlistItemRemoved } from "../../slices/wishlistSlice";
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';

const Wishlist = (userId) => {
  //const { user } = useSelector(state => state.authState);
  const { wishlistItems = [], loading, error, isWishlistItemRemoved } = useSelector(state => state.wishlistState);
  const dispatch = useDispatch();

  console.log(userId)
  const setWishlistItems = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: []
    };
    console.log(data)
    wishlistItems.forEach(item => {
      data.rows.push({
        id: item._id,
        name: item.name,
        price: `₹${item.price}`,
        actions: (
          <Fragment>
            {/* <Link to={`/product/${item._id}`} className="btn btn-primary"><i className="fa fa-eye"></i></Link> */}            
            <button onClick={() => removeFromWishlistHandler(item._id)} className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        )
      });
    });

    return data;
  };

  const removeFromWishlistHandler = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        type: 'error',
        onOpen: () => { dispatch(clearWishlist()) }
      });
      return;
    }

    if (isWishlistItemRemoved) {
      toast('Item Removed from Wishlist Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_RIGHT,
        onOpen: () => dispatch(clearWishlistItemRemoved())
      });
    }

     dispatch(fetchWishlist());
  }, [dispatch, error, isWishlistItemRemoved]);

  return (
    <div className="container">
      <h1 className="my-4">Wishlist</h1>
      {loading ? <Loader /> :
        <MDBDataTable
          data={setWishlistItems()}
          bordered
          striped
          hover
          className="px-3"
        />
      }
    </div>
  );
  
  
};

export default Wishlist;

