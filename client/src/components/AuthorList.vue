<template>
  <h1 v-if="loading">Загрузка...</h1>
  <p v-else-if="authorList.authors.length === 0">{{ authorList.title }}</p>
  <div class="" v-else>
    <h1 class="mb-7 text-3xl">Список авторов</h1>
    <ul>
      <li v-for="author in authorList.authors" :key="author._id">
        <strong>
          <router-link :to="`/catalog/author/${author._id}`">
            {{ author.first_name }} {{ author.family_name }}</router-link
          >
        </strong>

        <span v-if="author.date_of_birth">
          || ({{ dateConfig(author.date_of_birth) }} -
          {{ author.date_of_death ? dateConfig(author.date_of_death) : "" }})
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Author from "../api/Author";
export default {
  data() {
    return {
      authorList: [],
      loading: true,
    };
  },
  async mounted() {
    this.authorList = await Author.getAuthorsList();
    this.loading = await false;
  },
  methods: {
    dateConfig(date) {
      return new Date(date).toLocaleDateString("ru");
    },
  },
};
</script>

<style lang="scss" scoped></style>
