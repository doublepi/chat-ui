<template>
  <div :style="{background: backgroundColor}">
    <Header
      :colors="colors"
    />
    <chat-ui
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :colors="colors"
      :messageList="messageList"
      :onMessageWasSent="onMessageWasSent"
      :participants="participants"
      :showTypingIndicator="showTypingIndicator"
      :sender="sender"
      :titleImageUrl="titleImageUrl"
      :quickActions="quickActions"
      @onType="handleOnType"
      @edit="editMessage"
      @reply="replyMessage"
      @remove="removeMessage"
    >
      <template v-slot:system-message-body="{ message }">
        [System 2]: {{message.text}}
      </template>
    </chat-ui>
    <v-dialog/>
    <TestArea
      :colors="colors"
      :onMessage="sendMessage"
      :onTyping="handleTyping"
    />
  </div>
</template>

<script>
import messageHistory from './messageHistory'
import chatParticipants from './chatProfiles'
import Header from './Header.vue'
import TestArea from './TestArea.vue'
import availableColors from './colors'

export default {
  name: 'app',
  components: {
    Header,
    TestArea
  },
  data() {
    return {
      participants: chatParticipants,
      titleImageUrl:
        'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: messageHistory,
      showTypingIndicator: '',
      colors: availableColors.blue,
      availableColors,
      alwaysScrollToBottom: true,
      userIsTyping: false,
      quickActions: [
        {
          label: "Translate",
          onClick: this.translateMessage,
        },
      ],
      sender: {
        id: 'giuliandrimba',
        name: 'Giulian Drimba',
        imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
      }
    }
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.onMessageWasSent({
          author: 'support',
          type: 'text',
          id: Math.random(),
          data: { text }
        })
      }
    },
    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : ''
    },
    onMessageWasSent(message) {
      this.messageList = [...this.messageList, Object.assign({}, message, {id: Math.random()})]
    },
    handleOnType() {
      this.$root.$emit('onType')
      this.userIsTyping = true
    },
    translateMessage(message) {
      console.log('translate message', message);
    },
    replyMessage(message, replyID){
      console.log("replyMessage");
      const m = this.messageList.find(m => m.id === message.id);
      m.reply = replyID;
    },
    editMessage(message){
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    removeMessage(message){
      if (confirm('Delete?')){
        const m = this.messageList.find(m => m.id === message.id);
        m.type = 'system';
        m.data.text = 'This message has been removed';
      }
    },
    like(id){
      const m = this.messageList.findIndex(m => m.id === id);
      var msg = this.messageList[m];
      msg.liked = !msg.liked;
      this.$set(this.messageList, m, msg);
    }
  },
  computed: {
    linkColor() {
      return this.colors.sentMessage.text;
    },
    backgroundColor() {
      return this.colors.messageList.bg;
    }
  },
  mounted(){
    this.messageList.forEach(x=>x.liked = false);
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Helvetica Neue, Helvetica, sans-serif;
}

.demo-description {
  max-width: 500px;
}

.demo-description img {
  max-width: 500px;
}

.demo-test-area {
  width: 300px;
  box-sizing: border-box;
}

.demo-test-area--text {
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  padding: 0px;
  resize: none;
  font-family: Helvetica Neue, Helvetica, sans-serif;
  background: #fafbfc;
  color: #8da2b5;
  border: 1px solid #dde5ed;
  font-size: 16px;
  padding: 16px 15px 14px;
  margin: 0;
  border-radius: 6px;
  outline: none;
  height: 150px;
  margin-bottom: 10px;
}

.demo-monster-img {
  width: 400px;
  display: block;
  margin: 60px auto;
}

.text-center {
  text-align: center;
}

.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}

.toggle a {
  text-decoration: none;
}
</style>
