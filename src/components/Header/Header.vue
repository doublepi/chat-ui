<style src="./Header.scss" scoped lang="scss"></style>
<script src="./Header.js"></script>

<template>
  <div class="sc-header" :style="{background: colors.header.bg, color: colors.header.text}">
    <slot name="header" :onClick="onClickBack" :toggleAction="toggleAction">
      <div
        v-if="isInfo"
        class="sc-header--back"
      >
        <BackIcon
          :colors="colors"
          @click="onClickBack"
        />
      </div>
      <img v-if="imageUrl && !isInfo" class="sc-header--img" :src="imageUrl" alt="" />
      <p class="sc-header--title">{{ title }}</p>
      <div class="sc-actions">
        <button
          class="sc-header--more"
          @click="toggleAction"
          :style="{
            color: `${colors.header.text}`
          }"
        >
        </button>
        <Actions
          v-if="actions && actionOpen"
          class="sc-actions--list"
          :actions="actions"
          @action="toggleAction"
        />
      </div>
    </slot>
  </div>
</template>
