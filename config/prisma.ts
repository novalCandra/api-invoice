import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  host: "bfhsondp87nnnbyedyn5-mysql.services.clever-cloud.com",
  port: 3306,
  user: "upjobnsqvmqdk6nn",
  password: "4bu1ARzOZ5Af5WMRYGal",
  database: "bfhsondp87nnnbyedyn5",
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
