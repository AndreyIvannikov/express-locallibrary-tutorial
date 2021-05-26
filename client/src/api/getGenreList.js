import axios from "axios";

export default async function bookList() {
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genres`;
    const { data } = await axios.get(url);
    console.log(data);
    return data.genreList;
  } catch (err) {
    console.log(err);
  }
}
