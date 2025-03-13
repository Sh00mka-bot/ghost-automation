const apiRequest = require("../../utils/api-utils");
const logger = require("../../utils/logger");

describe("Member create, update, delete as admin ", ()=>{

    let memberId;


    beforeAll(async()=>{

        const allMembers = await apiRequest.get('/ghost/api/admin/members/');

        if(allMembers.body.members.length > 0){

            for(let member of allMembers.body.members) {

                await apiRequest.delete(`/ghost/api/admin/members/${member.id}/`);

                logger.info(`${member.id} id Member has been deleted`)
            }
        } else {
            logger.info(" ~ No member to delete");
        }

    });

    test("Create a Member ", async()=>{
        const payload = {
            "members": [
                {
                    "email": "maggie@ghost.org",
                    "name": "Maggie",
                    "labels": [
                        {
                            "name": "VIP",
                            "slug": "vip"
                        }
                    ],
                }
            ]
        }

        const createMember = await apiRequest.post("/ghost/api/admin/members/",payload);
        memberId = createMember.body.members[0].id;

        expect(createMember.status).toBe(201);
        expect(createMember.body.members.some(member => member.name === 'Maggie')).toBe(true);
    })

    test("Update a member", async() => {
        const payload = { members: [{ name: "Victor"}]}

        const updateMemberName = await apiRequest.put(`/ghost/api/admin/members/${memberId}/`,payload);
        expect(updateMemberName.status).toBe(200);


        expect(updateMemberName.body.members[0].name).toBe("Victor");
    })


    test("Delete a member by Id", async()=>{
        const deleteMember = await apiRequest.delete(`/ghost/api/admin/members/${memberId}/`);
        expect(deleteMember.status).toBe(204);

        const fetchMember = await apiRequest.get(`/ghost/api/admin/members/${memberId}/`);
        expect(fetchMember.status).toBe(404);

    })

})
