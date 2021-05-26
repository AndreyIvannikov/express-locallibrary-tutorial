import axios from "axios";
export default async function api() {
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog`;
    const { data } = await axios.get(url);
    return data.data;
  } catch (err) {
    return err;
  }
}
