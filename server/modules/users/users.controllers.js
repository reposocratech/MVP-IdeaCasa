import { hashString } from "../../helpers/hashUtils.js";
import usersDal from "./users.dal.js";

class UserController {
  register = async(req, res) => {
    try {
      const {name, email, password} = req.body;
      const result = await usersDal.findUserByEmail(email);
      console.log(result);

      if (result.length !== 0){
        throw {
          isLogged: true,
          message: "Usuario ya existe"
        }
      }

      const hashedPassword = await hashString(password);
      const data = [name, email, hashedPassword];
      await usersDal.register(data);
      
      res.status(200).json("Admin creado");
    } catch (error) {
      if (error.isLogged){
        res.status(401).json(error.message);
      } else {
        console.log(error);
        res.status(500).json(error.message);
      }
    }
  }
}

export default new UserController;