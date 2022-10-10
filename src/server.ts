import * as Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import { connectDb } from "./configs/db.config";
import { voucherRoutes } from "./controllers/voucherController";
import { usertRoutes } from "./controllers/userController";
import { eventRoutes } from "./controllers/eventController";
import { editableEventRoutes } from "./controllers/editableController";

const server: Server = Hapi.server({
  port: 3300,
  host: "localhost",
});

server.route({
  method: "GET",
  path: "/",
  handler: function () {
    return "Home";
  },
});

export const start = async () => {
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: "Test API Documentation",
    },
  };

  const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ];

  await server.register(plugins);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

start();
connectDb();
usertRoutes(server);
eventRoutes(server);
voucherRoutes(server);
editableEventRoutes(server);

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
