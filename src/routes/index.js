import express from "express";

const router = express.Router();

import version1 from "../routes/version1.js"
router.use('/v1',version1);

export default router;




