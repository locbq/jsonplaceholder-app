import { useState, useEffect } from "react";
import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAlbumList } from "store/albums.slice";
import { getCommentList } from "store/comments.slice";
import { getPostList } from "store/posts.slice";
import { getUserList } from "store/users.slice";
import { getTodosList } from "store/todos.slice";
import { RootState } from "store/store";
import { StyledCard, StyledTitle } from "./Dashboard.styles";

const { Paragraph } = Typography;

export default function Dashboard() {
  const [figures, setFigures] = useState({
    user: 0,
    post: 0,
    comment: 0,
    album: 0,
    todos: 0
  });
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums);
  const users = useSelector((state: RootState) => state.users);
  const posts = useSelector((state: RootState) => state.posts);
  const comments = useSelector((state: RootState) => state.comments);
  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getAlbumList());
    dispatch(getCommentList());
    dispatch(getPostList());
    dispatch(getUserList());
    dispatch(getTodosList());
    setFigures({
      user: albums.albumList.length,
      comment: users.userList.length,
      post: posts.postList.length,
      album: comments.commentList.length,
      todos: todos.todoList.length
    });
  }, [
    dispatch,
    albums.albumList.length,
    users.userList.length,
    posts.postList.length,
    comments.commentList.length,
    todos.todoList.length
  ]);

  return (
    <Row>
      <Col lg={6} md={10} sm={24} xs={24}>
        <StyledCard
          loading={users.loading}
          title="User"
          extra={<Link to="/user">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle level={2} type="success">
            {figures.user}
          </StyledTitle>
        </StyledCard>
      </Col>
      <Col lg={6} md={10} sm={24} xs={24}>
        <StyledCard
          loading={posts.loading}
          title="Post"
          extra={<Link to="/post">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle level={2} type="danger">
            {figures.post}
          </StyledTitle>
        </StyledCard>
      </Col>
      <Col lg={6} md={10} sm={24} xs={24}>
        <StyledCard
          loading={comments.loading}
          title="Comment"
          extra={<Link to="/comment">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle level={2} type="warning">
            {figures.comment}
          </StyledTitle>
        </StyledCard>
      </Col>
      <Col lg={6} md={10} sm={24} xs={24}>
        <StyledCard
          loading={albums.loading}
          title="Album"
          extra={<Link to="/album">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle level={2}>{figures.album}</StyledTitle>
        </StyledCard>
      </Col>
      <Col lg={6} md={10} sm={24} xs={24}>
        <StyledCard
          loading={todos.loading}
          title="Todos"
          extra={<Link to="/todos">More</Link>}
        >
          <Paragraph>Total</Paragraph>
          <StyledTitle level={2} type="secondary">
            {figures.todos}
          </StyledTitle>
        </StyledCard>
      </Col>
    </Row>
  );
}
