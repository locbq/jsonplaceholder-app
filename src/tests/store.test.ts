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
  const loadingField = ["albums", "posts", "users"].includes(_name as string) ? "listLoading" : ["album detail", "post detail", "user detail"].includes(_name as string) ? "detailLoading" : "loading";
  it("requests data and updates state on success", async () => {
    const get = vi.spyOn(request, "get").mockResolvedValue({ data });
    const store = configureStore({ reducer: reducer as any });
    const result = store.dispatch((thunk as any)(argument));
    expect((store.getState() as any)[loadingField]).toBe(true);
    await result;
    if (options) expect(get).toHaveBeenCalledWith(url, options);
    else expect(get).toHaveBeenCalledWith(url);
    expect((store.getState() as any)[field]).toEqual(data);
    expect((store.getState() as any)[loadingField]).toBe(false);
  });
  it("ignores a slower, older response", async () => {
    let resolveOlder!: (value: { data: unknown }) => void;
    const older = new Promise<{ data: unknown }>((resolve) => { resolveOlder = resolve; });
    vi.spyOn(request, "get").mockReturnValueOnce(older as any).mockResolvedValueOnce({ data });
    const store = configureStore({ reducer: reducer as any });
    const first = store.dispatch((thunk as any)(argument));
    const second = store.dispatch((thunk as any)(argument));
    await second;
    resolveOlder({ data: Array.isArray(data) ? [] : { id: 999 } });
    await first;
    expect((store.getState() as any)[field]).toEqual(data);
    expect((store.getState() as any)[loadingField]).toBe(false);
  });
  it("ends loading when the request fails", async () => {
    vi.spyOn(request, "get").mockRejectedValue(new Error("network error"));
    const store = configureStore({ reducer: reducer as any });
    const action = await store.dispatch((thunk as any)(argument));
    expect(action.type).toMatch(/rejected$/);
    expect((store.getState() as any)[loadingField]).toBe(false);
  });
});

describe.each([
  ["albums", albums, getAlbumList, getAlbumDetail],
  ["posts", posts, getPostList, getPostDetail],
  ["users", users, getUserList, getUserDetail]
])("%s list and detail loading", (_name, reducer, listThunk, detailThunk) => {
  it("keeps the detail loading while a concurrent list request finishes", async () => {
    let resolveDetail!: (value: { data: unknown }) => void;
    const detailResponse = new Promise<{ data: unknown }>((resolve) => { resolveDetail = resolve; });
    vi.spyOn(request, "get").mockResolvedValueOnce({ data: [] }).mockReturnValueOnce(detailResponse as any);
    const store = configureStore({ reducer: reducer as any });
    const list = store.dispatch((listThunk as any)());
    const detail = store.dispatch((detailThunk as any)(1));
    await list;
    expect((store.getState() as any).listLoading).toBe(false);
    expect((store.getState() as any).detailLoading).toBe(true);
    resolveDetail({ data: { id: 1 } });
    await detail;
    expect((store.getState() as any).detailLoading).toBe(false);
  });
});
