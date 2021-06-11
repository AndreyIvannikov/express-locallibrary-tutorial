import axios from "axios";

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

  async deleteGenre() {}

  async getGenresList() {
    console.log(123123);
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genres`;
      const { data } = await axios.get(url);
      return data.genreList;
    } catch (err) {
      console.log(err);
    }
  }

}

export default new Genre();
