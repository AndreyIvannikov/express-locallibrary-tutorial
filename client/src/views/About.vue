<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
    };
  },
  methods: {
    addElement() {
      this.name = 2;
    },
  },
};
</script>
