import { Connection, createConnection } from "typeorm";

let conn;
const connect = async (): Promise<Connection> => {
  if (!conn) {
    conn = await createConnection();
  }
  return conn;
}

export {
  connect,
}