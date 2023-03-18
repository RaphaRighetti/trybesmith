import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';

class Model {
  constructor(public tableName: string) { }
  
  getAll = async () => {
    const [result] = await connection.execute(
      `SELECT * FROM Trybesmith.${this.tableName};`,
    );
    return result;
  };

  getById = async (id: number | string) => {
    const [[result]] = await connection.execute<RowDataPacket[][]>(
      `SELECT * FROM Trybesmith.${this.tableName} WHERE id = ?;`,
      [Number(id)],
    );
    return result;
  };

  insertInto = async (newInstance: Record<string, unknown>) => {
    const proprieties: string[] = Object.keys(newInstance);
    const values = Object.values(newInstance);
    const [{ insertId }] = await connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.${this.tableName} (${proprieties.join(', ')})
        VALUES (${proprieties.map(() => '?').join(', ')});`,
      [...values],
    );

    const response = { id: insertId, ...newInstance };

    return response;
  };

  deleteById = async (id: number | string): Promise<void> => {
    await connection.execute(
      `DELETE FROM Trybesmith.${this.tableName} WHERE id = ?`,
      [id],
    );
  };
}

export default Model;