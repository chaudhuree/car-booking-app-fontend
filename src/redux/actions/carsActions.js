import { message } from 'antd';
import axios from 'axios';

export const getAllCars = () => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/getAllCars`)
        dispatch({ type: 'GET_ALL_CARS', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }

}

export const addCar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })
    const { name, image, capacity, fuelType, rentPerHour } = reqObj
    try {
        await axios.post(`${import.meta.env.VITE_BASEURL}/addcar`, {
            name,
            image,
            capacity: Number(capacity),
            fuelType,
            rentPerHour: Number(rentPerHour)
        })

        dispatch({ type: 'LOADING', payload: false })
        message.success('New car added successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}

export const editCar = (reqObj) => async dispatch => {
    const { name, image, capacity, fuelType, rentPerHour, id } = reqObj
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.put(`${import.meta.env.VITE_BASEURL}/editcar`, {
            id,
            name,
            image,
            capacity: Number(capacity),
            fuelType,
            rentPerHour: Number(rentPerHour)
        })

        dispatch({ type: 'LOADING', payload: false })
        message.success('Car details updated successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}

export const deleteCar = (props) => async dispatch => {
    console.log(props)
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post(`${import.meta.env.VITE_BASEURL}/deletecar`, { id: props })

        dispatch({ type: 'LOADING', payload: false })
        message.success('Car deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}


export const giveHeart = (carId) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.put(`${import.meta.env.VITE_BASEURL}/giveheart`, {
            carId
        })

        dispatch({ type: 'LOADING', payload: false })
        message.success('You liked this car')
        // setTimeout(() => {
        //     window.location.href = '/admin'
        // }, 500);
        dispatch(getAllCars())
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}