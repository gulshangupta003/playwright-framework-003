import test, { expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();


test.describe("Auth API", () => {

    test("POST - should login successfully", async ({ request }) => {
        const response = await request.post("https://reqres.in/api/login", {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            },
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.token).toBeTruthy();
    });

    test("POST - should fail login with missing password", async ({ request }) => {
        const response = await request.post("https://reqres.in/api/login", {
            data: {
                email: "eve.holt@reqres.in"
            },
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body.error).toBe("Missing password");
    });

    test("POST - should register successfully", async ({ request }) => {
        const response = await request.post("https://reqres.in/api/register", {
            data: {
                email: "eve.holt@reqres.in",
                password: "pistol"
            },
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBeTruthy();
        expect(body.token).toBeTruthy();
    })

});