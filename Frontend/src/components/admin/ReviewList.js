// import { Fragment, useEffect, useState } from "react"
// import { Button } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import { deleteReview, getReviews } from "../../actions/productActions"
// import { clearError, clearReviewDeleted } from "../../slices/productSlice"
// import Loader from '../layouts/Loader';
// import { MDBDataTable} from 'mdbreact';
// import {toast } from 'react-toastify'
// import Sidebar from "./Sidebar"

// export default function ReviewList() {
//     const { reviews = [], loading = true, error, isReviewDeleted }  = useSelector(state => state.productState)
//     const [productId, setProductId] = useState("");
//     const dispatch = useDispatch();

//     const setReviews = () => {
//         const data = {
//             columns : [
//                 {
//                     label: 'ID',
//                     field: 'id',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Rating',
//                     field: 'rating',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'User',
//                     field: 'user',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Comment',
//                     field: 'comment',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Actions',
//                     field: 'actions',
//                     sort: 'asc'
//                 }
//             ],
//             rows : []
//         }

//         reviews.forEach( review => {
//             data.rows.push({
//                 id: review._id,
//                 rating: review.rating,
//                 user : review.user.name,
//                 comment: review.comment ,
//                 actions: (
//                     <Fragment>
//                         <Button onClick={e => deleteHandler(e, review._id)} className="btn btn-danger py-1 px-2 ml-2">
//                             <i className="fa fa-trash"></i>
//                         </Button>
//                     </Fragment>
//                 )
//             })
//         })

//         return data;
//     }

//     const deleteHandler = (e, id) => {
//         e.target.disabled = true;
//         dispatch(deleteReview(productId, id))
//     }

//     const submitHandler = (e) =>{
//         e.preventDefault();
//         dispatch(getReviews(productId))
//     }

//     useEffect(() => {
//         if(error) {
//             toast(error, {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearError()) }
//             })
//             return
//         }
//         if(isReviewDeleted) {
//             toast('Review Deleted Succesfully!',{
//                 type: 'success',
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 onOpen: () => dispatch(clearReviewDeleted())
//             })
//             dispatch(getReviews(productId))
//             return;
//         }

       
//     },[dispatch, error, isReviewDeleted,productId])


//     return (
//         <div className="row">
//         <div className="col-12 col-md-2">
//                 <Sidebar/>
//         </div>
//         <div className="col-12 col-md-10">
//             <h1 className="my-4">Review List</h1>
//             <div className="row justify-content-center mt-5">
//                 <div className="col-5">
//                     <form onSubmit={submitHandler}>
//                         <div className="form-group">
//                             <label >Product ID</label>
//                             <input 
//                                 type="text"
//                                 onChange= {e => setProductId(e.target.value)}
//                                 value={productId}
//                                 className="form-control"
//                             />
//                         </div> 
//                         <div className="pt-3 pl-3">                       
//                         <button type="submit" disabled={loading} className="btn btn-primary d-flex mx-auto">
//                             Search
//                         </button>
//                         </div>                        
//                     </form>
//                 </div>
//             </div>
//             <Fragment>
//                 {loading ? <Loader/> : 
//                     <MDBDataTable
//                         data={setReviews()}
//                         bordered
//                         striped
//                         hover
//                         className="px-3"
//                     />
//                 }
//             </Fragment>
//         </div>
//     </div>
//     )
// }



// // ReviewList.js
// AllReviews.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ReviewList = () => {
//     const [reviewsData, setReviewsData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchAllReviews = async () => {
//             const getToken =  localStorage.getItem('token');
//             try {
//                 const response = await axios.get('http://localhost:8000/api/v1/admin/reviews',
//                     {
//                         headers: {
//                             Authorization: `Bearer ${getToken}`,
//                           },
//                     });
//                 console.log(response)
//                 setReviewsData(response.data.reviews);
//             } catch (err) {
//                 setError('Error fetching reviews');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAllReviews();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <h2>All Product Reviews</h2>
//             {reviewsData.length === 0 ? (
//                 <p>No reviews available</p>
//             ) : (
//                 reviewsData.map((product) => (
//                     <div key={product.productId} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
//                         <h3>{product.productName}</h3>
//                         {product.reviews.length === 0 ? (
//                             <p>No reviews for this product</p>
//                         ) : (
//                             product.reviews.map((review) => (
//                                 <div key={review._id} style={{ margin: '10px 0', border: '1px solid #eee', padding: '5px' }}>
//                                     <p><strong>User:</strong> {review.user.name} ({review.user.email})</p>
//                                     <p><strong>Rating:</strong> {review.rating}</p>
//                                     <p><strong>Comment:</strong> {review.comment}</p>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default ReviewList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact'; // Import MDB DataTable
import Sidebar from './Sidebar'; // Import your Sidebar component
import Loader from '../layouts/Loader'; // Optional: Import your Loader component

const ReviewList = () => {
    const [reviewsData, setReviewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAllReviews = async () => {
            const getToken = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/v1/admin/reviews', {
                    headers: {
                        Authorization: `Bearer ${getToken}`,
                    },
                });
                setReviewsData(response.data.reviews);
            } catch (err) {
                setError('Error fetching reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchAllReviews();
    }, []);

    if (loading) return <Loader />; // Show loader while fetching
    if (error) return <div>{error}</div>;

    // Prepare data for MDB DataTable
    const data = {
        columns: [
            { label: 'Product Name', field: 'productName', sort: 'asc' },
            { label: 'User', field: 'user', sort: 'asc' },
            { label: 'Rating', field: 'rating', sort: 'asc' },
            { label: 'Comment', field: 'comment', sort: 'asc' },
        ],
        rows: reviewsData.flatMap(product => 
            product.reviews.map(review => ({
                productName: product.productName,
                user: `${review.user.name} (${review.user.email})`,
                rating: review.rating,
                comment: review.comment,
            }))
        ),
    };

    return (
        <div className="row">
            <div className="col-md-2">
                <Sidebar /> {/* Render the sidebar on the left */}
            </div>
            <div className="col-md-10 mt-2">
                <h2>Product Reviews</h2>
                {data.rows.length === 0 ? (
                    <p>No reviews available</p>
                ) : (
                    <MDBDataTable
                        data={data}
                        bordered
                        striped
                        hover
                        className="mt-4 mr-4 custom-table"
                    />
                )}
            </div>
        </div>
    );
};

export default ReviewList;



