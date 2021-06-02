import axios from "axios";
const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/create`;

export default async function createBook(book) {
  await axios.post(url, book);
}
