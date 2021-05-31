import axios from "axios";
export default async function bookListInstanceInfo(id) {
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/bookinstance/${id}`;
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}
