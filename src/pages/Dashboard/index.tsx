import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import {
  Space,
  Typography,
} from 'antd';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { getAlbumList } from 'apis/album/album';
import { getCommentList } from 'apis/comment/comment';
import { getPostList } from 'apis/post/post';
import { getUserList } from 'apis/user/user';
import {
  StyledCard,
  StyledTitle,
} from './styles';

const {
  Paragraph,
} = Typography;

const Dashboard: FC = () => {
  const [figures, setFigures] = useState({
    user: 0,
    post: 0,
    comment: 0,
    album: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const albumRes = await getAlbumList();
        const userRes = await getUserList();
        const postRes = await getPostList();
        const commentRes = await getCommentList();
        setFigures({
          user: userRes.data.length,
          comment: commentRes.data.length,
          post: postRes.data.length,
          album: albumRes.data.length,
        });
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <Space>
        <StyledCard
          loading={isLoading}
          title="User"
          extra={<Link to="/user">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle
            level={2}
            type="success"
          >
            {figures.user}
          </StyledTitle>
        </StyledCard>

        <StyledCard
          loading={isLoading}
          title="Post"
          extra={<Link to="/post">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle
            level={2}
            type="danger"
          >
            {figures.post}
          </StyledTitle>
        </StyledCard>

        <StyledCard
          loading={isLoading}
          title="Comment"
          extra={<Link to="/comment">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle
            level={2}
            type="warning"
          >
            {figures.comment}
          </StyledTitle>
        </StyledCard>

        <StyledCard
          loading={isLoading}
          title="Album"
          extra={<Link to="/album">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle level={2}>
            {figures.album}
          </StyledTitle>
        </StyledCard>
      </Space>
    </>
  );
};

export default withRouter(Dashboard);
