import { Router } from "express";
import { InventoryController } from "./inventory.controller.ts";
import { subtractStockValidator } from "./inventory.validators.ts";

const router = Router();
const inventoryController = new InventoryController();

router.post(
  "/subtract-stock",
  subtractStockValidator,
  inventoryController.subtractStock.bind(inventoryController)
);

export default router;
