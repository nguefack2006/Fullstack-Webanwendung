
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./src/app.ts"];

const doc = {
    info: {
        title: "Lagerverwaltung API",
        description: "API der Lagerverwaltungsanwendung",
        version: "1.0.0"
    },
    host: "localhost:8080",
    schemes: ["http"]
};

swaggerAutogen(outputFile, endpointsFiles, doc);
