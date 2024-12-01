"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const swagger_helper_1 = require("./common/helpers/swagger-helper");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('AutoRia project')
        .setDescription('The AutoRia API description')
        .setVersion('1.0')
        .addBearerAuth({
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_helper_1.SwaggerHelper.setDefaultResponses(document);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            docExpansion: 'list',
            defaultModelsExpandDepth: 7,
            persistAuthorization: true,
        },
    });
    const configService = app.get(config_1.ConfigService);
    const appConfig = configService.get('app');
    await app.listen(appConfig.port, () => {
        console.log(`Server is running on http://${appConfig.host}:${appConfig.port}`);
        console.log(`Swagger is running on http://${appConfig.host}:${appConfig.port}/docs`);
    });
}
void bootstrap();
//# sourceMappingURL=main.js.map