import {expect, Page} from "@playwright/test";
import apiRequest from "../utils/api-utils";

class HelperBase {
    constructor(page) {
        this.page = page;
    }


    async cleanAllDataFrom(endpoint){
        const allData = await apiRequest.get(`/ghost/api/admin/${endpoint}/`);

        if (allData.body.posts.length > 0) {
            for (let data of allData.body.posts) {
                await apiRequest.delete(`/ghost/api/admin/${endpoint}/${data.id}/`);
                console.log(`Deleted ${endpoint} : ${data.id}`);
            }
        } else {
            console.log(` ~ No ${endpoint} found to delete.`);
        }
    }

    async erase(data){
        const getPost = await apiRequest.get(`/ghost/api/admin/${data}/`);
        const postId = getPost.body.posts[0].id;
        const deleteByID = await apiRequest.delete(
            `/ghost/api/admin/posts/${postId}/`
        );
        expect(deleteByID.status).toEqual(204);

    }


    async waitForPostToBeSaved(){

        const status = this.page.locator('[data-test-editor-post-status]');
        await expect(status).toHaveText(/Saved/, { timeout: 5000 });

        await this.page.waitForLoadState('networkidle');
    }


}

module.exports = HelperBase;
