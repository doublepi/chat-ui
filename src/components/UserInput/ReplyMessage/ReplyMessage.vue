<style src="./ReplyMessage.scss" scoped lang="scss"></style>
<script src="./ReplyMessage.js"></script>

<template>
  <div class="sc-reply-row"
    :style="{background: colors.userInput.bg}"
  >
    <div class="sc-user-input--button">
      <UserInputButton
        :color="colors.userInput.text"
        tooltip="cancel"
        @click.native.prevent="cancelReply"
      >
        <IconCross />
      </UserInputButton>
    </div>
    <div
      class="sc-reply-element"
      :style="{
        backgroundColor: `${colors.userInput.bg}`,
        color: `${colors.replyMessage.text}`
      }"
    >
      <div
        :style="{
          backgroundColor: `${colors.replyMessage.bg}`,
          color: `${colors.replyMessage.text}`
        }"
        class="sc-reply-element-wrapper"
      >
        {{ message.data.text }}
      </div>
    </div>
  </div>
</template>
