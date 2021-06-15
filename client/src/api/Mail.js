import axios from "axios";
class Mail {
  constructor() {}

  async sendMail(message) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/sendmessage`;
      await axios.post(url, message);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Mail();
