const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API with Authentication and Task Management",
      version: "1.0.0",
      description: "This is a REST API for managing authentication and tasks.",
      contact: {
        name: "Your Name",
        email: "your-email@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the route files
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
