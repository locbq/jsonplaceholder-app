import { useEffect } from "react";
import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAlbumList } from "store/albums.slice";
import { getCommentList } from "store/comments.slice";
import { getPostList } from "store/posts.slice";
import { getUserList } from "store/users.slice";
import { getTodosList } from "store/todos.slice";
import { RootState, AppDispatch } from "store/store";
import { StyledCard, StyledTitle } from "./Dashboard.styles";

const { Paragraph } = Typography;

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
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
  }, [dispatch]);

  const figures = {
    user: users.userList.length,
    comment: comments.commentList.length,
    post: posts.postList.length,
    album: albums.albumList.length,
    todos: todos.todoList.length
  };

  return (
    <Row>
      <Col lg={6} md={10} sm={24} xs={24}>
        <StyledCard
          loading={users.listLoading}
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
          loading={posts.listLoading}
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
          loading={albums.listLoading}
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
