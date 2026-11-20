import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    eventTyp: String,
    produktId: Number,
    benutzerId: Number,
    benutzerNachname: String,
    menge: Number,
    zeitpunkt: {
        type: Date,
        default: Date.now
    }
},
    {
        versionKey: false
});

export const Journal = mongoose.model(
    "Journal",
    journalSchema,
    "journal"
);

export function eventcall() {
    return Journal.find().sort({ zeitpunkt: -1 });
}