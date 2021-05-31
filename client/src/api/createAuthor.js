import axios from "axios";
const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/create`;

export default async function createAuthor(author) {
  console.log(author);
  try {
    const data = await axios.post(url, author);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
