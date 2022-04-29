import { createPool } from "mysql2/promise";

var dir = __dirname
var pass = ""

if (dir.indexOf("Users\\Pato2808") != -1) {
  pass = "pato2808"
} else if (dir.indexOf("Users\\jdelb") != -1){
  pass = "Pas#35741"
}
else {
  pass = "12345"
}

const connection = createPool({
  host: "localhost",
  user: "root",
  password: "pato2808",
  database: "chm_database",
  port: 3306,
});

export { connection };