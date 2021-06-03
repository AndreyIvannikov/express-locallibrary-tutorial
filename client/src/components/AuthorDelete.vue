<template>
  <p v-if="loading">Загрузка...</p>
  <div v-else>
    <h1>
      Удаление автора
      <strong
        >{{ authorName.author.first_name }}
        {{ authorName.author.family_name }}</strong
      >
    </h1>
    <h3 v-if="authorName.book.length > 0">
      Вы не можете удалить автора, сначала удалите книги
    </h3>
    <form v-else @submit.prevent="deleteAuthor">
      <input type="hidden" name="authorId" :value="$route.params.id" />
      <button class="btn btn-blue">Удалить</button>
    </form>
  </div>
</template>

<script>
import getInfoAuthorDelete from "../api/getAuthorAndBooksDelete";
import removeAuthor from "../api/deleteAuthor";
export default {
  data() {
    return {
      loading: true,
      authorName: [],
    };
  },
  async mounted() {
    try {
      this.authorName = await getInfoAuthorDelete(this.$route.params.id);
      console.log(this.authorName);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async deleteAuthor() {
      await removeAuthor(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
