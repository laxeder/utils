import "./config/enviroment";

import { HOST, PORT } from "./config/server";

import createServer from "./server/createServer";

function start(): void {
  const server = createServer();

  server.listen(PORT, () => {
    console.log("Environment: " + process.env.NODE_ENV);
    console.log(`Server started on: http://${HOST}:${PORT}`);
    console.log("Press Ctrl+C to stop server");
  });
}

start();
