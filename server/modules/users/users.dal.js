import executeQuery, { dbPool } from "../../config/db.js";

class UserDal {
  findUserByEmail = async(email) => {
    try {
      let sql = 'SELECT user_id FROM user WHERE email = ?';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw {message: "Error en base de datos"};
    }
  }

  //queda pendiente de hablar con profes
  adminRegister = async(data) => {
    try {
      let sql = 'INSERT INTO user (name, email, password, type) VALUES (?, ?, ?, ?)';
      await executeQuery(sql, data);
    } catch (error) {
      throw {message: "Error en base de datos"};
    }
  }

  register = async(data) => {
    const [ name, lastname, email, phone_number, dni, address, agency, password ] = data;
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let sqlMax = 'SELECT MAX(user_id) AS lastId FROM user';
      let resultMax = await connection.query(sqlMax);
      const nextUserId = (resultMax[0][0].lastId || 0) + 1;

      let sql = 'INSERT INTO user (user_id, name, lastname, email, phone_number, dni, address, agency, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let values = [nextUserId, name, lastname, email, phone_number, dni, address, agency, password];
      await connection.query(sql, values);

      await connection.commit();
      return nextUserId;
    } catch (error) {
      await connection.rollback();
      console.log(error);
      throw {message: "Error en base de datos"};
    } finally {
      connection.release();
    }
  }
}

export default new UserDal;