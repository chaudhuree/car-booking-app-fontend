import { Button, Col, Dropdown, Menu, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user);
  const menu = (
    <Menu>
      <Menu.Item key={Date.now() * Math.random(6)}>
        <Link

          to="/"
        >
          Home
        </Link>
      </Menu.Item>

      <Menu.Item key={uuidv4()}>
        <Link

          to="/userbookings"
        >
          Bookings
        </Link>
      </Menu.Item>

      {user?.role === 2 && (
        <Menu.Item key={uuidv4()}>
          <Link

            to="/admin"
          >
            Admin
          </Link>
        </Menu.Item >
      )}
      <Menu.Item key={uuidv4()} onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login'
      }}>
        <Link style={{ color: 'orangered' }}>Logout</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify='center'>
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <Link to='/'><h1>OnTheGoCars</h1></Link>

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{user.username}</Button>
              </Dropdown>

            </div>
          </Col>
        </Row>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
