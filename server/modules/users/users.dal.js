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

  findUserByEmailLogin = async(email) => {
    try {
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND user_is_deleted = 0';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw {message: "Error en base de datos"};
    }
  }

  adminRegister = async(data) => {
    try {
      let sql = 'INSERT INTO user (name, email, password, type) VALUES (?, ?, ?, ?)';
      await executeQuery(sql, data);
    } catch (error) {
      throw {message: "Error en base de datos"};
    }
  }

  register = async(data) => {
    try {
      let sql = 'INSERT INTO user (name, lastname, email, phone_number, dni, address, agency, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      await executeQuery(sql, data);
    } catch (error) {
      console.log(error);
      throw {message: "Error en base de datos"};
    }
  }

  userById = async(id) => {
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0';
      const result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      console.log(error);
      throw {message: "Error en base de datos"};
    }
  }
}

export default new UserDal;