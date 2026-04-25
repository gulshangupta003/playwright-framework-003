import { test, expect } from "@playwright/test";

test.describe("Auth API", () => {

    test("POST - should login successfully", async ({ request }) => {
        const response = await request.post("/api/login", {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.token).toBeTruthy();
    });

    test("POST - should fail login with missing password", async ({ request }) => {
        const response = await request.post("/api/login", {
            data: {
                email: "eve.holt@reqres.in"
            }
        });

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body.error).toBe("Missing password");
    });

    test("POST - should register successfully", async ({ request }) => {
        const response = await request.post("/api/register", {
            data: {
                email: "eve.holt@reqres.in",
                password: "pistol"
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBeTruthy();
        expect(body.token).toBeTruthy();
    });

});