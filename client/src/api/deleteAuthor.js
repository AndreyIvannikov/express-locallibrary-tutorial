import axios from "axios";

export default async function getAuthorAndBooks(id) {
  const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/${id}/delete`;
  try {
    const data = await axios.post(url);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
