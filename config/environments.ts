type Environment = {
    env: string,
    baseURL: string,
    apiURL: string,
    credentials: {
        standard: { username: string, password: string },
        locked: { username: string, password: string },
        problem: { username: string; password: string };
    };
    timeout: number
};

const environments: Record<string, Environment> = {
    dev: {
        env: "dev",
        baseURL: "https://www.saucedemo.com",
        apiURL: "https://reqres.in",
        credentials: {
            standard: { username: "standard_user", password: "secret_sauce" },
            locked: { username: 'locked_out_user', password: 'secret_sauce' },
            problem: { username: 'problem_user', password: 'secret_sauce' },
        },
        timeout: 30_000,
    },
    qa: {
        env: "qa",
        baseURL: "https://www.saucedemo.com",
        apiURL: "https://reqres.in",
        credentials: {
            standard: { username: "standard_user", password: "secret_sauce" },
            locked: { username: 'locked_out_user', password: 'secret_sauce' },
            problem: { username: 'problem_user', password: 'secret_sauce' },
        },
        timeout: 30_000,
    },
    prod: {
        env: "prod",
        baseURL: 'https://www.saucedemo.com',
        apiURL: 'https://reqres.in/api',
        credentials: {
            standard: { username: 'standard_user', password: 'secret_sauce' },
            locked: { username: 'locked_out_user', password: 'secret_sauce' },
            problem: { username: 'problem_user', password: 'secret_sauce' },
        },
        timeout: 60_000,
    },
};

export function getEnvironment(): Environment {
    const env = process.env.ENV || "qa";

    if (!environments[env]) {
        throw new Error(`Unknown environment: ${env}. Valid: ${Object.keys(environments).join(', ')}`);
    }

    return environments[env];
};