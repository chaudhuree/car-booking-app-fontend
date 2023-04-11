import { message } from 'antd';
import axios from "axios";

export const userLogin = (reqObj) => async dispatch => {
    const { username, password } = reqObj
    dispatch({ type: 'LOADING', payload: true })

    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}/login`, {
            username,
            password
        })
        localStorage.setItem('user', JSON.stringify(data.user))
        message.success('Login success')
        dispatch({ type: 'LOADING', payload: false })
        setTimeout(() => {
            window.location.href = '/'

        }, 500);
    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const userRegister = (reqObj) => async dispatch => {
    const { username, password, cpassword } = reqObj
    dispatch({ type: 'LOADING', payload: true })

    try {
        if (password !== cpassword) {
            message.error('Password and confirm password should be same')
            dispatch({ type: 'LOADING', payload: false })
            return
        }
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/register`, {
            username,
            password
        })
        message.success('Registration successfull')
        setTimeout(() => {
            window.location.href = '/login'

        }, 500);

        dispatch({ type: 'LOADING', payload: false })

    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}