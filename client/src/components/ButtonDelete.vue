<template>
  <router-link
    class="btn btn-blue w-full text-blue-500 mb-3"
    :to="linkDelete"
    >{{ buttonDeleteText }}</router-link
  >
</template>

<script>
export default {
  props: {
    buttonDeleteText: {
      type: String,
      default: "Delete",
    },
    linkDelete: {
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
