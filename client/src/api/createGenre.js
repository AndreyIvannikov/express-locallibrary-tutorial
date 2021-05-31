import axios from "axios";
const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genre/create`;
export default async function createGenre(genre) {
  console.log(genre, url);
  try {
    const data = await axios.post(url, genre);
    console.log(data);
  } catch (err) {
    console.dir(err);
  }
}
