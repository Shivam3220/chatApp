import { query } from "../../db/dbConn";

export default async function handler(req, res) {
  try {
    const querySql =
      "SELECT * FROM users where name != ?";
    const valueParams = ['shivam'];
    const data = await query({ query: querySql, values: valueParams });

    res.status(200).json({ data: data });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}