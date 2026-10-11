import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "node:path";
import { DatabaseModule } from "./database/database.module";
import { MakesModule } from "./makes/makes.module";
import { UtilsModule } from "./utils/utils.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			// The typings file is generated at startup; the filesystem is read-only on Vercel
			definitions: process.env.VERCEL
				? undefined
				: { path: join(process.cwd(), "src/graphql/generated.ts") },
			driver: ApolloDriver,
			typePaths: process.env.VERCEL ? ["./src/makes/schema/*.graphql"] : ["./**/*.graphql"],
			introspection: true,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
		}),
		MakesModule,
		UtilsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
