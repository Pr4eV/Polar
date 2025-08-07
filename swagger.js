const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Swagger options
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Polar API Documentation",
      version: "1.0.0",
      description: "API documentation for Polar app",
      contact: {
        name: "Pr4eV",
        email: "pr4ev@gmail.com",
      },
    },
    servers: [
      // {
      //   url: "https://pmt.liara.run",
      // },
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        AuthTokenHeader: {
          type: "apiKey",
          in: "header",
          name: "x-auth-token",
        },
      },
    },
    security: [
      {
        AuthTokenHeader: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
