import test, { expect, request } from "@playwright/test";

test.describe("Auth API", () => {

    test("POST - should login successfully", async ({ request }) => {
        const response = await request.post("/login", {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            },
            headers: {
                // ToDo: remove key and use .env
                "x-api-key": "reqres_4fd183b2b1d04d508f70ec793404dbdc"
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.token).toBeTruthy();
    });

    test("POST - should fail login with missing password", async ({ request }) => {
        const response = await request.post("/login", {
            data: {
                email: "eve.holt@reqres.in"
            },
            headers: {
                // ToDo: remove key and use .env
                "x-api-key": "reqres_4fd183b2b1d04d508f70ec793404dbdc"
            }
        });

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body.error).toBe("Missing password");
    });

    test("POST - should register successfully", async ({ request }) => {
        const response = await request.post("/register", {
            data: {
                email: "eve.holt@reqres.in",
                password: "pistol"
            },
            headers: {
                // ToDo: remove key and use .env
                "x-api-key": "reqres_4fd183b2b1d04d508f70ec793404dbdc"
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBeTruthy();
        expect(body.token).toBeTruthy();
    })

});