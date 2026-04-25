import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.describe("User API", () => {

    test("GET - should fetch list of users", async ({ request }) => {
        const response = await request.get("https://reqres.in/api/users", {
            params: {
                page: 2
            },
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.page).toBe(2);
        expect(body.data[0]).toHaveProperty("id");
        expect(body.data[0]).toHaveProperty("email");
    });

    test("GET - should fetch single user", async ({ request }) => {
        const response = await request.get("https://reqres.in/api/users/2", {
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.id).toBe(2);
    });

    test("GET - should return 404 for non-existent user", async ({ request }) => {
        const response = await request.get("https://reqres.in/api/users/23", {
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(404);
    });

    test("POST - should create a user", async ({ request }) => {
        const response = await request.post("https://reqres.in/api/users", {
            data: {
                name: "Gulshan",
                job: "SDET"
            },
            headers: {
                "x-api-key": process.env.API_KEY as string
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
        const response = await request.patch("https://reqres.in/api/users/2", {
            data: {
                job: "Senior SDET"
            },
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.job).toBe("Senior SDET");
    });

    test("DELETE - should delete a user", async ({ request }) => {
        const response = await request.delete("https://reqres.in/api/users/2", {
            headers: {
                "x-api-key": process.env.API_KEY as string
            }
        });

        expect(response.status()).toBe(204);
    });

});