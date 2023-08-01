import { Router } from "express";
import signRoutes from "./sign.routes.js";
import urlsRoutes from "./urls.routes.js";
import usersRoutes from "./user.routes.js";
import rankingRoutes from "./ranking.routes.js";

const router = Router();

router.use(signRoutes);
router.use(urlsRoutes);
router.use(usersRoutes);
router.use(rankingRoutes);

export default router;
