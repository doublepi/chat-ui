<style src="./Launcher.scss" scoped lang="scss"></style>
<script src="./Launcher.js"></script>

<template>
  <div
    class="sc-launcher"
  >
    <ChatWindow
      ref="chat"
      :message-list="messageList"
      :sender="sender"
      :quickActions="quickActions"
      :upvoting="upvoting"
      :on-user-input-submit="onMessageWasSent"
      :participants="participants"
      :title="chatWindowTitle"
      :title-image-url="titleImageUrl"
      :maxlength="maxlength"
      :show-header="showHeader"
      :show-typing-indicator="showTypingIndicator"
      :colors="colors"
      :enable-new-line="enableNewLine"
      :copy="copy"
      :always-scroll-to-bottom="alwaysScrollToBottom"
      @scrollToTop="$emit('scrollToTop')"
      @onType="$emit('onType')"
      @edit="$emit('edit', $event)"
      @remove="$emit('remove', $event)"
      @upvote="onUpvote"
    >
      <template v-slot:header="scopedProps">
        <slot name="header" :onClick="scopedProps.onClick" :toggleAction="scopedProps.toggleAction"> </slot>
      </template>
      <template v-slot:user-avatar="scopedProps">
        <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message"> </slot>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <slot
          name="text-message-body"
          :message="scopedProps.message"
          :messageText="scopedProps.messageText"
          :colors="scopedProps.colors"
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
    </ChatWindow>
  </div>
</template>
