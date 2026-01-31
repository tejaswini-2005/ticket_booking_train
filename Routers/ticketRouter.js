import express from 'express'
import { 
    createTicket,
    deleteTicket,
    getAllTickets,
    getTicketById,
    getTicketsByState,
    getUserTickets,
    updateTicketState
 } from '../controller/ticketController.js';
import { adminMiddleware, reviewerMiddleware } from '../Middleware/authMiddleware.js';



const ticketRoute = express.Router();


// GET Methods
ticketRoute.post("/all-tickets",adminMiddleware, getAllTickets)

ticketRoute.get("/getUserTickets", getUserTickets);

ticketRoute.get("/:id", getTicketById);

ticketRoute.get("/by-stsate/:state", reviewerMiddleware, getTicketsByState);


// POST Methods
ticketRoute.post("/create",createTicket);



// PUT Methods
ticketRoute.post("/update-state",reviewerMiddleware, updateTicketState);


// DELETE Methods
ticketRoute.delete("delete-tickets/:id" , reviewerMiddleware , deleteTicket);

export default ticketRoute;
