import axios from "axios";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SERVICE_API } from "apis/service";
import { getAlbumDetail, getAlbumList } from "apis/album/album";
import { getCommentList } from "apis/comment/comment";
import { getPhotoByAlbum } from "apis/photo/photo";
import { getPostDetail, getPostList } from "apis/post/post";
import { getTodosList } from "apis/todos/todos";
import { getUserDetail, getUserList } from "apis/user/user";

afterEach(() => vi.restoreAllMocks());
describe("API helpers", () => {
  it.each([
    [() => getAlbumList(), "/albums", undefined],
    [() => getAlbumDetail(4), "/albums/4", undefined],
    [() => getCommentList(4), "/comments", { params: { postId: 4 } }],
    [() => getPhotoByAlbum(4), "/photos", { params: { albumId: 4 } }],
    [() => getPostList(4), "/posts", { params: { userId: 4 } }],
    [() => getPostDetail(4), "/posts/4", undefined],
    [() => getTodosList({ completed: false }), "/todos", { params: { completed: false } }],
    [() => getUserList(), "/users", undefined],
    [() => getUserDetail(4), "/users/4", undefined]
  ])("requests %s", async (call, path, options) => {
    const get = vi.spyOn(axios, "get").mockResolvedValue({ data: "result" });
    await expect(call()).resolves.toEqual({ data: "result" });
    if (options) expect(get).toHaveBeenCalledWith(SERVICE_API + path, options);
    else expect(get).toHaveBeenCalledWith(SERVICE_API + path);
  });
});
