import express from "express";
import inventoryRoutes from "./features/inventory/inventory.routes.ts";
import taxRoutes from "./features/taxes/tax.routes.ts";
import { errorHandler } from "./shared/middleware/error-handler.ts";
import { logging } from "./shared/middleware/logging.ts";

const app = express();

app.use(express.json());
app.use(logging);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Bienvenido a Los Hermanos Microservicio",
    version: "1.0.0",
    endpoints: {
      inventory: "/inventory",
      taxes: "/taxes",
    },
  });
});

app.use("/inventory", inventoryRoutes);
app.use("/taxes", taxRoutes);

app.use(errorHandler);

export default app;
