import { Checkbox, Col, DatePicker, Divider, Modal, Row } from "antd";
import { FaTimes } from "react-icons/fa";
// FaRegHeart
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { bookCar } from "../redux/actions/bookingActions";
import { getAllCars } from "../redux/actions/carsActions";
const { RangePicker } = DatePicker;
function BookingCar() {
  const [user, setUser] = useState("");
  const [car, setcar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    if (cars?.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars?.find((o) => o?.id == id));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  // selected time slot
  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
    // console.log(moment(values[0]).format("MMM DD yyyy HH:mm"));
  }
  function bookNow() {
    const reqObj = {
      carId: car.id,
      userId: JSON.parse(localStorage.getItem("user")).id,
      totalHours,
      totalAmount,
      transactionId: "a21g",
      driverRequired: driver,
      from,
      to
    };
    dispatch(bookCar(reqObj));
  }
  console.log(car);
  return (
    <DefaultLayout>
      {loading ? (
        <Spinner />
      ) : (<Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={car.image}
            className="carimg2 bs1 w-100"
          />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed className="#df7700">
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            style={{ display: user.role === 0 && "none" }}
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
            disabled={user?.role === 0}
          >
            Booked Time Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                style={{ color: "yellow" }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3 style={{ color: "red" }}>Total Amount : {Number(totalAmount)}</h3>
              {user?.role === 0 && (<p style={{ color: "palegreen", fontSize: '12px' }}>Demo User Can't Book Car</p>)}

              <button disabled={user?.role === 0} className="btn1" onClick={bookNow}>
                {`${user?.role === 0 ? "Disabled" : "Booke Now"}`}
              </button>


            </div>
          )}
        </Col>





        {car?.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="  time slots"
          >
            <div className="p-2">
              {car?.bookedTimeSlots?.map((slot) => {

                return (
                  <div className="d-flex justify-content-between" key={slot.id}>
                    <button className="btn2 mt-2">
                      {slot.from} - {slot.to}
                    </button>
                    <button className="btn2 mt-2 fw-light">
                      <FaTimes />
                    </button>
                  </div>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}


      </Row>
      )}
    </DefaultLayout>
  );
}

export default BookingCar;
