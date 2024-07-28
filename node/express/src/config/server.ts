import { IS_DEV } from "./enviroment";

export const PORT = IS_DEV ? process.env.PORT_DEV : process.env.PORT;
export const HOST = IS_DEV ? process.env.HOST_DEV : process.env.HOST;
