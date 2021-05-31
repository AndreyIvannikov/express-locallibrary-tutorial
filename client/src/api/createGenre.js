import axios from "axios";
const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genre/create`;
export default async function createGenre(genre) {
  try {
    await axios.post(url, genre);
    return null;
  } catch ({ response }) {
    return response.data.errors[0].msg;
  }
}
