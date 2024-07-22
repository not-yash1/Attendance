import { configureStore } from '@reduxjs/toolkit'
import { contactReducer, LoadUserReducer, updateUserReducer, UserAuthReducer, UserRegisterReducer } from './Reducer/userReducer';


const store = configureStore({
    reducer: {
        registerUser: UserRegisterReducer,
        userAuth: UserAuthReducer,
        user: LoadUserReducer,
        updateUser: updateUserReducer,
        contact: contactReducer,
    }
});

export default store;