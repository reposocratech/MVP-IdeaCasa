import { compareHash, hashString } from "../../helpers/hashUtils.js";
import usersDal from "./users.dal.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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

  login = async(req, res) => {
    try {
      const { email, password } = req.body;
      const result = await usersDal.findUserByEmailLogin(email);

      if (result.length === 0){
        res.status(401).json({message: "El usuario no existe"})
      }else {
        let match = await compareHash(password, result[0].password);

        if (!match){
          res.status(401).json({message: "La contraseña no es válida"})
        }else {
          const token = jwt.sign(
              {user_id: result[0].user_id},
              process.env.TOKEN_KEY,
              {expiresIn:"2d"}
          )
          res.status(200).json({token});
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error de servidor"});
    }
  }

  userById = async(req, res) => {
    try {
      const { user_id } = req;
      console.log(req.headers);
      const result = await usersDal.userById(user_id);
      
      if (result.length === 0){
        res.status(401).json({ message: "No autorizado"});
      } else {
        res.status(200).json({user:result[0]});
      }
    } catch (error) {
      res.status(500).json({ message: "Error de servidor"});
    }
  }
}

export default new UserController;