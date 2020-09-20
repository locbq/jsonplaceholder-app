import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';

import { getPostDetail } from 'apis/post/post';
import { getCommentList } from 'apis/comment/comment';
import {
  Row,
  Col,
  Typography,
  Spin,
} from 'antd';
import { Post } from 'types/post/Post';
import { Comment } from 'types/comment/Comment';
import CommentCard from './CommentCard';

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
  const [commentList, setCommentList] = useState<Comment[]>([]);
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
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await getCommentList(post.id || undefined);
        setCommentList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getComments();
  }, [post.id]);

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
              <Paragraph>{post.title}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Text strong>Content:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{post.body}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Text strong>Comments:</Text>
          </Row>
          {commentList.map((comment) => (
            <CommentCard
              key={comment.id}
              name={comment.name}
              email={comment.email}
              body={comment.body}
            />
          ))}
        </>)
  );
};

export default PostDetail;
