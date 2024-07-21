import { logoutUser } from '@/redux/Actions/userActions'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const index = () => {

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const dispatch = useDispatch()
  const {message, loading, error, isUserAuthenticated} = useSelector(state => state.userAuth)

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser())
  }

  useEffect(() => {
    if (error) {
      toast.error(error, toastOptions)
      dispatch({type: "clearError"})
    }
    if (message) {
      toast.success(message, toastOptions)
      dispatch({type: "clearMessage"})
    }
  }, [error, message, dispatch, toastOptions])

  return (
    <div>
      App
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
      <button onClick={handleClick}>LogOut</button>
    </div>
  )
}

export default index
