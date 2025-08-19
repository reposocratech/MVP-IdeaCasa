import { hashString } from "../../helpers/hashUtils.js";
import usersDal from "./users.dal.js";

class UserController {
  adminRegister = async(req, res) => {
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
      const data = [name, email, hashedPassword, 1];
      await usersDal.adminRegister(data);
      
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

  register = async(req, res) => {
    try {
      //console.log(req.body);
      const { name, lastname, email, phone_number, dni, address, agency, password } = req.body;
      const result = await usersDal.findUserByEmail(email);
      //console.log(result);

      if (result.length !== 0){
        throw {
          isLogged: true,
          message: "Usuario ya existe"
        }
      }

      const hashedPassword = await hashString(password);
      const data = [name, lastname, email, phone_number, dni, address, agency, hashedPassword];
      await usersDal.register(data);

      res.status(200).json("Usuario creado");
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
}

export default new UserController;