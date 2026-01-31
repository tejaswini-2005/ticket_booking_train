import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    title : { type: String},
    description : {
        type : { type : String }
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId, ref : "user"
    },
    acceptedBy : {
        type : mongoose.Schema.Types.ObjectId , ref: "user"
    },
    closedBy : {
        type : mongoose.Schema.Types.ObjectId , ref: "user"
    },
    state: {
        type : String,
        enum : ["created","inprogeress", "closed"],
        default : "created"
    }
},{timestamps: true});


const Ticket = mongoose.model("task",ticketSchema);


export default Ticket;