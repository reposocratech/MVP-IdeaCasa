import executeQuery from "../../config/db.js";

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

  register = async(data) => {
    try {
      let sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
      await executeQuery(sql, data);
    } catch (error) {
      throw {message: "Error en base de datos"};
    }
  }
}

export default new UserDal;