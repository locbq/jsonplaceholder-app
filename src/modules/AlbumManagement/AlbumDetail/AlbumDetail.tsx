import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Spin, Typography, Alert } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { getAlbumDetail } from "store/albums.slice";
import { getUserDetail } from "store/users.slice";
import { getPhotoByAlbum } from "store/photos.slice";
import { RootState, AppDispatch } from "store/store";
import {
  StyledCarousel,
  StyledButtonNext,
  StyledButtonPrev
} from "./AlbumDetail.styles";

const { Text, Paragraph } = Typography;

const settings = {
  dots: false,
  draggable: true,
  arrows: true,
  nextArrow: <StyledButtonNext type="default" icon={<RightCircleOutlined />} />,
  prevArrow: <StyledButtonPrev type="default" icon={<LeftCircleOutlined />} />
};

export default function AlbumDetail() {
  const { id } = useParams<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { albumDetail, detailLoading: loading, detailError } = useSelector(
    (state: RootState) => state.albums
  );
  const { photoList } = useSelector((state: RootState) => state.photos);
  const { userDetail } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(getAlbumDetail(Number(id)));
      dispatch(getPhotoByAlbum(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!detailError && albumDetail.id === Number(id) && albumDetail.userId !== 0) dispatch(getUserDetail(albumDetail.userId));
  }, [dispatch, id, detailError, albumDetail.id, albumDetail.userId]);

  return loading ? (
    <Row justify="center">
      <Spin />
    </Row>
  ) : detailError ? (
    <Alert type="error" showIcon message="Unable to load album details." />
  ) : (
    <>
      <Row>
        <Col md={4}>
          <Text strong>Title:</Text>
        </Col>
        <Col md={18}>
          <Text>{albumDetail.title}</Text>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Text strong>By:</Text>
        </Col>
        <Col md={18}>
          {userDetail.id === albumDetail.userId && <Link to={`/user/detail/${userDetail.id}`}>{userDetail.name}</Link>}
        </Col>
      </Row>
      <Row>
        <Paragraph strong>Photos:</Paragraph>
      </Row>

      <StyledCarousel {...settings}>
        {photoList.map((photo) => (
          <div key={photo.id}>
            <img src={photo.url} alt="thumbnail" />
          </div>
        ))}
      </StyledCarousel>
    </>
  );
}
