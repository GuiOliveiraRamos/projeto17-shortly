import { Router } from "express";
import { schemaValidation } from "../middlewares/schema.validation.js";
import { signIn, signUp } from "../controllers/sign.controllers.js";
import { schemaSignIn, schemaSignUp } from "../schemas/sign.schemas.js";

const signRoutes = Router();

signRoutes.post("/signup", schemaValidation(schemaSignUp), signUp);
signRoutes.post("/signin", schemaValidation(schemaSignIn), signIn);

export default signRoutes;
