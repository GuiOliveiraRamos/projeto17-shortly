import { Router } from "express";
import { getUsers } from "../controllers/user.controllers.js";

const usersRoutes = Router();

usersRoutes.get("/users/me", getUsers);

export default usersRoutes;
