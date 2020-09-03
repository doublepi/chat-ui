import TextMessage from './messages/TextMessage/TextMessage.vue'
import TypingMessage from './messages/TypingMessage/TypingMessage.vue'
import SystemMessage from './messages/SystemMessage/SystemMessage.vue'
import ReplyMessage from './messages/ReplyMessage/ReplyMessage.vue'
import chatIcon from '../../assets/chat-icon.svg'
import store from '../../store/'

export default {
  components: {
    TextMessage,
    TypingMessage,
    SystemMessage,
    ReplyMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    quickActions: {
      type: Array,
    },
    colors: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    reply: {
      type: Object,
      required: false
    }
  },
  computed: {
    authorName() {
      return this.user && this.user.name
    },
    chatImageUrl() {
      return (this.user && this.user.imageUrl) || chatIcon
    },
    senderId() {
      return store.sender.id;
    }
  }
}
