import Ticket from "../models/ticketModel.js";

export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id
        });
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate('createdBy', 'name email')
            .populate('acceptedBy', 'name email')
            .populate('closedBy', 'name email');
        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateTicketState = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const { state } = req.body;
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        ticket.state = state;
        if (state === 'inprogeress') {
            ticket.acceptedBy = req.user._id;
        } else if (state === 'closed') {
            ticket.closedBy = req.user._id;
        }
        await ticket.save();
        res.status(200).json({ message: "Ticket state updated successfully", ticket });
    }  catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserTickets = async (req, res) => {
    try {
        const userId = req.user._id;
        const tickets = await Ticket.find({ createdBy: userId })
            .populate('createdBy', 'name email')
            .populate('acceptedBy', 'name email')
            .populate('closedBy', 'name email');
        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findByIdAndDelete(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId)
            .populate('createdBy', 'name email')
            .populate('acceptedBy', 'name email')
            .populate('closedBy', 'name email');
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ ticket });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getTicketsByState = async (req, res) => {
    try {
        const state = req.params.state;
        const tickets = await Ticket.find({ state })
            .populate('createdBy', 'name email')
            .populate('acceptedBy', 'name email')
            .populate('closedBy', 'name email');
        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};