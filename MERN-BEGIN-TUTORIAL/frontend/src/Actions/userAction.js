import axios from "axios";
import USER_CONTANTS from "../Constants/userConstants";

export const signing = (email, password) => async (dispacth) => {
    
    dispacth({
        type: USER_CONTANTS.USER_SIGNING_REQUEST,
        payload: {
            email,
            password
        }
    });
    
    try {
        const { data } = await axios.post('/api/users/signin',{email, password});
        dispacth({
            type: USER_CONTANTS.USER_SIGNING_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfor',JSON.stringify(data));
    } catch (error) {
        dispacth({
            type: USER_CONTANTS.USER_SIGNING_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('userInfor');
    localStorage.removeItem('shippingAddress');
    dispatch({type: USER_CONTANTS.USER_SIGNOUT});
    document.location.href = '/signin';
}

export const registerUser = (name ,email, password) => async (dispacth) => {
    
    try {
        const { data } = await axios.post('/api/users/register',{name ,email, password});
        dispacth({
            type: USER_CONTANTS.USER_REGISTER_SUCCESS,
            payload: data
        });
        dispacth({
            type: USER_CONTANTS.USER_SIGNING_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispacth({
            type: USER_CONTANTS.USER_SIGNING_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({
        type: USER_CONTANTS.USER_DETAILS_REQUEST,
        payload: userId
    });
    const { user: { userInfo }} = getState();
    try {
        
        const { data } = await axios.get(
            `/api/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
        dispatch({
            type: USER_CONTANTS.USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_CONTANTS.USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
        
    }
}

export const updateUserProfile = (userData) => async (dispatch, getState) => {
    dispatch({
        type:USER_CONTANTS.USER_UPDATE_PROFILE_REQUEST
    });
    const { user: { userInfo }} = getState();
    try {
        const { data } = await axios.put(
            `/api/users/profile`,
            userData,
            {
                headers: {Authorization : `Bearer ${userInfo.token}`}
            }
        );
        dispatch({
            type: USER_CONTANTS.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_CONTANTS.USER_SIGNING_SUCCESS,
            payload: data
        });

        localStorage.setItems('userInfor', JSON.stringify(data))
    } catch (error) {
        return {
            type: USER_CONTANTS.USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }
    }
}