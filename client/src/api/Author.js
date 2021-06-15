import axios from "axios";
import router from "../router/index";

class Author {
  async getAuthorDetail(id) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/${id}`;
      const { data } = await axios(url);
      return data;
    } catch (e) {
      if (e.response.status === 404) {
        router.push({ name: "notFound" });
      }
    }
  }

  async createAuthor(author) {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/create`;
    try {
      const response = await axios.post(url, author);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAuthor(id) {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/${id}/delete`;
    try {
      const data = await axios.post(url, { id });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAuthorsList() {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/authors`;
      const { data } = await axios.get(url);
      console.log(data);
      // data.authors.length === 0
      // ? data
      // : data.authors.sort((a, b) => {
      //     const nameA = a.first_name;
      //     const nameB = b.first_name;
      //     return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      //   });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async updatedAuthor(id, author) {
    console.log(author);
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/${id}/update`;
      const data = await axios.post(url, author);
      console.log(data);
      router.push({ name: "Home" });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Author();
