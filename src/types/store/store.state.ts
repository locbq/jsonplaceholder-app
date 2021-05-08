import { Album } from 'types/album/Album';
import { User } from 'types/user/User';
import { Post } from 'types/post/Post';
import { Comment } from 'types/comment/Comment';
import { Todo } from 'types/todos/Todo';
import { Photo } from 'types/photo/Photo';

export type AlbumStateType = {
  albums: {
    albumList: Album[];
    albumDetail: Album;
    loading: boolean;
  }
};
export type UserStateType = {
  users: {
    userList: User[];
    userDetail: User;
    loading: boolean;
  }
};
export type PostStateType = {
  posts: {
    postList: Post[];
    postDetail: Post;
    loading: boolean;
  }
};
export type CommentStateType = {
  comments: {
    commentList: Comment[];
    loading: boolean;
  }
};
export type TodoStateType = {
  todos: {
    todoList: Todo[];
    loading: boolean;
  }
};
export type PhotoStateType = {
  photos: {
    photoList: Photo[]
  }
};
