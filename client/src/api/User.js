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
      await axios.post(url, user);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new User();
