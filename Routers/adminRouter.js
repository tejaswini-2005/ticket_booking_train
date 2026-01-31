import express from "express";
import { addUer } from "../controller/aminControler.js";
import { 
    adminMiddleware, 
    authMiddleware 
} from "../Middleware/authMiddleware.js";
import { 
    updateTicketState
 } from "../controller/ticketController.js";

const adminRouter = express.Router();

// Get Method


// Post Method
adminRouter.post("/create-user",authMiddleware, adminMiddleware, addUer);

// Put Method
adminRouter.put("/titcket/update-state",authMiddleware, adminMiddleware, updateTicketState )

// Delete Method


export default adminRouter;