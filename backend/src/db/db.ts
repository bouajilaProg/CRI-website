// db.ts
import { Pool, QueryResult } from 'pg';

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
  user: 'postgres',        // Your database username
  host: 'localhost',             // Database host
  database: 'CRI',     // Database name
  password: 'postgres',     // Your database password
  port: 5432,                    // PostgreSQL port (default is 5432)
};

const pool = new Pool(poolConfig);

// Function to execute a query
const sqlRun = async (text: string, params?: any[]): Promise<QueryResult<any>> => {
  return pool.query(text, params);
};

// Export the query function
export { sqlRun };
