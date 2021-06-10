<template>
  <h1 v-if="!authorInfo">Авторов пока нет...</h1>
  <div v-else class="mb-10">
    <div class="mb-5">
      <h1 class="text-6xl">Author: {{ authorInfo.author.first_name }}</h1>
      <p>
        {{
          new Date(authorInfo.author.date_of_birth).toLocaleDateString("ru-RU")
        }}
      </p>
    </div>

    <ul class="author__content flex flex-col items-center">
      <li
        v-for="books in authorInfo.authorBooks"
        :key="books._id"
        class="
          mb-10
          border-b-2 border-fuchsia-600
          pb-5
          flex flex-col
          items-center
        "
      >
        <h4 class="text-3xl mb-4">{{ books.title }}</h4>
        <p class="w-2/5">{{ books.summary }}</p>
      </li>
    </ul>
    <router-link
      class="underline text-blue-500"
      :to="`/catalog/author/${$route.params.id}/delete`"
      >Delete author</router-link
    >
    <router-link
      class="underline text-blue-500"
      :to="`/catalog/author/${$route.params.id}/update`"
      >Update author</router-link
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      authorInfo: null,
    };
  },
  async mounted() {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/${this.$route.params.id}`;
      const { data } = await axios(url);
      this.authorInfo = await data;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
