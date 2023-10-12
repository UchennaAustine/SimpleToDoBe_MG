import dotenv from "dotenv";
dotenv.config();

export const envs = {
  port: parseInt(process.env.port!) as number,
  db: process.env.DB! as string,

  cloud_name: process.env.cloud_name as string,
  api_key: process.env.api_key as string,
  api_secret: process.env.api_secret as string,
};
