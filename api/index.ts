// Serverless entry point for Vercel: boots the Nest app once per instance and reuses it.
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import { AppModule } from "../src/app.module";

let cached: express.Express | null = null;

async function bootstrap() {
	const server = express();
	const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { logger: ["error", "warn"] });
	await app.init();
	return server;
}

export default async function handler(req: express.Request, res: express.Response) {
	cached = cached ?? (await bootstrap());
	return cached(req, res);
}
