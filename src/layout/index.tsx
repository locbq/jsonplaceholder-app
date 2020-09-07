import React, { FC } from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  CommentOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';

import Dashboard from 'pages/Dashboard';
import User from 'pages/User';
import UserDetail from 'pages/User/Detail';
import Post from 'pages/Post/List';
import Comment from 'pages/Comment';
import Album from 'pages/Album';
import {
  StyledDivLogo,
} from './styles';

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;

const AppLayout: FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible>
      <StyledDivLogo className="logo">
        JSONPLACEHOLDER
      </StyledDivLogo>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <Menu.Item
          key="/dashboard"
          icon={<DashboardOutlined />}
        >
          <Link to="/dashboard">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/user"
          icon={<UserOutlined />}
        >
          <Link to="/user">
            User
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/post"
          icon={<FileOutlined />}
        >
          <Link to="/post">
            Post
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/comment"
          icon={<CommentOutlined />}
        >
          <Link to="/comment">
            Comment
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/album"
          icon={<PictureOutlined />}
        >
          <Link to="/album">
            Album
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{ padding: 0 }}
      />
      <Content style={{ margin: '0 16px' }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Switch>
            <Route
              exact
              path="/"
              component={Dashboard}
            />
            <Route
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              exact
              path="/user"
              component={User}
            />
            <Route
              path="/user/detail/:id"
              component={UserDetail}
            />
            <Route
              path="/post"
              component={Post}
            />
            <Route
              path="/comment"
              component={Comment}
            />
            <Route
              path="/album"
              component={Album}
            />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
);

export default AppLayout;
