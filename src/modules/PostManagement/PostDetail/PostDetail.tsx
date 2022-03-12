import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCommentList } from "store/comments.slice";
import { getPostDetail } from "store/posts.slice";
import { Row, Col, Typography, Spin } from "antd";
import { RootState } from "store/store";
import { CommentCard } from "./components";

const { Text, Paragraph } = Typography;

export default function PostDetail() {
  const { id } = useParams<any>();
  const dispatch = useDispatch();
  const { postDetail, loading } = useSelector(
    (state: RootState) => state.posts
  );
  const { commentList } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    if (id) {
      dispatch(getPostDetail(Number(id)));
    }
    dispatch(getCommentList(postDetail.id));
  }, [dispatch, id, postDetail.id]);

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
          <Paragraph>{postDetail.title}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Text strong>Content:</Text>
        </Col>
        <Col md={18}>
          <Paragraph>{postDetail.body}</Paragraph>
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
    </>
  );
}
