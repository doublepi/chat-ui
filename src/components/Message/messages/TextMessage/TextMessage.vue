<style src="./TextMessage.scss" scoped lang="scss"></style>
<script src="./TextMessage.js"></script>

<template>
  <div class="sc-message--text">
    <div class="sc-message--box" :style="messageColors">
      <template>
        <Actions
          v-if="actionOpen && !upvoting"
          class="sc-message--actions"
          :actions="actions"
          @action="toggleAction"
        >
        </Actions>
        <button
          v-if="me && !upvoting"
          class="sc-message--more"
          @click="toggleAction"
          :style="{color: messageColors.color}"
        >
        </button>
      </template>
      <slot :message="message" :messageText="messageText" :messageColors="messageColors" :me="me">
        <p
          class="sc-message--text-author"
          :style="messageColors.author"
        > {{ message.author }}</p>
        <ReplyMessage
          v-if="reply"
          :message="reply"
          :colors="colors.replyMessage"
        />
        <p class="sc-message--text-content" v-html="messageText"></p>
        <p v-if="message.data.meta" class="sc-message--meta" :style="{color: messageColors.color}">
          {{ message.data.meta }}
        </p>
      </slot>
    </div>
    <QuickActions
      v-if="!upvoting"
      :message="message"
      :colors="colors"
      :copy="copy"
      :actions="quickActions"
    />
  </div>
</template>
