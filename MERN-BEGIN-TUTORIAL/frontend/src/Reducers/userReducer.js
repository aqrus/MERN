import USER_CONTANTS from "../Constants/userConstants";

let initialState = {
    userInfo: localStorage.getItem('userInfor') ? JSON.parse(localStorage.getItem('userInfor')) :null
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONTANTS.USER_SIGNING_REQUEST:
            return {loading: true}
        case USER_CONTANTS.USER_SIGNING_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_CONTANTS.USER_SIGNING_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case USER_CONTANTS.USER_SIGNOUT:
            return {}
        
        case USER_CONTANTS.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_CONTANTS.USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_CONTANTS.USER_DETAILS_REQUEST:
            return { loading: true}
        case USER_CONTANTS.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userDetail: action.payload
            }
        case USER_CONTANTS.USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONTANTS.USER_UPDATE_PROFILE_REQUEST:
           return {
               loadingUpdate: true
           }
        case USER_CONTANTS.USER_UPDATE_PROFILE_SUCCESS:
            return {
                loadingUpdate: false,
                successUpdate: true
            }
        case USER_CONTANTS.USER_UPDATE_PROFILE_FAIL:
            return {
                loadingUpdate: false,
                errorUpdate: action.payload
            }
        default:
           return state;
    }
}