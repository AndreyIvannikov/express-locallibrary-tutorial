import axios from "axios";
import router from "../router/index";

class Book {
  async createBook(book) {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/create`;
    await axios.post(url, book);
  }

  async getBookList() {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/books`;
      const { data } = await axios.get(url);
      return data.book_list;
    } catch (err) {
      console.log(err);
    }
  }

  async getBookDetail(id) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${id}`;
      const { data } = await axios.get(url);
      return data;
    } catch (e) {
      console.dir(e);
    }
  }

  async getBookDelete(id) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${id}/delete`;
      const data = await axios.post(url, {
        id: this.$route.params.id,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async updatedBook(id, book) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${id}/update`;
      await axios.post(url, book);
      router.push({ name: "AuthorList" });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Book();
