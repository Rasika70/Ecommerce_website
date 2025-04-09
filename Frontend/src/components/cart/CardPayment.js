import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
//import {validateShipping} from '../cart/Shipping';
import {createOrder} from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    //const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const orderInfoString = sessionStorage.getItem('orderInfo');
    const { user } = useSelector(state => state.authState)
    const {items:cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error:orderError } = useSelector(state => state.orderState)
      
    let orderInfo = null;
    if (orderInfoString) {
      orderInfo = JSON.parse(orderInfoString);
    }

    if(orderInfo){
        console.log('Data from sessionStorage:',orderInfo);
        }else{
            console.log('No Data found from sessionStorage:');
        }        
    
    const paymentData = {
        
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
    }    


    const order = {
        orderItems: cartItems,
        shippingInfo
    }


    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice        
    }    

    useEffect(() => {
        //validateShipping(shippingInfo, navigate)
        if(orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_RIGHT,
                type: 'error',
                onOpen: ()=> { dispatch(clearOrderError()) }
            })
            return
        }

    },[dispatch,navigate,orderError,shippingInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;

        const getToken =  localStorage.getItem('token');
        
        try {
            const {data} = await axios.post('/api/v1/payment/process',
            paymentData,
            {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                  },
            })
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error){
                toast(result.error.message, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                document.querySelector('#pay_btn').disabled = false;
            }else{
                if((await result).paymentIntent.status === 'succeeded') {
                    toast('Payment Success!', {
                        type: 'success',
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))

                    navigate('/order/success')
                    
                }else{
                    toast('Please Try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }


        } catch (error) {
            
        }
    }


     return (
        <div className="row wrapper">
        <div className="col-lg-6">
            <form onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mb-4">Card Info</h1>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement
                            type="text"
                            id="card_num_field"
                            className="form-control"
                        />
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control"
                            value=""
                        />
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-12">
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay - {` ${orderInfo && orderInfo.totalPrice}`}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    )
} 