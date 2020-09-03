<style src="./TextMessage.scss" scoped lang="scss"></style>
<script src="./TextMessage.js"></script>

<template>
  <div class="sc-message--text" :style="messageColors">
    <template>
      <Actions
        v-if="actionOpen"
        class="sc-message--actions"
        :actions="actions"
        @action="toggleAction"
      >
      </Actions>
      <button
        v-if="me"
        class="sc-message--more"
        @click="toggleAction"
        :style="{color: messageColors.color}"
      >
      </button>
    </template>
    <slot :message="message" :messageText="messageText" :messageColors="messageColors" :me="me">
      <p class="sc-message--text-author"> {{ message.author }}</p>
      <ReplyMessage
        v-if="reply"
        :message="reply"
        :colors="colors.replyMessage"
      />
      <p class="sc-message--text-content" v-html="messageText"></p>
      <p v-if="message.data.meta" class="sc-message--meta" :style="{color: messageColors.color}">
        {{ message.data.meta }}
      </p>
      <QuickActions
        :message="message"
        :actions="quickActions"
      />
    </slot>
  </div>
</template>
