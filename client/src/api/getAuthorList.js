import axios from "axios";

export default async function bookList() {
  try {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/authors`;
    const { data } = await axios.get(url);
    return data.authorList.sort((a, b) => {
      const nameA = a.first_name;
      const nameB = b.first_name;
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
  } catch (err) {
    console.log(err);
  }
}
