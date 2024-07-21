import axios from "axios"

const serverUrl = "http://localhost:7001/api/v1"
// const serverUrl = "https://chitkara-backend.onrender.com/api/v1"

export const registerUser = (name, email, password, userAgent, ip) => async(dispatch) =>{

    try {
        dispatch({
            type: "UserRegisterRequest"
        });

        console.log("Action working")
        const {data} = await axios.post(`${serverUrl}/register`, {name, email, password, userAgent, ip}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "UserRegisterSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "UserRegisterFailure",
            payload: error.response.data.message
        })
        
    }
}

export const loginUser = (email, password, userAgent, ip) => async(dispatch) =>{

    try {
        dispatch({
            type: "UserLoginRequest"
        });

        console.log("Logging...")
        const {data} = await axios.post(`${serverUrl}/login`, {email, password, userAgent, ip}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "UserLoginSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "UserLoginFailure",
            payload: error.response.data.message
        })
        
    }
}

export const logoutUser = () => async(dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest",
        });

        const {data} = await axios.get(`${serverUrl}/logout`, {
            withCredentials: true,
        });

        dispatch({
            type: "LogoutUserSuccess",
            payload: data.message
        })
        
    } catch (error) {

        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });

        const {data} = await axios.get(`${serverUrl}/me`, {
            withCredentials: true,
        });

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }
}

export const updateUser = (name, email, mob, street, city, state, country, postal) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateUserRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/profile`, {name, email, mob, street, city, state, country, postal}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateUserSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateUserFailure",
            payload: error.response.data.message
        })
    }
}

export const updateUserPass = (newPass, confirmPass) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateUserPasswordRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/password`, {newPass, confirmPass}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateUserPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateUserPasswordFailure",
            payload: error.response.data.message
        })
    }
}

export const contactUs = (name, email, num, subj, msg) => async(dispatch) => {
    try {
        dispatch({
            type: "ContactRequest",
        });

        const {data} = await axios.post(`${serverUrl}/contact`, {name, email, num, subj, msg}, {
            withCredentials: true,
        }, {
            headers: {
                'Content-Type': "application/json"
            }
        });

        dispatch({
            type: "ContactSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "ContactFailure",
            payload: error.response.data.message
        })
    }
}





