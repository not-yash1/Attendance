import { configureStore } from '@reduxjs/toolkit'
import { contactReducer, updateUserReducer, UserAuthReducer } from './Reducer/userReducer';


const store = configureStore({
    reducer: {
        userAuth: UserAuthReducer,
        updateUser: updateUserReducer,
        contact: contactReducer,
    }
});

export default store;