import {
    loginFail,
    loginRequest, 
    loginSuccess, 
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice';

import {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail

} from '../slices/userSlice'
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {

    
        try {
            dispatch(loginRequest())
            const { data }  = await axios.post(`/api/v1/login`,{email,password});

            const token = data.token;
            localStorage.setItem('token', token);
             //console.log(data)  
            const user = data.user;
            //console.log({user:user})
            localStorage.setItem('user', JSON.stringify(user));    

                         
            
            dispatch(loginSuccess(data))
            
        } catch (error) {
            dispatch(loginFail(error.response.data.message))
        }

}


export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`/api/v1/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}

export const loadUser =  async (dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
        dispatch(loadUserRequest())        

        const { data }  = await axios.get(`/api/v1/myprofile`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}  


export const logout =  async (dispatch) => {

    try {
        await axios.get(`/api/v1/logout`);
        localStorage.clear();
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail)
    }

}

export const updateProfile = (userData) => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${getToken}`
            }
        }

        const { data }  = await axios.put(`/api/v1/update`,userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}

export const updatePassword = (formData) => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${getToken}`
            }
        }
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }

}

export const forgotPassword = (formData) => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${getToken}`
            }
        }
        const { data} =  await axios.post(`/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }

}

export const resetPassword = (formData, token) => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${getToken}`
            }
        }
        const { data} =  await axios.post(`/api/v1/password/reset/${token}`, formData, config,);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}

export const getUsers =  async (dispatch) => {
    const getToken =  localStorage.getItem('token');
    try {
        dispatch(usersRequest())
        const { data }  = await axios.get(`/api/v1/admin/users`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(usersSuccess(data))
    } catch (error) {
        dispatch(usersFail(error.response.data.message))
    }

}

export const getUser = id => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {
        dispatch(userRequest())
        const { data }  = await axios.get(`/api/v1/admin/user/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }

}

export const deleteUser = id => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {
        dispatch(deleteUserRequest())
        await axios.delete(`/api/v1/admin/user/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
              },
        });
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }

}

export const updateUser = (id, formData) => async (dispatch) => {

    const getToken =  localStorage.getItem('token');
    try {
        dispatch(updateUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${getToken}`
            }
        }
        await axios.put(`/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }

}

