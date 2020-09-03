<style src="./SystemMessage.scss" scoped lang="scss"></style>
<script src="./SystemMessage.js"></script>

<template>
  <div class="sc-message--system" :style="{
      color: colors.receivedMessage.text,
      backgroundColor: colors.receivedMessage.bg}"
    >
    <slot :message="data">
      {{ data.text }}
      <p v-if="data.meta" class="sc-message--meta" :style="{color: colors.receivedMessage.text}">
        {{ data.meta }}
      </p>
    </slot>
  </div>
</template>
