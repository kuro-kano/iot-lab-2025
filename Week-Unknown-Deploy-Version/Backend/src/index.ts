import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import apiRouter from "./routes/api.js";

const app = new Hono();

app.use("/api/*", cors({
  origin: (origin) => {
    const allowed = [
      "http://localhost:5173",
      "https://cafe-website.vercel.app",
      "https://cafe-website-kuro-kano.vercel.app"
    ];
    return allowed.includes(origin) ? origin : "*";
  },
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

app.route("/api/v1", apiRouter);

serve({
  fetch: app.fetch, port: 3000,
},
(info) => {
  console.log(`Server is running at http://localhost:${info.port}`);
});
