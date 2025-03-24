import {expect, Page} from "@playwright/test";
import apiRequest from "../utils/api-utils";

class HelperBase {
    constructor(page) {
        this.page = page;
    }


    async cleanAllDataFrom(endpoint){
        //this is going to be an api call to delete all data
    }

    async erase(data){
        const getPost = await apiRequest.get(`/ghost/api/admin/${data}/`);
        const postId = getPost.body.posts[0].id;
        const deleteByID = await apiRequest.delete(
            `/ghost/api/admin/posts/${postId}/`
        );
        expect(deleteByID.status).toEqual(204);

    }


}

module.exports = HelperBase;
