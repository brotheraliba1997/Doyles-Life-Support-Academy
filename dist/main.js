"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_module_1 = require("./app.module");
const validation_options_1 = __importDefault(require("./utils/validation-options"));
const serializer_interceptor_1 = require("./utils/serializer.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5000',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5000',
            'http://127.0.0.1:3001',
            'https://kelmac-frontend-kelmac-dev.vercel.app',
            'https://kelmac-frontend.vercel.app',
            'http://localhost:3000',
            'https://kelmac-dashboard-g33j.vercel.app',
            'https://kelmac-dashboard.vercel.app',
            'https://kelmac-frontend.vercel.app',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization, x-custom-lang',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
    });
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    const configService = app.get((config_1.ConfigService));
    app.enableShutdownHooks();
    app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
        exclude: ['/', 'docs', 'docs-json'],
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe(validation_options_1.default));
    app.useGlobalInterceptors(new serializer_interceptor_1.ResolvePromisesInterceptor(), new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .addGlobalParameters({
        in: 'header',
        required: false,
        name: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
        schema: {
            example: 'en',
        },
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = configService.getOrThrow('app.port', { infer: true });
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap().catch((err) => {
    console.error('❌ Error starting application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map