import axios from "axios";
class User {
  constructor() {}

  async createUser(user) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/users/auth`;
      const data = await axios.post(url, user);
      console.log(data);
    } catch (error) {
      console.dir(error);
    }
  }

  async login(user) {
    console.log(user);
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/users/login`;
      const userLogin = await axios.post(url, user);
      console.log(userLogin);
    } catch (error) {
      console.dir(error);
    }
  }

  async logout() {
    try {
      console.log(2)
      const url = `${process.env.VUE_APP_SERVER_URL}/users/logout`;
      const userLogout = await axios.get(url);
      console.log(userLogout);
    } catch (error) {
      console.dir(error);
    }
  }

}

export default new User();
