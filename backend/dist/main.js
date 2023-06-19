"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
(async () => {
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(port);
    console.log("Server listening at port " + port);
    console.log("http://localhost:" + port);
})();
//# sourceMappingURL=main.js.map