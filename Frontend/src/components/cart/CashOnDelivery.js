import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice';
import { createOrder } from '../../actions/orderActions';
import { clearError as clearOrderError } from '../../slices/orderSlice';
import axios from 'axios';

export default function CashOnDelivery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector((state) => state.cartState);
  const { error: orderError } = useSelector((state) => state.orderState);
  //const [paymentMethod, setPaymentMethod] = useState('card');
  const orderInfoString = sessionStorage.getItem('orderInfo');
  

  //console.log({ 'add':shippingInfo});
  //console.log('hello');
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  let orderInfo = null;
    if (orderInfoString) {
      orderInfo = JSON.parse(orderInfoString);
    }

    if(orderInfo){
        console.log('Data from sessionStorage:',orderInfo);
        }else{
            console.log('No Data found from sessionStorage:');
        }

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice        
    }

  const paymentData = {
    method: 'Cash on Delivery',
    amount : Math.round( orderInfo?.totalPrice * 100),       
      shipping :{
          name: user.name,
          address:{
              city: shippingInfo.city,
              postal_code : shippingInfo.postalCode,
              country: shippingInfo.country,
              state: shippingInfo.state,
              line1 : shippingInfo.address
          },
          phone: shippingInfo.phoneNo
      }
  };


  const handleCashOnDelivery = async () => {
    // Implement the logic for Cash on Delivery here
    // For example, you might want to show a confirmation message or process the COD order differently
     const result = await axios.post('/api/v1/payment/cod-process', paymentData )
    console.log('Processing Cash on Delivery');
    toast('Cash on Delivery order placed successfully!', {
      type: 'success',
      position: toast.POSITION.BOTTOM_RIGHT,
    });
       

    // Update the order object if needed
    order.paymentInfo = {
      method: 'Cash on Delivery',
      amount : Math.round( orderInfo?.totalPrice * 100),       
        shipping :{
            name: user.name,
            address:{
                city: shippingInfo.city,
                postal_code : shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1 : shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    };

    order.paymentInfo = {
        /* id: result._id, */
        id: user.id,
        status: result.status
    }

    dispatch(orderCompleted());
    dispatch(createOrder(order));

    navigate('/order/success');
  };

  useEffect(() => {
    if (orderError) {
      toast(orderError, {
        position: toast.POSITION.BOTTOM_RIGHT,
        type: 'error',
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  }, [dispatch, navigate, orderError]);

  return (
    
    <div style={{
      textAlign: 'center',
      padding: '40px', /* Adjust padding as needed */
      border: '1px solid #ccc', /* Add a border */
      borderRadius: '5px', /* Rounded corners */
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', /* Optional shadow */
      marginTop: '80px',
      background: 'white'
    }}>
        <p>Place your Cash on Delivery instructions or details here.</p>
        <button onClick={handleCashOnDelivery} 
        style={{
          marginTop:'20px',
          background: 'rgb(127,160,138)',
          color: 'black',
          border: 'none',
          transition: 'background 0.3s',
          padding: '10px',
          ":hover": {
            background: 'lightblue',
            cursor: 'pointer'
          }                   
        }}>
        Place Order</button>
    </div> 
        

    )
}
    