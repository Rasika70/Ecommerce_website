import {adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess, cancelOrderRequest, cancelOrderSuccess } from '../slices/orderSlice';
import axios from 'axios';

export const createOrder = order => async(dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
       dispatch(createOrderRequest())
       const {data} = await axios.post(`/api/v1/order/new`, order,
       {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    });
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const userOrders = async(dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
       dispatch(userOrdersRequest())
       const {data} = await axios.get(`/api/v1/myorders`,
       {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
       dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id => async(dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
       dispatch(orderDetailRequest())
       const {data} = await axios.get(`/api/v1/order/${id}`,
       {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders = async(dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`/api/v1/admin/orders`,
       {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = id => async(dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
       dispatch(deleteOrderRequest())
       await axios.delete(`/api/v1/admin/order/${id}`,
       {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
       dispatch(deleteOrderSuccess())
    } catch (error) {
       dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder = (id, orderData)  => async(dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
       dispatch(updateOrderRequest())
       const { data} = await axios.put(`/api/v1/admin/order/${id}`, orderData,
       {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
       dispatch(updateOrderSuccess(data))
    } catch (error) {
       dispatch(updateOrderFail(error.response.data.message))
    }
}

export const cancelOrder = id => async(dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
       dispatch(cancelOrderRequest())
       await axios.delete(`/api/v1/${id}`,
       {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
       dispatch(cancelOrderSuccess())
    } catch (error) {
       dispatch(deleteOrderFail(error.response.data.message))
    }
}