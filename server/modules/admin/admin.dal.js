import executeQuery from "../../config/db.js";

class AdminDal {
  findUserByEmail = async(email) => {
    try {
      let sql = 'SELECT user_id FROM user WHERE email = ?';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw {message: "Error en base de datos"};
    }
  }
}

export default new AdminDal;