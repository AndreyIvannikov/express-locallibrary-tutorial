import axios from "axios";

export default async function bookList() {
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/books`;
    const { data } = await axios.get(url);
    return data.book_list;
  } catch (err) {
    console.log(err);
  }
}
