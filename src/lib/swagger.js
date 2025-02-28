import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Postaway API",
      version: "1.0.0",
      description: "API documentation for the Postaway project",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      // AUTH ROUTES
      "/auth/signup": {
        post: {
          summary: "Register a new user",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user@example.com" },
                    password: { type: "string", example: "securepassword" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { description: "Invalid data (e.g., missing email/password)" },
            409: { description: "User already exists" },
            500: { description: "Internal server error" },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Log in a user",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user@example.com" },
                    password: { type: "string", example: "securepassword" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Login successful" },
            400: { description: "Bad request (missing email or password)" },
            401: { description: "Unauthorized (invalid credentials)" },
            500: { description: "Internal server error" },
          },
        },
      },
      "/auth/logout": {
        post: {
          summary: "Log out the current user",
          tags: ["Auth"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Successfully logged out" },
            401: { description: "Unauthorized (invalid token)" },
            500: { description: "Internal server error" },
          },
        },
      },

      // FRIEND ROUTES
      "/friend/get-friends/{userID}": {
        get: {
          summary: "Get user's friends list",
          tags: ["Friend"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "userID",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "List of friends" },
            404: { description: "User not found" },
            500: { description: "Internal server error" },
          },
        },
      },

      // LIKE ROUTES
      "/like/{postID}": {
        get: {
          summary: "Get all likes on a post",
          tags: ["Like"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "postID",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "List of likes" },
            404: { description: "Post not found" },
            500: { description: "Internal server error" },
          },
        },
      },
      "/like/toggle/{postID}": {
        post: {
          summary: "Like or unlike a post",
          tags: ["Like"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "postID",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Like toggled" },
            404: { description: "Post not found" },
            500: { description: "Internal server error" },
          },
        },
      },

      // OTP ROUTES
      "/otp/send": {
        post: {
          summary: "Send OTP",
          tags: ["OTP"],
          responses: {
            200: { description: "OTP sent" },
            500: { description: "Internal server error" },
          },
        },
      },
      "/otp/verify": {
        post: {
          summary: "Verify OTP",
          tags: ["OTP"],
          responses: {
            200: { description: "OTP verified" },
            400: { description: "Invalid OTP" },
            500: { description: "Internal server error" },
          },
        },
      },

      // PROFILE ROUTES
      "/profile/get-details/{userID}": {
        get: {
          summary: "Get user profile details",
          tags: ["Profile"],
          parameters: [
            {
              name: "userID",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "User profile details" },
            404: { description: "User not found" },
            500: { description: "Internal server error" },
          },
        },
      },
      "/profile/update-details/{userID}": {
        put: {
          summary: "Update user profile details",
          tags: ["Profile"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "userID",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "New name" },
                    email: { type: "string", example: "New email" },
                    gender: { type: "string", example: "New gender" },
                    avatar: { type: "string", example: "New avatar" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Profile updated" },
            400: { description: "Invalid data" },
            404: { description: "User not found" },
            500: { description: "Internal server error" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
};

export default swaggerDocs;
