import { AppService } from './app.service';
import { SeederService } from './database/seeder.service';
export declare class AppController {
    private readonly appService;
    private readonly seederService;
    constructor(appService: AppService, seederService: SeederService);
    getWelcome(): object;
    getHealth(): object;
    getStatistics(): object;
    getVersion(): object;
    seedDatabase(): Promise<object>;
    clearDatabase(): Promise<object>;
}
