import { Router } from "express";
import { schemaValidation } from "../middlewares/schema.validation.js";
import schemaUrl from "../schemas/url.schemas.js";
import {
  deleteShortUrl,
  getShortUrl,
  getUrlById,
  newUrl,
} from "../controllers/urls.controllers.js";

const urlsRoutes = Router();

urlsRoutes.post("/urls/shorten", schemaValidation(schemaUrl), newUrl);
urlsRoutes.get("/urls/:id", getUrlById);
urlsRoutes.get("/urls/open/:shortUrl", getShortUrl);
urlsRoutes.delete("/urls/:id", deleteShortUrl);

export default urlsRoutes;
