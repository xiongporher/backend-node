import { pool } from "../config/db.conf.js";


const dbExecute = async (sql, params = []) => {
  let con;

  try {
      con = await pool.promise().getConnection();
      const [results] = await con.execute(sql, params);
      return results;
  } catch (error) {
      console.log("Database error: ", error);
      throw error;
  } finally {
    if (con) con.release();
  }
}

export default dbExecute;