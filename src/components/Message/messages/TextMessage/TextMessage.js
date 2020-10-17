import IconBase from '../../../IconBase/IconBase.vue'
import IconEdit from '../../../IconBase/icons/IconEdit.vue'
import IconCross from '../../../IconBase/icons/IconCross.vue'
import IconReply from '../../../IconBase/icons/IconReply.vue'
import escapeGoat from 'escape-goat'
import Autolinker from 'autolinker'
import Actions from '../../../Actions/Actions.vue'
import QuickActions from '../../../QuickActions/QuickActions.vue'
import store from '../../../../store/'
import ReplyMessage from '../ReplyMessage/ReplyMessage.vue'
const fmt = require('msgdown')

export default {
  components: {
    IconBase,
    IconCross,
    IconEdit,
    IconReply,
    Actions,
    ReplyMessage,
    QuickActions,
  },
  props: {
    quickActions: {
      type: Array,
      required: false
    },
    copy: {
      type: Object,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    reply: {
      type: Object,
      required: false
    },
    upvoting: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      store,
      actionOpen: false,
      actions: [
        {
          label: this.copy.edit,
          onClick: this.edit,
        },
        {
          label: this.copy.delete,
          onClick: this.delete,
        },
        {
          label: this.copy.reply,
          onClick: this.replyMessage,
        }
      ],
    }
  },
  computed: {
    messageText() {
      const escaped = escapeGoat.escape(this.message.data.text)

      return Autolinker.link(escaped, {
        className: 'chatLink',
        truncate: { length: 50, location: 'smart' }
      })
    },
    receivedColorsStyle() {
      return {
        color: this.colors.receivedMessage.text,
        backgroundColor: this.colors.receivedMessage.bg,
        author: this.colors.receivedMessage.author,
      }
    },
    sentColorsStyle() {
      return {
        color: this.colors.sentMessage.text,
        backgroundColor: this.colors.sentMessage.bg,
        author: this.colors.sentMessage.author,
      }
    },
    messageColors() {
      return this.message.author === store.sender.id ? this.sentColorsStyle : this.receivedColorsStyle
    },
    me() {
      return this.message.author === store.sender.id;
    },
    isEditing() {
      return (store.editMessage && store.editMessage.id) == this.message.id
    }
  },
  methods: {
    toggleAction() {
      this.actionOpen = !this.actionOpen;
    },
    delete() {
      this.$emit('remove');
    },
    edit() {
      this.store.editMessage = this.message
    },
    replyMessage() {
      this.store.replyMessage = this.message
    },
    translate() {
      this.$emit('translate');
    }
  }
}
