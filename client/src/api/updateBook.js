import axios from "axios";
import router from "../router/index";

export default async function bookUpdate(id, book) {
  console.log(book);
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${id}/update`;
    await axios.post(url, book);
    router.push({ name: "Home" });
  } catch (err) {
    console.log(err);
  }
}
