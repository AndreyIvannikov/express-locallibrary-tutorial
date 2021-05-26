<template>
  <h3 v-if="genreInfo.length === 0">Список жанров пуст</h3>
  <div v-else class="">
    <h1 class="text-6xl">{{ genreInfo.genre.name }}</h1>
    <ul>
      <li
        v-for="genre in genreInfo.genreBooks"
        :key="genre._id"
        class="
          mb-10
          border-b-2 border-fuchsia-600
          pb-5
          flex flex-col
          items-center
        "
      >
        <h4 class="text-3xl mb-4">{{ genre.title }}</h4>
        <p class="w-2/5">{{ genre.summary }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      genreInfo: [],
    };
  },
  async mounted() {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/genre/${this.$route.params.id}`;
      const { data } = await axios(url);
      this.genreInfo = await data;
      console.log(this.genreInfo);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped></style>
