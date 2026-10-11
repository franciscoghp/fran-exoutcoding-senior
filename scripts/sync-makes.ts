// One-off job: downloads every vehicle make + types from the NHTSA API into the database.
// Usage:  DATABASE_URL="mongodb+srv://..." npm run sync
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { MakesService } from "../src/makes/makes.service";

async function main() {
	const app = await NestFactory.createApplicationContext(AppModule, { logger: ["error", "warn"] });
	const makes = app.get(MakesService);
	const { total } = await makes.getMakes({ skip: 0, take: 10 }, true);
	console.log(`Synced ${total} makes`);
	await app.close();
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
