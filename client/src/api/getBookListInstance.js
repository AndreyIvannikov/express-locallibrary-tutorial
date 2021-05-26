import axios from "axios";
export default async function getBookListInstance() {
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/bookinstances`;
    const { data } = await axios.get(url);
    console.log(data);
    return data.bookListInsAll;
  } catch (err) {
    console.log(err);
  }
}
