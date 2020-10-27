<style src="./MessageList.scss" scoped lang="scss"></style>
<script src="./MessageList.js"></script>

<template>
  <div
    ref="scrollList"
    class="sc-message-list"
    :style="{backgroundColor: colors.messageList.bg}"
    @scroll="handleScroll"
  >
    <button
      class='bt-scroll-down'
      ref="btScrollDown"
      @click="_scrollDown"
      :style="{
        backgroundColor: colors.header.bg
      }"
    >
      <svg class='scroll-down-icon' viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.41 0.839844L6 5.41984L10.59 0.839844L12 2.24984L6 8.24984L0 2.24984L1.41 0.839844Z" :fill="colors.header.text"/>
      </svg>
    </button>
    <Message
      v-for="(message, idx) in messageList"
      :key="idx"
      :upvoting="upvoting"
      :message="message"
      :user="profile(message.author)"
      :colors="colors"
      :copy="copy"
      :quickActions="quickActions"
      :reply="replyMessage(message.reply)"
      @remove="$emit('remove', message)"
      @upvote="onUpvote"
    >
      <template v-slot:user-avatar="scopedProps">
        <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message"> </slot>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <slot
          name="text-message-body"
          :message="scopedProps.message"
          :messageText="scopedProps.messageText"
          :colors="scopedProps.colors"
          :copy="scopedProps.copy"
          :me="scopedProps.me"
        >
        </slot>
      </template>
      <template v-slot:system-message-body="scopedProps">
        <slot name="system-message-body" :message="scopedProps.message"> </slot>
      </template>
      <template v-slot:text-message-toolbox="scopedProps">
        <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me">
        </slot>
      </template>
    </Message>
    <Message
      v-show="showTypingIndicator !== ''"
      :message="{author: showTypingIndicator, type: 'typing'}"
      :user="profile(showTypingIndicator)"
      :colors="colors"
      :copy="copy"
    />
  </div>
</template>
