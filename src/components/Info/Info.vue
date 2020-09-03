<style src="./Info.scss" scoped lang="scss"></style>
<script src="./Info.js"></script>

<template>
  <div class="user-list" :style="{background: colors.messageList.bg}">
    <slot name="info" :participants="participants">
      <div v-for="user in participants" :key="user.id" class="info-user">
        <div style="text-align: center;">
          <img :src="user.imageUrl" class="img-msg" />
        </div>
        <div class="user-element" :style="{color: colors.sentMessage.text}">
          {{ user.name }}
        </div>
      </div>
    </slot>
  </div>
</template>
