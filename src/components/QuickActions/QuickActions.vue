<style src="./QuickActions.scss" scoped lang="scss"></style>
<script src="./QuickActions.js"></script>

<template>
  <div class="sc-quick-actions">
    <button
      v-for="(action, i) in actions"
      :key="`action-${i}`"
      @click.prevent="onClick(action)"
      class="sc-quick-actions--action"
    >
      {{ action.label }}
    </button>
  </div>
</template>
