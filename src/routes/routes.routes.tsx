import React from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  CommentOutlined,
  PictureOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';

import Dashboard from 'pages/Dashboard';
import User from 'pages/User';
import UserDetail from 'pages/User/Detail';
import Post from 'pages/Post/List';
import PostDetail from 'pages/Post/Detail';
import Comment from 'pages/Comment/List';
import Album from 'pages/Album/List';
import AlbumDetail from 'pages/Album/Detail';
import Todos from 'pages/Todos';

import { RouteModel } from 'types/route/Route';
import { MenuItem } from 'types/route/MenuItem';

import {
  PATH_DASHBOARD,
  PATH_ALBUM,
  PATH_ALBUM_DETAIL,
  PATH_COMMENT,
  PATH_POST,
  PATH_POST_DETAIL,
  PATH_TODOS,
  PATH_USER,
  PATH_USER_DETAIL,
} from './routes.paths';

export const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    to: PATH_DASHBOARD,
    icon: <DashboardOutlined />,
  },
  {
    name: 'User',
    to: PATH_USER,
    icon: <UserOutlined />,
  },
  {
    name: 'Post',
    to: PATH_POST,
    icon: <FileOutlined />,
  },
  {
    name: 'Comment',
    to: PATH_COMMENT,
    icon: <CommentOutlined />,
  },
  {
    name: 'Album',
    to: PATH_ALBUM,
    icon: <PictureOutlined />,
  },
  {
    name: 'Todos',
    to: PATH_TODOS,
    icon: <CheckSquareOutlined />,
  },
];

export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: PATH_DASHBOARD,
    component: Dashboard,
  },
  {
    exact: true,
    path: PATH_ALBUM,
    component: Album,
  },
  {
    exact: true,
    path: PATH_ALBUM_DETAIL,
    component: AlbumDetail,
  },
  {
    exact: true,
    path: PATH_COMMENT,
    component: Comment,
  },
  {
    exact: true,
    path: PATH_POST,
    component: Post,
  },
  {
    exact: true,
    path: PATH_POST_DETAIL,
    component: PostDetail,
  },
  {
    exact: true,
    path: PATH_USER,
    component: User,
  },
  {
    exact: true,
    path: PATH_USER_DETAIL,
    component: UserDetail,
  },
  {
    exact: true,
    path: PATH_TODOS,
    component: Todos,
  },
];
