import { useState } from "react";
import { createContext } from "react";
import { fetchData } from "../helpers/axiosHelper";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tokenLS = localStorage.getItem("token");

    if (tokenLS){
      const fetching = async() => {
        try {
          const res = await fetchData('/users/userById', 'get', null, tokenLS);

          setUser(res.data.user);
          setToken(tokenLS);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetching();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async(loginData) => {
    try {
      let res = await fetchData('/users/login', 'post', loginData);
      //console.log(res);
      let tokenBack = res.data.token;
      console.log(tokenBack);

      const responseUser = await fetchData('/users/userById', 'get', null, tokenBack);
      console.log("111111111", responseUser);

      localStorage.setItem("token", tokenBack);
      setUser(responseUser.data.user);
      setToken(tokenBack);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser();
    setToken();
  }
  
  
  //console.log(user);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      token,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}