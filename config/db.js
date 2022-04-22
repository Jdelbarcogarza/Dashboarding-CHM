import { createPool } from "mysql2/promise";

const connection = createPool({
  host: "localhost",
  user: "root",
  password: "pato2808",
  database: "chm_database",
  port: 3306,
});

export { connection };
