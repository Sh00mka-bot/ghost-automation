const { waitForDebugger } = require("inspector");
const apiRequest = require("../../utils/api-utils");

describe("Tiers create, read, update, delete as admin", () => {
  let tierId;
  let slug;

  beforeAll(async () => {
    const allTiers = await apiRequest.get("/ghost/api/admin/tiers/");

    const archive = {tiers: [{
        active:false
    }]}

    if (allTiers.body.tiers.length > 0) {
      for (let tier of allTiers.body.tiers) {
          await apiRequest.put(`/ghost/api/admin/tiers/${tier.id}/`,archive);
          console.log(`Archiving tier: ${tier.id}`);
        }
    } else {
      console.log(" ~ No tiers found to archive.");
    }
  });




  test("Creating a Tier", async () => {
    const payload = {
        tiers: [
            {
                name: "Platinum Member",
                description: "Access to everything",
                visibility: "public",
                type: "paid",
                active: true,
                monthly_price: 1000,
                yearly_price: 10000,
                currency: "usd",
                benefits: ["Benefit 1", "Benefit 2"],
                stripe_prices: null,
            },
        ],
    };
    
    const create = await apiRequest.post("/ghost/api/admin/tiers", payload);
    expect(create.status).toBe(201);

    tierId = create.body.tiers[0].id;
    slug = create.body.tiers[0].slug;

    expect(create.body.tiers[0].name).toBe('Platinum Member');
});


  test("Updating a Tier ", async () => {
    const getTier = await apiRequest.get(`/ghost/api/admin/tiers/${tierId}/`);
    const updatedAt = getTier.body.tiers?.[0]?.updated_at;

    const payload = {
        tiers: [
          {
            name: "Bronze",
            updated_at: updatedAt,
            monthly_price: 500,
            yearly_price: 5000,
          },
        ],
      };

    const update = await apiRequest.put(`/ghost/api/admin/tiers/${tierId}/`,payload);

    expect(update.body.tiers[0].name).toBe('Bronze');
    expect(update.body.tiers[0].monthly_price).toBe(500);
  });


  test("Archive a Tier ", async () => {
    const getTier = await apiRequest.get(`/ghost/api/admin/tiers/${tierId}/`);
    const updatedAt = getTier.body.tiers?.[0]?.updated_at;

    expect(updatedAt).toBeDefined();

    const archive = {tiers: [{
        active:false
    }]}
    
    await apiRequest.put(`/ghost/api/admin/tiers/${tierId}/`,archive);

    const activeTiers = await apiRequest.get("/ghost/api/admin/tiers/", {active:true});

    expect(activeTiers.body.tiers.some(tier => tier.id === tierId)).toBe(true);

  });

  


});
