import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { userRegister } from "../redux/actions/userActions";

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    dispatch(userRegister(values));
    console.log(values);
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="login">
          <Row className="d-flex align-items-center" justify="center">
            <Col lg={8} className="text-left p-3">
              <Form
                layout="vertical"
                className="login-form p-5"
                onFinish={onFinish}
              >
                <h1>Register</h1>
                <hr />
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                >
                  <Input type="password" />
                </Form.Item>
                <Form.Item
                  name="cpassword"
                  label="Confirm Password"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <button className="btn1 mt-2">Register</button>

                <hr />

                <Link to="/login">Click Here to Login</Link>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Register;
