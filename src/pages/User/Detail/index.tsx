import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  Typography,
  Spin,
} from 'antd';
import { getUser } from 'store/users.slice';
import { UserStateType } from 'types/store/store.state';

const {
  Text,
  Paragraph,
} = Typography;

type Address = {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string,
  },
};

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetail, loading } = useSelector((state: UserStateType) => state.users);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const getAddress = (address: Address) => `${address.suite}, ${address.street} Street, ${address.city}, ${address.zipcode}`;

  return (
    loading ? (
      <Row justify="center">
        <Spin />
      </Row>
    )
      : (
        <>
          <Row>
            <Col md={6}>
              <Text strong>Name:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{userDetail.name}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text strong>Username:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{userDetail.username}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text strong>Phone:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{userDetail.phone}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text strong>Address:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{getAddress(userDetail.address)}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text strong>Website:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>
                <a href={userDetail.website}>{userDetail.website}</a>
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text strong>Company:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{userDetail.company.name}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text strong>Company catchphrase:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{userDetail.company.catchPhrase}</Paragraph>
            </Col>
          </Row>
        </>)
  );
};

export default UserDetail;
