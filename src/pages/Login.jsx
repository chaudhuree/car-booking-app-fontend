import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }
  const handleDemo = () => {
    const values = {
      username: "demo",
      password: "secret"
    }
    dispatch(userLogin(values));
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="login">
          <Row className="d-flex align-items-center" justify="center">
            <Col lg={8} className="text-left p-5">
              <Form
                layout="vertical"
                className="login-form p-5"
                onFinish={onFinish}
              >
                <h1>Login</h1>
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

                <button className="btn1 mt-2">Login</button>

                <hr />

                <Link to="/register">Click Here to Register</Link>
                <p onClick={handleDemo} style={{ cursor: "pointer", color: "salmon", fontSize: "12px" }}>click here to visit as a demo user</p>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Login;
