<style src="./Message.scss" lang="scss"></style>
<script src="./Message.js"></script>

<template>
  <div class="sc-message" :id="message.id">
    <div
      class="sc-message--content"
      :class="{
        sent: message.author === senderId,
        received: message.author !== senderId && message.type !== 'system',
        system: message.type === 'system'
      }"
    >
      <slot name="user-avatar" :message="message" :user="user">
        <div
          v-if="message.type !== 'system' && authorName"
          :title="authorName"
          class="sc-message--avatar"
          :style="{
            backgroundImage: `url(${chatImageUrl})`
          }"
        ></div>
      </slot>

      <div class="sc-message--message-wrapper">

        <TextMessage
          v-if="message.type === 'text'"
          :message="message"
          :reply="reply"
          :colors="colors"
          :upvoting="upvoting"
          :copy="copy"
          :quickActions="quickActions"
          @remove="$emit('remove')"
        >
          <template v-slot:default="scopedProps">
            <slot
              name="text-message-body"
              :message="scopedProps.message"
              :messageText="scopedProps.messageText"
              :me="scopedProps.me"
            >
            </slot>
          </template>
        </TextMessage>
        <TypingMessage v-else-if="message.type === 'typing'" :colors="colors" :copy="copy" />
        <SystemMessage
          v-else-if="message.type === 'system'"
          :data="message.data"
          :colors="colors"
          :copy="copy"
        >
          <slot name="system-message-body" :message="message.data"> </slot>
        </SystemMessage>

      </div>

      <slot name="upvote-button" :message="message">
        <div
          v-if="message.type !== 'system' && upvoting"
          :title="authorName"
          :class="['sc-message--upvote', message.upvoted ? 'upvoted' : '']"
        >
          <button
            class="sc-message--upvote-button"
            @click="upvote"
            :style="{
              backgroundColor: colors.upvote.buttonBackground
            }"
          >
            <svg viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.942488 6L4.01059 2.2915L7.07869 6L8.02118 4.8583L4.01059 0L0 4.8583L0.942488 6Z" fill="white"/>
            </svg>
          </button>
          <p>
            {{ message.upvotes }}
          </p>
        </div>
      </slot>

    </div>
  </div>
</template>
