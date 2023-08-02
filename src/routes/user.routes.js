import { Router } from "express";

const usersRoutes = Router();

usersRoutes.get("/users/me");

export default usersRoutes;
