import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Typography, Spin, Alert } from "antd";
import { getUserDetail } from "store/users.slice";
import { RootState, AppDispatch } from "store/store";

const { Text, Paragraph } = Typography;

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export default function UserDetail() {
  const { id } = useParams<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { userDetail, detailLoading: loading, detailError } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (id) {
      dispatch(getUserDetail(Number(id)));
    }
  }, [dispatch, id]);

  const getAddress = (address: Address) =>
    `${address.suite}, ${address.street} Street, ${address.city}, ${address.zipcode}`;

  return loading ? (
    <Row justify="center">
      <Spin />
    </Row>
  ) : detailError ? (
    <Alert type="error" showIcon message="Unable to load user details." />
  ) : (
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
            <a href={/^https?:\/\//i.test(userDetail.website) ? userDetail.website : `https://${userDetail.website}`}>{userDetail.website}</a>
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
    </>
  );
}
