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
          v-tooltip="authorName"
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
        <TypingMessage v-else-if="message.type === 'typing'" :colors="colors" />
        <SystemMessage
          v-else-if="message.type === 'system'"
          :data="message.data"
          :colors="colors"
        >
          <slot name="system-message-body" :message="message.data"> </slot>
        </SystemMessage>

      </div>

    </div>
  </div>
</template>
