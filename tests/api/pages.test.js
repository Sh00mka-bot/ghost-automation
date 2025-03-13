const apiRequest = require("../../utils/api-utils");

describe("Pages from admin panel: ", () => {

    let pageId;
    let slug;

  beforeAll(async () => {
    const allPages = await apiRequest.get("/ghost/api/admin/pages/");

    if (allPages.body.pages.length > 0) {
      for (let page of allPages.body.pages) {
        await apiRequest.delete(`/ghost/api/admin/pages/${page.id}/`);
        console.log(`Deleted page: ${page.id}`);
      }
    } else {
      console.log(" ~ No pages found to delete.");
    }
  });

  test("Create Page as admin ", async()=>{
    const pagePayload = { pages: [{ title: "First Page Created", status: "published" }] };
    const postPage = await apiRequest.post("/ghost/api/admin/pages/", pagePayload);
    
    expect(postPage.status).toBe(201);

    pageId = postPage.body.pages[0].id;
    slug = postPage.body.pages[0].slug;

    expect(postPage.body.pages[0]).toHaveProperty("title");
    expect(postPage.body.pages[0].title).toBe('First Page Created');
  })

  test('Copy the Page as admin ',  async()=>{

    const copyPage = await apiRequest.post(`/ghost/api/admin/pages/${pageId}/copy/`);
    expect(copyPage.status).toBe(201)


    const allPages = await apiRequest.get(`/ghost/api/admin/pages/`);
    expect(allPages.body.pages.length).toBe(2);
    expect(allPages.body.pages[0].title).toBe('First Page Created (Copy)')
    expect(allPages.body.pages[1].title).toBe('First Page Created')
  })

  test("Get created page as admin by Id", async()=>{

    const getPage = await apiRequest.get(`/ghost/api/admin/pages/${pageId}/`);
  
    expect(getPage.status).toBe(200);
    expect(getPage.body.pages[0].title).toBe('First Page Created');
  })


  test("Get created page as admin by slug", async()=>{

    const getPage = await apiRequest.get(`/ghost/api/admin/pages/slug/${slug}/`);

    expect(getPage.status).toBe(200);
    expect(getPage.body.pages[0].title).toBe('First Page Created');
  })


  test("Update page as admin ", async() => {

    const getPage = await apiRequest.get(`/ghost/api/admin/pages/${pageId}/`);
    const updateTime = getPage.body.pages[0].updated_at;
    expect(updateTime).toBeDefined();

    const upd = { pages: [{ title: "Updated Page Created", updated_at: updateTime }] };
    const updatePage = await apiRequest.put(`/ghost/api/admin/pages/${pageId}/`,upd);

    expect(updatePage.body.pages[0].title).toBe("Updated Page Created")
  })

  test("Delete Page as admin ", async()=>{

    const deletePage = await apiRequest.delete(`/ghost/api/admin/pages/${pageId}/`);
    expect(deletePage.status).toBe(204);

    const deletedPage = await apiRequest.get(`/ghost/api/admin/pages/${pageId}/`);
    expect(deletedPage.status).toBe(404);

  })

});
