import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {
  Col,
  Row,
  Spin,
  Typography,
} from 'antd';
import {
  RightCircleOutlined,
  LeftCircleOutlined,
} from '@ant-design/icons';

import { getAlbumDetail } from 'apis/album/album';
import { getPhotoByAlbum } from 'apis/photo/photo';
import { getUserDetail } from 'apis/user/user';
import { Photo } from 'types/photo/Photo';
import { Album } from 'types/album/Album';
import { User } from 'types/user/User';
import {
  StyledCarousel,
  StyledButtonNext,
  StyledButtonPrev,
} from './styles';

const {
  Text,
  Paragraph,
} = Typography;

const settings = {
  dots: false,
  draggable: true,
  arrows: true,
  nextArrow: <StyledButtonNext
    type="default"
    icon={<RightCircleOutlined />}
  />,
  prevArrow: <StyledButtonPrev
    type="default"
    icon={<LeftCircleOutlined />}
  />,
};

const AlbumDetail: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<Album>({
    userId: 0,
    id: 0,
    title: '',
  });
  const [photoList, setPhotoList] = useState<Photo[]>([]);
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
    const getData = async () => {
      try {
        const albumData = await getAlbumDetail(id);
        const photos = await getPhotoByAlbum(id);
        if (album.userId !== 0) {
          const userData = await getUserDetail(album.userId);
          setUser(userData.data);
        }
        setAlbum(albumData.data);
        setPhotoList(photos.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [id, album.userId]);

  return (
    isLoading ? (
      <Row justify="center">
        <Spin />
      </Row>
    )
      : (
        <>
          <Row>
            <Col md={4}>
              <Text strong>Title:</Text>
            </Col>
            <Col md={18}>
              <Text>{album.title}</Text>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Text strong>By:</Text>
            </Col>
            <Col md={18}>
              <Link to={`/user/detail/${user.id}`}>
                {user.name}
              </Link>
            </Col>
          </Row>
          <Row>
            <Paragraph strong>Photos:</Paragraph>
          </Row>

          <StyledCarousel {...settings}>
            {photoList.map((photo) => (
              <div key={photo.id}>
                <img
                  src={photo.url}
                  alt="thumbnail"
                />
              </div>
            ))}
          </StyledCarousel>
        </>
      )
  );
};

export default AlbumDetail;
