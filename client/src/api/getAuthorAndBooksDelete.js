import axios from "axios";

export default async function getAuthorAndBooks(id) {
  const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/${id}/delete`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}

