import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getUserDetail } from 'apis/user/user';

import { User } from 'types/user/User';
import { Row, Col, Typography } from 'antd';

const { Text, Paragraph } = Typography;

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

const UserDetail: FC = () => {
  const [user, setUser] = useState<User>({
    id: Number(''),
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserDetail(id);
        setUser(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [id]);

  const getAddress = (address: Address) => `${address.suite}, ${address.street} Street, ${address.city}, ${address.zipcode}`;

  return (
    <>
      <Row>
        <Col md={6}>
          <Text strong>Name:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>{user.name}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Text strong>Username:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>{user.username}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Text strong>Phone:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>{user.phone}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Text strong>Address:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>{getAddress(user.address)}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Text strong>Website:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>
            <a href={user.website}>{user.website}</a>
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Text strong>Company:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>{user.company.name}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Text strong>Company catchphrase:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>{user.company.catchPhrase}</Paragraph>
        </Col>
      </Row>
    </>
  );
};

export default UserDetail;
