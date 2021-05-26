import axios from "axios";

export default async function bookList() {
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/authors`;
    const { data } = await axios.get(url);
    return data.authorList;
  } catch (err) {
    console.log(err);
  }
}
