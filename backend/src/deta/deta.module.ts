import { DynamicModule, Module } from "@nestjs/common";
import { DetaService } from "./deta.service";

@Module({})
export class DetaModule {
	static forRoot = (): DynamicModule => {
		return {
			global: true,
			module: DetaModule,
			providers: [DetaService],
			exports: [DetaService]
		}
	} 
}
