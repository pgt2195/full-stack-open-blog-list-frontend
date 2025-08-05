import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";
import AddBlog from "./AddBlog";

vi.mock("../services/blogs");

const fakeReturnedBlog = {
  title: "Je fais un nouveau test",
  author: "Didier Michou",
  url: "test.com",
  likes: 7,
  user: {
    username: "Pololo_2",
    name: "Paul GT 2",
    id: "6885fac405f88be7b2bf49de",
  },
  id: "688601bf05f88be7b2bf4a4b",
};

const fakeUser = {
  username: "TestUser",
  name: "Test User",
  blogs: [],
  id: "68822d5b6bd452df57705512",
};

test("checking if addBlog is receiving the right details when a blog is created", async () => {
  blogService.create.mockResolvedValueOnce(fakeReturnedBlog);

  const blogFormRef = {
    current: {
      toggleVisibility: () => "",
    },
  };

  render(
    <AddBlog
      user={fakeUser}
      blogs={[]}
      setBlogs={() => {}}
      blogFormRef={blogFormRef}
    />,
  );

  const user = userEvent.setup();

  const titleInput = screen.getByLabelText("title");
  const authorInput = screen.getByLabelText("author");
  const urlInput = screen.getByLabelText("url");
  const button = screen.getByText("save");

  await user.type(titleInput, "le titre");
  await user.type(authorInput, "l'auteur'");
  await user.type(urlInput, "l'url'");

  await user.click(button);

  expect(blogService.create).toHaveBeenCalledWith({
    title: expect.any(String), // expect.any(String) nous permet ici de vérifier juste que title est bien présent, sans faire attention à ce qu'il y a dedans
    author: expect.any(String),
    url: expect.any(String),
  });
});
