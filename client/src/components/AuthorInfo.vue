<template>
  <h1 v-if="!authorInfo">Авторов пока нет...</h1>
  <div v-else class="mb-10 flex flex-col justify-center items-center">
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
    <div class="flex flex-col items-center w-60">
      <ButtonDelete
        :linkDelete="`/catalog/author/${$route.params.id}/delete`"
        buttonDeleteText="Delete author"
      />
      <ButtonUpdate
        :linkUpdate="`/catalog/author/${$route.params.id}/update`"
        buttonUpdateText="Update author"
      />
    </div>
  </div>
</template>

<script>
import Author from "../api/Author";
import ButtonDelete from "../components/ButtonDelete.vue";
import ButtonUpdate from "../components/ButtonUpdate.vue";
export default {
  components: { ButtonDelete, ButtonUpdate },
  data() {
    return {
      authorInfo: null,
    };
  },
  async mounted() {
    try {
      this.authorInfo = await Author.getAuthorDetail(this.$route.params.id);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
