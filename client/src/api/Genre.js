import axios from "axios";
import router from "../router/index";

class Genre {
  async getGenreDetail(id) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genre/${id}`;
      const { data } = await axios(url);
      return data;
    } catch (e) {
      console.dir(e);
    }
  }

  async createGenre(genre) {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genre/create`;
    try {
      await axios.post(url, genre);
      return null;
    } catch ({ response }) {
      return response.data.errors[0].msg;
    }
  }

  async deleteGenre(id) {
    console.log(24315);
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genre/${id}/delete`;
    try {
      await axios.post(url, {
        id,
      });
      router.push({ name: "AuthorList" });
    } catch ({ response }) {
      console.log(response.data.errors[0].msg);
      return response.data.errors[0].msg;
    }
  }

  async getGenresList() {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genres`;
      const { data } = await axios.get(url);
      return data.genreList;
    } catch (err) {
      console.log(err);
    }
  }

  async genreUpdate(newGenre, id) {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genre/${id}/update`;
      const { data } = await axios.post(url, newGenre);
      router.push({ name: "GenreList" });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Genre();
