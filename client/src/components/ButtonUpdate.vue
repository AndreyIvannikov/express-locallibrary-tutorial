<template>
  <router-link
    class="btn btn-blue text-blue-500 w-full text-center"
    :to="linkUpdate"
  >
    {{ buttonUpdateText }}</router-link
  >
</template>

<script>
export default {
  props: {
    buttonUpdateText: {
      type: String,
      default: "Update",
    },
    linkUpdate: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
