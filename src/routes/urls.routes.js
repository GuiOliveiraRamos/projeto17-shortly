import { Router } from "express";
import { schemaValidation } from "../middlewares/schema.validation.js";
import schemaUrl from "../schemas/url.schemas.js";
import {
  getShortUrl,
  getUrlById,
  newUrl,
} from "../controllers/urls.controllers.js";

const urlsRoutes = Router();

urlsRoutes.post("/urls/shorten", schemaValidation(schemaUrl), newUrl);
urlsRoutes.get("/urls/:id", getUrlById);
urlsRoutes.get("/urls/open/:shorturl", getShortUrl);
urlsRoutes.delete("/urls/:id");

export default urlsRoutes;
