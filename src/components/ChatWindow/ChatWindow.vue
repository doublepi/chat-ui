<style src="./ChatWindow.scss" scoped lang="scss"></style>
<script src="./ChatWindow.js"></script>

<template>
  <div class="sc-chat-window" :class="{opened: true}">
    <Header
      v-if="showHeader"
      :isInfo="showInfo"
      :title="title"
      :image-url="titleImageUrl"
      :colors="colors"
      :actions="actions"
      @back="onClickBack"
    >
      <template v-slot:header="scopedProps">
        <slot name="header" :onClick="scopedProps.onClick" :toggleAction="scopedProps.toggleAction"> </slot>
      </template>
    </Header>
    <Info v-if="showInfo" :colors="colors" :participants="users">
      <template v-slot:info="scopedProps">
        <slot name="info" :participants="scopedProps.participants"></slot>
      </template>
    </Info>
    <MessageList
      ref="messageList"
      v-if="!showInfo"
      :upvoting="upvoting"
      :messages="messages"
      :participants="users"
      :show-typing-indicator="showTypingIndicator"
      :colors="colors"
      :copy="copy"
      :quickActions="quickActions"
      :always-scroll-to-bottom="alwaysScrollToBottom"
      @scrollToTop="$emit('scrollToTop')"
      @remove="$emit('remove', $event)"
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
          :copy="scopedProps.copy"
          :colors="scopedProps.colors"
          :me="scopedProps.me"
        >
        </slot>
      </template>
      <template v-slot:system-message-body="scopedProps">
        <slot name="system-message-body" :message="scopedProps.message"> </slot>
      </template>
    </MessageList>

    <UserInput
      v-if="!showInfo"
      :on-submit="onInputUser"
      :suggestions="getSuggestions()"
      :copy="copy"
      :enable-new-line="enableNewLine"
      :colors="colors"
      :maxlength="maxlength"
      @onType="$emit('onType')"
      @edit="$emit('edit', $event)"
      @reply="$emit('reply', $event)"
    />
  </div>
</template>
