import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';

import { getPostDetail } from 'apis/post/post';
import {
  Row,
  Col,
  Typography,
  Spin,
} from 'antd';
import { Post } from 'types/post/Post';

const {
  Text,
  Paragraph,
} = Typography;

const PostDetail: FC = () => {
  const [post, setPost] = useState<Post>({
    userId: 0,
    id: 0,
    title: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await getPostDetail(id);
        setIsLoading(false);
        setPost(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPost();
  }, [id]);

  return (
    isLoading ? (
      <Row justify="center">
        <Spin />
      </Row>
    )
      : (
        <>
          <Row>
            <Col md={6}>
              <Text strong>Title:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{post.title}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Text strong>Content:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{post.body}</Paragraph>
            </Col>
          </Row>
        </>)
  );
};

export default PostDetail;
