import { connectMongoDB } from "./config/mongodb";
import { eventBus } from "./events/event.bus";
import "./events/journal.listener";

async function test() {
    await connectMongoDB();

    eventBus.emit("WarenbewegungErfasst", {
        eventTyp: "WARENEINGANG",
        produktId: 6,
        benutzerId: 23,
        menge: 10
    });

    console.log("Test-Event veröffentlicht");
}

test();