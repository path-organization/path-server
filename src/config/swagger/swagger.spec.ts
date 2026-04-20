import { swaggerBase } from "./swagger.base";
import { authPaths, authSchemas } from "../../modules/auth/swagger.auth.paths";
import { userPaths, userSchemas } from "../../modules/user/swagger.user.paths";
import {
  conceptPaths,
  conceptSchemas,
} from "../../modules/concepts/swagger.concepts.paths";
import { chatPaths, chatSchemas } from "../../modules/chat/swagger.chat.paths";
import {
  fsChatPaths,
  fsChatSchemas,
} from "../../modules/chat/swagger.fs-chat.paths";

// env 기반 서버 URL (fallback: localhost)
const serverUrl = process.env.SWAGGER_SERVER_URL || "http://localhost:3000";

export const swaggerSpec = {
  ...swaggerBase,

  // 핵심: Swagger UI가 실제 호출할 서버 정의
  servers: [
    {
      url: serverUrl,
    },
  ],

  paths: {
    ...swaggerBase.paths,
    ...authPaths,
    ...userPaths,
    ...conceptPaths,
    ...chatPaths,
    ...fsChatPaths,
  },

  components: {
    ...swaggerBase.components,
    schemas: {
      ...swaggerBase.components.schemas,
      ...authSchemas,
      ...userSchemas,
      ...conceptSchemas,
      ...chatSchemas,
      ...fsChatSchemas,
    },
  },
};
