"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const location_seed_service_1 = require("./location-seed.service");
const seed_module_1 = require("../seed.module");
const runLocationSeed = async () => {
    const app = await core_1.NestFactory.create(seed_module_1.SeedModule);
    await app.get(location_seed_service_1.LocationSeedService).run();
    await app.close();
};
void runLocationSeed();
//# sourceMappingURL=run-location-seed.js.map