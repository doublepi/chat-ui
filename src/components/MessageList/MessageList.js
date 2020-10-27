import Message from '../Message/Message.vue'
import chatIcon from '../../assets/chat-icon.svg'

export default {
  components: {
    Message
  },
  props: {
    participants: {
      type: Array,
      required: true
    },
    messages: {
      type: Array,
      required: true
    },
    showTypingIndicator: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    copy: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    upvoting: {
      type: Boolean,
      required: true
    },
    quickActions: {
      type: Array,
    },
  },
  computed: {
    defaultChatIcon() {
      return chatIcon
    },
    messageList() {
      if (this.upvoting) {
        const sorted = this.messages.sort((a, b) => {
          if (parseInt(a.upvotes, 10) > parseInt(b.upvotes, 10)) {
            return -1;
          }
          if (parseInt(a.upvotes, 10) < parseInt(b.upvotes, 10)) {
            return 1;
          }
          return 0;
        })
        return sorted;
      } else {
        return this.messages;
      }
    }
  },
  mounted() {
    if (this.alwaysScrollToBottom) {
      this.$nextTick(this._scrollDown())
    }
  },
  updated() {
    if (this.alwaysScrollToBottom) {
      if (this.$refs.scrollList.scrollTop >= (this.$refs.scrollList.scrollHeight - this.$refs.scrollList.offsetHeight - 100)) {
        this.$nextTick(this._scrollDown())
      }
    }
  },
  methods: {
    _scrollDown() {
      this.$refs.btScrollDown.classList.remove('show');
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    },
    handleScroll(e) {
      if (this.alwaysScrollToBottom) {
        if (this.$refs.scrollList.scrollTop >= (this.$refs.scrollList.scrollHeight - this.$refs.scrollList.offsetHeight - 100)) {
          this.$refs.btScrollDown.classList.remove('show');
        } else {
          this.$refs.btScrollDown.classList.add('show');
        }
      }
      if (e.target.scrollTop === 0) {
        this.$emit('scrollToTop')
      }
    },
    shouldScrollToBottom() {
      return this.alwaysScrollToBottom;
    },
    onUpvote(message, author, vote) {
      this.$emit('upvote', message, author, vote)
    },
    replyMessage(id) {
      return this.messages.find(m => m.id === id);
    },
    profile(author) {
      const profile = this.participants.find((profile) => profile.id === author)

      // A profile may not be found for system messages or messages by 'me'
      return profile || { imageUrl: '', name: '' }
    }
  }
}
