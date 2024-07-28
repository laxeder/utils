export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_DEV = NODE_ENV === "development";

if (IS_DEV) {
  process.loadEnvFile(".env.dev");
} else {
  process.loadEnvFile(".env.prod");
}
