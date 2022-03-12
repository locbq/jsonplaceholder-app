import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Spin, Typography } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { getAlbumDetail } from "store/albums.slice";
import { getUserDetail } from "store/users.slice";
import { getPhotoByAlbum } from "store/photos.slice";
import { RootState } from "store/store";
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
  const dispatch = useDispatch();
  const { albumDetail, loading } = useSelector(
    (state: RootState) => state.albums
  );
  const { photoList } = useSelector((state: RootState) => state.photos);
  const { userDetail } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(getAlbumDetail(Number(id)));
    }
    dispatch(getPhotoByAlbum(albumDetail.id));
    if (albumDetail.userId !== 0) dispatch(getUserDetail(albumDetail.userId));
  }, [dispatch, id, albumDetail.userId, albumDetail.id]);

  return loading ? (
    <Row justify="center">
      <Spin />
    </Row>
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
          <Link to={`/user/detail/${userDetail.id}`}>{userDetail.name}</Link>
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
