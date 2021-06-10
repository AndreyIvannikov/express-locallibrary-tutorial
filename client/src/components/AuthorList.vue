<template>
  <h3 v-if="authorList.length === 0">Список авторов пуст</h3>
  <div class="" v-else>
    <h1 class="mb-7 text-3xl">Список авторов</h1>
    <ul>
      <li v-for="author in authorList" :key="author._id">
        <strong>
          <router-link :to="`/catalog/author/${author._id}`">
            {{ author.first_name }}</router-link
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
    };
  },
  async mounted() {
    this.authorList = await Author.getAuthorsList();
  },
  methods: {
    dateConfig(date) {
      return new Date(date).toLocaleDateString("ru");
    },
  },
};
</script>

<style lang="scss" scoped></style>
