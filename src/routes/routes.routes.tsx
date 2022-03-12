import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  CommentOutlined,
  PictureOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";

import {
  DashboardPage,
  UserListPage,
  UserDetailPage,
  AlbumListPage,
  AlbumDetailPage,
  CommentListPage,
  PostDetailPage,
  PostListPage,
  TodoListPage
} from "pages";

import { RouteModel } from "types/route/Route";
import { MenuItem } from "types/route/MenuItem";

import {
  PATH_DASHBOARD,
  PATH_ALBUM,
  PATH_ALBUM_DETAIL,
  PATH_COMMENT,
  PATH_POST,
  PATH_POST_DETAIL,
  PATH_TODOS,
  PATH_USER,
  PATH_USER_DETAIL
} from "./routes.paths";

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    to: PATH_DASHBOARD,
    icon: <DashboardOutlined />
  },
  {
    name: "User",
    to: PATH_USER,
    icon: <UserOutlined />
  },
  {
    name: "Post",
    to: PATH_POST,
    icon: <FileOutlined />
  },
  {
    name: "Comment",
    to: PATH_COMMENT,
    icon: <CommentOutlined />
  },
  {
    name: "Album",
    to: PATH_ALBUM,
    icon: <PictureOutlined />
  },
  {
    name: "Todos",
    to: PATH_TODOS,
    icon: <CheckSquareOutlined />
  }
];

export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: PATH_DASHBOARD,
    component: <DashboardPage />
  },
  {
    exact: true,
    path: PATH_ALBUM,
    component: <AlbumListPage />
  },
  {
    exact: true,
    path: PATH_ALBUM_DETAIL,
    component: <AlbumDetailPage />
  },
  {
    exact: true,
    path: PATH_COMMENT,
    component: <CommentListPage />
  },
  {
    exact: true,
    path: PATH_POST,
    component: <PostListPage />
  },
  {
    exact: true,
    path: PATH_POST_DETAIL,
    component: <PostDetailPage />
  },
  {
    exact: true,
    path: PATH_USER,
    component: <UserListPage />
  },
  {
    exact: true,
    path: PATH_USER_DETAIL,
    component: <UserDetailPage />
  },
  {
    exact: true,
    path: PATH_TODOS,
    component: <TodoListPage />
  }
];
