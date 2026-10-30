import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCommentList } from "store/comments.slice";
import { getPostDetail } from "store/posts.slice";
import { Row, Col, Typography, Spin, Alert } from "antd";
import { RootState, AppDispatch } from "store/store";
import { CommentCard } from "./components";

const { Text, Paragraph } = Typography;

export default function PostDetail() {
  const { id } = useParams<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { postDetail, detailLoading: loading, detailError } = useSelector(
    (state: RootState) => state.posts
  );
  const { commentList } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    if (id) {
      dispatch(getPostDetail(Number(id)));
      dispatch(getCommentList(Number(id)));
    }
  }, [dispatch, id]);

  return loading ? (
    <Row justify="center">
      <Spin />
    </Row>
  ) : detailError ? (
    <Alert type="error" showIcon message="Unable to load post details." />
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
