import { test, expect } from "@playwright/test";

test.describe("User API", () => {

    test("GET - should fetch list of users", async ({ request }) => {
        const response = await request.get("/api/users", {
            params: {
                page: 2
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.page).toBe(2);
        expect(body.data[0]).toHaveProperty("id");
        expect(body.data[0]).toHaveProperty("email");
    });

    test("GET - should fetch single user", async ({ request }) => {
        const response = await request.get("/api/users/2");

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.id).toBe(2);
    });

    test("GET - should return 404 for non-existent user", async ({ request }) => {
        const response = await request.get("/api/users/23");

        expect(response.status()).toBe(404);
    });

    test("POST - should create a user", async ({ request }) => {
        const response = await request.post("/api/users", {
            data: {
                name: "Gulshan",
                job: "SDET"
            }
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.name).toBe("Gulshan");
        expect(body.job).toBe("SDET");
        expect(body.id).toBeTruthy();
        expect(body.createdAt).toBeTruthy();
    });

    test("PATCH - should partially update a user", async ({ request }) => {
        const response = await request.patch("/api/users/2", {
            data: {
                job: "Senior SDET"
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.job).toBe("Senior SDET");
    });

    test("DELETE - should delete a user", async ({ request }) => {
        const response = await request.delete("/api/users/2");

        expect(response.status()).toBe(204);
    });

});