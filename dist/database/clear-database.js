"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const app_module_1 = require("../app.module");
const clearDatabase = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        const databaseType = process.env.DATABASE_TYPE;
        if (databaseType !== 'mongodb') {
            console.error('❌ This script only works with MongoDB.');
            console.log(`   Current DATABASE_TYPE: ${databaseType}`);
            await app.close();
            process.exit(1);
        }
        const connection = app.get((0, mongoose_1.getConnectionToken)());
        const dbName = connection.db.databaseName;
        console.log('🗑️  Starting database cleanup...');
        console.log(`📊 Database: ${dbName}`);
        console.log('');
        const collections = await connection.db.listCollections().toArray();
        if (collections.length === 0) {
            console.log('✅ Database is already empty.');
            await app.close();
            return;
        }
        console.log(`📋 Found ${collections.length} collections:`);
        collections.forEach((col) => console.log(`   - ${col.name}`));
        console.log('');
        for (const collection of collections) {
            try {
                await connection.db.collection(collection.name).drop();
                console.log(`   ✅ Dropped collection: ${collection.name}`);
            }
            catch (error) {
                console.error(`   ❌ Failed to drop collection ${collection.name}:`, error.message);
            }
        }
        console.log('');
        console.log('✨ Database cleared successfully!');
        console.log('💡 You can now run seed scripts to populate fresh data.');
        console.log('   Example: npm run seed:run:document');
    }
    catch (error) {
        console.error('');
        console.error('❌ Error clearing database:');
        console.error(error);
        await app.close();
        process.exit(1);
    }
    finally {
        await app.close();
    }
};
void clearDatabase();
//# sourceMappingURL=clear-database.js.map