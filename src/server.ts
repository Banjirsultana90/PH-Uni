import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import express from "express";
import cors from "cors";
import { Server } from "http";


let server:Server
// parser
app.use(express.json()), app.use(cors());

async function main() {
  await mongoose.connect(config.database_url as string);
  try {
    server= app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
process.on('unhandledRejection',()=>{
  console.log(`unhandledRejection is found ,shut down the server`)
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})
// Promise.reject()
process.on('uncaughtException',()=>{
  console.log(`uncaughtException is found ,shut down the server`)

  process.exit(1)
})
