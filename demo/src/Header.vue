<template>
  <div class="demo-header" :style="{color: linkColor}">
    <div class="demo-header--title">chat-ui</div>
  </div>
</template>

<script>
export default {
  props: {
    colors: {
      type: Object,
      required: true
    },
    chosenColor: {
      type: String,
      required: true
    }
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark' ? this.colors.sentMessage.text : this.colors.launcher.bg
    }
  }
}
</script>

<style scoped>
.demo-header {
  width: 100%;
  color: #4e8cff;
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  margin: auto;
  padding: 40px 0px;
}

.demo-header--title {
  font-size: 24px;
  font-weight: 600;
}
</style>
