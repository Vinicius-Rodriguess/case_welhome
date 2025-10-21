import { Router } from "express";
import { getAll, create, update, remove } from "./imovel.controller.js";

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;