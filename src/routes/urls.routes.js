import { Router } from "express";

const urlsRoutes = Router();

urlsRoutes.post("/urls/shorten");
urlsRoutes.get("/urls/:id");
urlsRoutes.get("/urls/open/:shorturl");
urlsRoutes.delete("/urls/:id");

export default urlsRoutes;
