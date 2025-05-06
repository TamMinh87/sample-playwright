import { FullConfig, request, expect } from "@playwright/test";
import dotenv from "dotenv"

async function globalSetup(config: FullConfig) {

    try {
        if (process.env.ENV) {
            dotenv.config({
                path: `./src/env/.env.${process.env.ENV}`,
                override: true
            });
        }
    } catch (error) {
        console.error("Error loading environment variables:", error);
    }
}
export default globalSetup;