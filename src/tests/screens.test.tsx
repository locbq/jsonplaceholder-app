import { configureStore } from "@reduxjs/toolkit";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { request } from "apis/service";
import albums from "store/albums.slice";
import comments from "store/comments.slice";
import photos from "store/photos.slice";
import posts from "store/posts.slice";
import todos from "store/todos.slice";
import users from "store/users.slice";

const user = { id: 1, name: "Alice Example", username: "alice", email: "alice@example.com", phone: "123", website: "https://example.com", address: { suite: "Apt 1", street: "Main", city: "Town", zipcode: "12345", geo: { lat: "0", lng: "0" } }, company: { name: "Example Co", catchPhrase: "Hello", bs: "" } };
const post = { id: 1, userId: 1, title: "Example post", body: "Post body" };
const comment = { id: 1, postId: 1, name: "Example comment", email: "comment@example.com", body: "Comment body" };
const album = { id: 1, userId: 1, title: "Example album" };
const todo = { id: 1, userId: 1, title: "Example task", completed: true };

beforeEach(() => {
  vi.spyOn(request, "get").mockImplementation(async (url) => {
    const data: Record<string, unknown> = { "/users": [user], "/users/1": user, "/posts": [post], "/posts/1": post, "/comments": [comment], "/albums": [album], "/albums/1": album, "/photos": [{ id: 1, albumId: 1, url: "https://example.com/photo.jpg", title: "Photo" }], "/todos": [todo] };
    return { data: data[url] };
  });
});
afterEach(() => vi.restoreAllMocks());
function renderRoute(path: string) {
  const store = configureStore({ reducer: { albums, comments, photos, posts, todos, users } });
  return render(<Provider store={store}><MemoryRouter initialEntries={[path]}><App /></MemoryRouter></Provider>);
}

describe("application screens", () => {
  it("redirects to the dashboard and displays the correct totals", async () => {
    vi.mocked(request.get).mockImplementation(async (url) => {
      const data: Record<string, unknown> = { "/users": [user], "/posts": [post, post], "/comments": [comment, comment, comment], "/albums": [album, album, album, album], "/todos": [todo, todo, todo, todo, todo] };
      return { data: data[url] };
    });
    renderRoute("/");
    await waitFor(() => expect(request.get).toHaveBeenCalledWith("/todos", expect.anything()));
    await screen.findAllByText("Total");
    for (const [title, count] of [["User", "1"], ["Post", "2"], ["Comment", "3"], ["Album", "4"], ["Todos", "5"]]) {
      const card = screen.getAllByText(title).find((element) => element.closest(".ant-card"))!.closest(".ant-card")!;
      expect(within(card as HTMLElement).getByText(count)).toBeInTheDocument();
    }
  });
  it.each([
    ["/user", "Alice Example"], ["/user/detail/1", "Example Co"],
    ["/post", "Example post"], ["/post/detail/1", "Comment body"],
    ["/comment", "Example comment"], ["/album", "Example album"],
    ["/album/detail/1", "Example album"], ["/todos", "Example task"]
  ])("renders %s", async (path, content) => {
    renderRoute(path);
    expect(await screen.findByText(content)).toBeInTheDocument();
  });
  it.each([
    ["/user/detail/2", "user"],
    ["/post/detail/2", "post"],
    ["/album/detail/2", "album"]
  ])("shows an error when %s cannot be loaded", async (path, name) => {
    vi.mocked(request.get).mockRejectedValue(new Error("network error"));
    renderRoute(path);
    expect(await screen.findByRole("alert")).toHaveTextContent(`Unable to load ${name} details.`);
  });
  it("turns a user website without a scheme into an external link", async () => {
    vi.mocked(request.get).mockResolvedValue({ data: { ...user, website: "example.com" } });
    renderRoute("/user/detail/1");
    expect(await screen.findByRole("link", { name: "example.com" })).toHaveAttribute("href", "https://example.com");
  });
  it("opens and closes the comment detail", async () => {
    renderRoute("/comment");
    await screen.findByText("Example comment");
    await userEvent.click(screen.getAllByRole("button").find(button => button.querySelector('[data-icon="eye"]'))!);
    expect(await screen.findByText("comment@example.com")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.getByRole("dialog")).toHaveClass("ant-zoom-leave");
  });
  it("applies and clears the post user filter", async () => {
    renderRoute("/post");
    await screen.findByText("Example post");
    await userEvent.click(screen.getByRole("combobox", { name: "User" }));
    await userEvent.click(screen.getByTitle("Alice Example"));
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(request.get).toHaveBeenCalledWith("/posts", { params: { userId: 1 } }));
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    await waitFor(() => expect(request.get).toHaveBeenCalledWith("/posts", { params: { userId: undefined } }));
  });
  it("applies and clears the todo status filter", async () => {
    renderRoute("/todos");
    await screen.findByText("Example task");
    await userEvent.click(screen.getByRole("combobox", { name: "Status" }));
    await userEvent.click(screen.getByTitle("Pending"));
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(request.get).toHaveBeenCalledWith("/todos", { params: { userId: undefined, completed: false } }));
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    await waitFor(() => expect(request.get).toHaveBeenLastCalledWith("/users"));
    expect(request.get).toHaveBeenCalledWith("/todos", { params: { userId: undefined, completed: undefined } });
  });
  it("opens the todo detail with its completion status", async () => {
    renderRoute("/todos");
    await screen.findByText("Example task");
    await userEvent.click(screen.getAllByRole("button").find(button => button.querySelector('[data-icon="eye"]'))!);
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Done")).toBeInTheDocument();
  });
});
