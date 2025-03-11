const apiRequest = require("../../utils/api-utils");

describe("Publishing post from admin panel: ", () => {
  let postId;
  let slug;

  beforeAll(async () => {
    const allPosts = await apiRequest.get("/ghost/api/admin/posts/");

    if (allPosts.body.posts.length > 0) {
      for (let post of allPosts.body.posts) {
        await apiRequest.delete(`/ghost/api/admin/posts/${post.id}/`);
        console.log(`Deleted post: ${post.id}`);
      }
    } else {
      console.log(" ~ No posts found to delete.");
    }
  });

  test("Should create and publish a post", async () => {
    const payload = {
      posts: [{ title: "This is First Post", status: "published" }],
    };

    const postPost = await apiRequest.post("/ghost/api/admin/posts/", payload);

    //console.log("API Response:", postPost);
    expect(postPost.body).toHaveProperty("posts");
    postId = postPost.body.posts[0].id;
    slug = postPost.body.posts[0].slug;

    expect(postPost.body.posts[0].title).toBe("This is First Post");
  });

  test("Should copy the Post as admin ", async () => {
    const post = await apiRequest.post(
      `/ghost/api/admin/posts/${postId}/copy/`
    );
    expect(post.status).toBe(201);

    const allPosts = await apiRequest.get(`/ghost/api/admin/posts/`);
    expect(allPosts.body.posts.length).toBe(2);
    expect(allPosts.body.posts[0].title).toBe("This is First Post (Copy)");
    expect(allPosts.body.posts[1].title).toBe("This is First Post");
  });

  test("Should retrieve the pibslished post by ID", async () => {
    const getPostById = await apiRequest.get(
      `/ghost/api/admin/posts/${postId}/`
    );

    expect(getPostById.body.posts[0]).toHaveProperty("id");
    expect(getPostById.body.posts[0].title).toBe("This is First Post");
  });

  test("Should retrieve the pibslished post by slug", async () => {
    console.log("SLUG is: ", slug);
    const getPostBySlug = await apiRequest.get(
      `/ghost/api/admin/posts/slug/${slug}/`
    );

    expect(getPostBySlug.body.posts[0]).toHaveProperty("slug");
    expect(getPostBySlug.body.posts[0].title).toBe("This is First Post");
  });

  test("Should update the pibslished post", async () => {
    const getPost = await apiRequest.get(`/ghost/api/admin/posts/${postId}/`);
    const updatedAt = getPost.body.posts[0].updated_at;
    expect(updatedAt).toBeDefined();

    const newPayload = {
      posts: [{ title: "Updated Post", updated_at: updatedAt }],
    };
    const updatePost = await apiRequest.put(
      `/ghost/api/admin/posts/${postId}/`,
      newPayload
    );
    //expect(updatePost).toHaveProperty("updated_at");

    expect(updatePost.body.posts[0].title).toBe("Updated Post");
  });

  test("Should delete the pibslished post", async () => {
    const deleteByID = await apiRequest.delete(
      `/ghost/api/admin/posts/${postId}/`
    );
    expect(deleteByID.status).toEqual(204);

    const getDeletedPost = await apiRequest.get(
      `/ghost/api/admin/posts/${postId}/`
    );
    expect(getDeletedPost.status).toEqual(404);
  });
});
