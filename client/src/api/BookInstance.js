import axios from "axios";
import router from "../router/index";
class BookInstance {
  async getBookInstanceDetail(id) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/bookinstance/${id}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      if (err.response.status === 404) {
        router.push({ name: "notFound" });
      }
    }
  }

  async createBookInstance(book) {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/bookinstance/create`;
    const data = await axios.post(url, book);
    return data;
  }

  async deleteBookInstance() {}

  async getBookInstanceList() {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/bookinstances`;
      const { data } = await axios.get(url);
      return data.bookListInsAll;
    } catch (err) {
      if (err.response.status === 404) {
        router.push({ name: "notFound" });
      }
    }
  }
}

export default new BookInstance();
