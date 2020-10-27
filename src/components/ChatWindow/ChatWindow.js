import Header from '../Header/Header.vue'
import MessageList from '../MessageList/MessageList.vue'
import UserInput from '../UserInput/UserInput.vue'
import Info from '../Info/Info.vue'
import store from '../../store/'

export default {
  components: {
    Header,
    MessageList,
    UserInput,
    Info
  },
  props: {
    sender: {
      type: Object,
      required: true,
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    enableNewLine: {
      type: Boolean,
      default: true
    },
    upvoting: {
      type: Boolean,
      default: false
    },
    participants: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    titleImageUrl: {
      type: String,
      default: ''
    },
    onUserInputSubmit: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    showTypingIndicator: {
      type: String,
      required: true
    },
    copy: {
      type: Object,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    quickActions: {
      type: Array,
    },
    maxlength: {
      type: Number,
    }
  },
  data() {
    return {
      showInfo: false,
      actions: [
        {
          label: "Info",
          onClick: this.onInfo
        }
      ]
    }
  },
  created() {
    store.sender = this.sender;
  },
  computed: {
    messages() {
      let messages = this.messageList

      return messages
    },
    users() {
      const users = [...this.participants]
      users.push(store.sender);
      return users;
    },
  },
  methods: {
    getSuggestions() {
      return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
    },
    onInputUser(message) {
      this.onUserInputSubmit(message)
    },
    scrollDown() {
      this.$refs.messageList._scrollDown();
    },
    checkScroll() {
      this.$refs.messageList.checkScroll();
    },
    onInfo() {
      this.showInfo = true;
    },
    onClickBack() {
      this.showInfo = false;
    },
    onUpvote(message, author, vote) {
      this.$emit('upvote', message, author, vote);
    }
  }
}
