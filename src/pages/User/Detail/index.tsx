import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getUserDetail } from 'apis/user/user';

import { User } from 'types/user/User';
import { Row, Col, Typography } from 'antd';

const { Text, Paragraph } = Typography;

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

  return (
    <>
      <Row justify="center">
        <Col md={18}>
          <Row>
            <Col md={4}>
              <Text strong>Name:</Text>
            </Col>
            <Col md={20}>
              <Paragraph>{user.name}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Text strong>Username:</Text>
            </Col>
            <Col md={20}>
              <Paragraph>{user.username}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Text strong>Phone:</Text>
            </Col>
            <Col md={20}>
              <Paragraph>{user.phone}</Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UserDetail;
