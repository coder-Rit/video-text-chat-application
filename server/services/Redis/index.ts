
import Redis from "ioredis";

// @ts-ignore
export const Pub = new Redis({
  host: process.env.HOST_REDIS,
  port: process.env.PORT_REDIS,
  username: process.env.USERNAME_REDIS,
  password: process.env.PASSWORD_REDIS,
  tls: {
    rejectUnauthorized: false
  }
})

// @ts-ignore
export const Sub = new Redis({
  host: process.env.HOST_REDIS,
  port: process.env.PORT_REDIS,
  username: process.env.USERNAME_REDIS,
  password: process.env.PASSWORD_REDIS,
  tls: {
    rejectUnauthorized: false
  }
})