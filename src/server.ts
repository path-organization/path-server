import app from "./app";
import cors from "cors";
import { initializeDatabase } from "./config/db/db";
import { ENV } from "./config/env";
import { initMonthlyFinancesJob } from "./jobs/monthly-finances-job";
import { buildContainer } from "./container";
import { initializeRedis } from "./config/redis";

const bootstrap = async () => {
  await initializeDatabase();
  await initializeRedis();

  const allowedOrigins = ENV.CORS_ORIGIN.split(",") ?? [];

  app.use(
    cors({
      origin: allowedOrigins,

      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  const { authRoutes, userRoutes, conceptRoutes, chatRoutes, fsChatRoutes } =
    buildContainer();

  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/concepts", conceptRoutes);
  app.use("/chat", chatRoutes);
  app.use("/fs-chat", fsChatRoutes);

  await initMonthlyFinancesJob();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};

bootstrap();
