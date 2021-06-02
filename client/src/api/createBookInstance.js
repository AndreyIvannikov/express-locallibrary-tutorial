import axios from "axios";
const url = `${process.env.VUE_APP_SERVER_URL}/catalog/bookinstance/create`;

export default async function createBook(book) {
  console.log(book);
  await axios.post(url, book);
}
