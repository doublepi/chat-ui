<style src="./QuickActions.scss" scoped lang="scss"></style>
<script src="./QuickActions.js"></script>

<template>
  <div class="sc-quick-actions">
    <button
      v-for="(action, i) in listActions"
      :key="`action-${i}`"
      @click.prevent="onClick(action)"
      :class="['sc-quick-actions--action', action.onClick ? '' : 'sc-quick-actions--action-noclick']"
      :style="{ color: colors.messageList.quickActions }"
    >
      {{ action.label }}
    </button>
  </div>
</template>
