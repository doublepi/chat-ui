<style src="./ReplyMessage.scss" scoped lang="scss"></style>
<script src="./ReplyMessage.js"></script>

<template>
  <div
    class="sc-reply-message"
    :style="{
      backgroundColor: `${colors.bg}`,
      color: `${colors.text}`
    }"
  >
    {{ message.data.text }}
  </div>
</template>
