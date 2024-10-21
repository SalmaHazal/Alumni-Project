import express from "express";
import { callrequist } from "../controllers/planingcall.js";

const router = express.Router();

router.post("/", callrequist );

export default router;