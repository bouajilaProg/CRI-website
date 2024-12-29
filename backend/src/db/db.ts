// db.ts
import { Pool, QueryResult } from "pg";

// Define the database configuration type
interface PoolConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

// Create a new pool instance
const poolConfig: PoolConfig = {
  user: "postgres",
  host: "localhost",
  database: "CRI",
  password: "postgres",
  port: 5432,
};

const pool = new Pool(poolConfig);

// Function to execute a query
const sqlRun = async (
  text: string,
  params?: any[],
): Promise<QueryResult<any>> => {
  return pool.query(text, params);
};

// Export the query function
export { sqlRun };
