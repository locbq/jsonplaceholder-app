import { configureStore } from "@reduxjs/toolkit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { request } from "apis/service";
import albums, { getAlbumList, getAlbumDetail } from "store/albums.slice";
import comments, { getCommentList } from "store/comments.slice";
import photos, { getPhotoByAlbum } from "store/photos.slice";
import posts, { getPostList, getPostDetail } from "store/posts.slice";
import todos, { getTodosList } from "store/todos.slice";
import users, { getUserList, getUserDetail } from "store/users.slice";

const cases = [
  ["albums", albums, getAlbumList, undefined, "/albums", undefined, "albumList", [{ id: 1 }]],
  ["album detail", albums, getAlbumDetail, 2, "/albums/2", undefined, "albumDetail", { id: 2 }],
  ["comments", comments, getCommentList, 2, "/comments", { params: { postId: 2 } }, "commentList", [{ id: 1 }]],
  ["photos", photos, getPhotoByAlbum, 2, "/photos", { params: { albumId: 2 } }, "photoList", [{ id: 1 }]],
  ["posts", posts, getPostList, 2, "/posts", { params: { userId: 2 } }, "postList", [{ id: 1 }]],
  ["post detail", posts, getPostDetail, 2, "/posts/2", undefined, "postDetail", { id: 2 }],
  ["todos", todos, getTodosList, { userId: 2, completed: false }, "/todos", { params: { userId: 2, completed: false } }, "todoList", [{ id: 1 }]],
  ["users", users, getUserList, undefined, "/users", undefined, "userList", [{ id: 1 }]],
  ["user detail", users, getUserDetail, 2, "/users/2", undefined, "userDetail", { id: 2 }]
] as const;

afterEach(() => vi.restoreAllMocks());
describe.each(cases)("%s", (_name, reducer, thunk, argument, url, options, field, data) => {
  it("requests data and updates state on success", async () => {
    const get = vi.spyOn(request, "get").mockResolvedValue({ data });
    const store = configureStore({ reducer: reducer as any });
    const result = store.dispatch((thunk as any)(argument));
    expect((store.getState() as any).loading).toBe(true);
    await result;
    if (options) expect(get).toHaveBeenCalledWith(url, options);
    else expect(get).toHaveBeenCalledWith(url);
    expect((store.getState() as any)[field]).toEqual(data);
    expect((store.getState() as any).loading).toBe(false);
  });
  it("ends loading when the request fails", async () => {
    vi.spyOn(request, "get").mockRejectedValue(new Error("network error"));
    const store = configureStore({ reducer: reducer as any });
    const action = await store.dispatch((thunk as any)(argument));
    expect(action.type).toMatch(/rejected$/);
    expect((store.getState() as any).loading).toBe(false);
  });
});
