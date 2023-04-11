import { Col, DatePicker, Row } from "antd";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DefaultLayout from '../components/DefaultLayout';
import Spinner from "../components/Spinner";
import { getAllCars } from '../redux/actions/carsActions';



function Home() {
  const { cars } = useSelector((state) => state.carsReducer)
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([])
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  useEffect(() => {
    dispatch(getAllCars())
  }, [])

  useEffect(() => {
    setTotalCars(cars)
  }, [cars])

  function setFilter(values) {
    const from = moment(values[0]).format("MMM DD yyyy HH:mm")
    const to = moment(values[1]).format("MMM DD yyyy HH:mm")
    const filteredCars = cars.filter((car) => {
      const carBookings = car.bookedTimeSlots.filter((booking) => {
        return (moment(booking.from).isBetween(from, to) || moment(booking.to).isBetween(from, to))
      })
      if (carBookings.length == 0) {
        return car
      }
    })
    setTotalCars(filteredCars)
  }
  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-center">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>
      {loading == true ? <Spinner /> :

        <Row justify="center" gutter={16}>
          {totalCars.map((car) => {
            return (
              <Col lg={5} sm={24} xs={24} key={car.id}>
                <div className="car p-2 bs1">
                  <img src={car.image} className="carimg" />
                  <span className="heart"><FaHeart /></span>

                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div className="text-left pl-2">
                      <p className="fw-bold">{car.name}</p>
                      <p> Rent Per Hour {car.rentPerHour} /-</p>
                    </div>

                    <div>
                      <button className="btn1 mr-2">
                        <Link to={`/booking/${car.id}`}>Book</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      }
    </DefaultLayout>
  )
}

export default Home