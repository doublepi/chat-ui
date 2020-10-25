<style src="./UserInput.scss" scoped lang="scss"></style>
<script src="./UserInput.js"></script>

<template>
  <div>
    <ReplyMessage
      v-if="replyMessage"
      :message="replyMessage"
      :colors="colors"
      :copy="copy"
    />
    <Suggestions :suggestions="suggestions" :colors="colors" @sendSuggestion="_submitSuggestion" />
    <div
      v-if="file"
      class="file-container"
      :style="{
        backgroundColor: colors.userInput.bg,
        color: colors.userInput.text
      }"
    >
      <span class="icon-file-message"
        ><img :src="icons.file.img" :alt="icons.file.name" height="15"
      /></span>
      {{ file.name }}
      <span class="delete-file-message" @click="cancelFile()"
        ><img
          :src="icons.closeSvg.img"
          :alt="icons.closeSvg.name"
          height="10"
          title="Remove the file"
      /></span>
    </div>
    <form
      class="sc-user-input"
      :class="{active: inputActive, reply: replyMessage}"
      :style="{background: colors.userInput.bg}"
    >
      <div
        class="sc-user-input--avatar"
        :style="{
          backgroundImage: `url(${chatImageUrl})`
        }"
      ></div>
      <input
        ref="userInput"
        role="button"
        tabIndex="0"
        contentEditable="true"
        :placeholder="copy.placeholder"
        class="sc-user-input--text"
        :style="{color: colors.userInput.text}"
        :maxlength="maxlength"
        @focus="setInputActive(true)"
        @blur="setInputActive(false)"
        @keydown="handleKey"
        @keyup="handleKey"
        @paste="handlePaste"
        @focusUserInput="focusUserInput()"
      ></input>
      <div class="sc-user-input--buttons">
        <div class="sc-user-input--button"></div>
        <div v-if="isEditing" class="sc-user-input--button">
          <UserInputButton
            :label="copy.send"
            :color="colors.userInput.text"
            @click.native.prevent="_editFinish"
          >
            <IconCross />
          </UserInputButton>
        </div>
        <div class="sc-user-input--button">
          <UserInputButton
            v-if="isEditing"
            :label="copy.send"
            :color="colors.userInput.text"
            @click.native.prevent="_editText"
          >
            <IconOk />
          </UserInputButton>
          <UserInputButton
            v-else
            :label="copy.send"
            :color="colors.userInput.text"
            @click.native.prevent="_submitText"
          >
            <IconSend />
          </UserInputButton>
        </div>
      </div>
        <p
          class="sc-user-input--maxlength"
          :style="{ color: colors.messageList.quickActions }"
        >{{ numchars}} / {{ maxlength}}</p>
    </form>
  </div>
</template>
