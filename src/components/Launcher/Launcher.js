import ChatWindow from '../ChatWindow/ChatWindow.vue'

export default {
  components: {
    ChatWindow
  },
  props: {
    icons: {
      type: Object,
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    participants: {
      type: Array,
      required: true
    },
    sender: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: () => ''
    },
    titleImageUrl: {
      type: String,
      default: () => ''
    },
    onMessageWasSent: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Write a message...'
    },
    maxlength: {
      type: Number,
      default: 200
    },
    showTypingIndicator: {
      type: String,
      default: () => ''
    },
    colors: {
      type: Object,
      default: function () {
        return {
          header: {
            bg: '#ffffff',
            text: '#0a0a0a'
          },
          messageList: {
            bg: '#ffffff',
            quickActions: '#5F6368'
          },
          sentMessage: {
            bg: '#f4f7f9',
            text: '#282828',
            author: '#282828'
          },
          replyMessage: {
            bg: '#ffffff',
            text: '#888888',
          },
          receivedMessage: {
            bg: '#f4f7f9',
            text: '#282828',
            author: '#282828'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }
      }
    },
    alwaysScrollToBottom: {
      type: Boolean,
      default: () => false
    },
    quickActions: {
      type: Array
    },
  },
  computed: {
    chatWindowTitle() {
      if (this.title !== '') {
        return this.title
      }
      if (this.participants.length === 0) {
        return 'You'
      } else if (this.participants.length > 1) {
        return 'You, ' + this.participants[0].name + ' & others'
      } else {
        return 'You & ' + this.participants[0].name
      }
    }
  },
  methods: {
    openAndFocus() {
      this.open()
      this.$root.$emit('focusUserInput')
    }
  }
}
