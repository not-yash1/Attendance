import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {}

const UserRegisterRequest = createAction('UserRegisterRequest');
const UserRegisterSuccess = createAction('UserRegisterSuccess');
const UserRegisterFailure = createAction('UserRegisterFailure');

const UserLoginRequest = createAction('UserLoginRequest');
const UserLoginSuccess = createAction('UserLoginSuccess');
const UserLoginFailure = createAction('UserLoginFailure');

const LoadUserRequest = createAction('LoadUserRequest');
const LoadUserSuccess = createAction('LoadUserSuccess');
const LoadUserFailure = createAction('LoadUserFailure');

const LogoutUserRequest = createAction('LogoutUserRequest');
const LogoutUserSuccess = createAction('LogoutUserSuccess');
const LogoutUserFailure = createAction('LogoutUserFailure');

const UpdateUserRequest = createAction('UpdateUserRequest');
const UpdateUserSuccess = createAction('UpdateUserSuccess');
const UpdateUserFailure = createAction('UpdateUserFailure');

const UpdateUserPasswordRequest = createAction('UpdateUserPasswordRequest');
const UpdateUserPasswordSuccess = createAction('UpdateUserPasswordSuccess');
const UpdateUserPasswordFailure = createAction('UpdateUserPasswordFailure');

const ContactRequest = createAction('ContactRequest');
const ContactSuccess = createAction('ContactSuccess');
const ContactFailure = createAction('ContactFailure');

const clearErrors = createAction('clearErrors');
const clearMessage = createAction('clearMessage');

export const UserRegisterReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UserRegisterRequest, (state) => {
        state.loading = true;
    })
    .addCase(UserRegisterSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isUserAuthenticated = true;
        // state.user = action.payload
    })
    .addCase(UserRegisterFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const UserAuthReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UserLoginRequest, (state) => {
        state.loading = true;
    })
    .addCase(UserLoginSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isUserAuthenticated = true;
    })
    .addCase(UserLoginFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUserAuthenticated = false;
    })
    .addCase(LogoutUserRequest, (state) => {
        state.loading = true;
    })
    .addCase(LogoutUserSuccess, (state, action) => {
        state.loading = false;
        state.user = null;  
        state.isUserAuthenticated = false;
        state.message = action.payload
    })
    .addCase(LogoutUserFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUserAuthenticated = true;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const LoadUserReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(LoadUserRequest, (state) => {
        state.loading = true;
    })
    .addCase(LoadUserSuccess, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isUserAuthenticated = true;
    })
    .addCase(LoadUserFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUserAuthenticated = false;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updateUserReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdateUserRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateUserSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateUserFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(UpdateUserPasswordRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateUserPasswordSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateUserPasswordFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const contactReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(ContactRequest, (state) => {
        state.loading = true;
    })
    .addCase(ContactSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(ContactFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

