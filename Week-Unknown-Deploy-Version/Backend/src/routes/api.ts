import { Hono } from "hono";
import booksRouter from "./books.js";
import ordersRouter from "./orders.js";

declare global {
  interface BigInt {
    toJSON(): Number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
}

const apiRouter = new Hono();

apiRouter.route("/books", booksRouter);
apiRouter.route("/orders", ordersRouter);

export default apiRouter;
