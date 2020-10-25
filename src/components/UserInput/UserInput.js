import UserInputButton from './UserInputButton/UserInputButton.vue'
import Suggestions from './Suggestions/Suggestions.vue'
import ReplyMessage from './ReplyMessage/ReplyMessage.vue'
import CloseIconSvg from '../../assets/close.svg'
import store from '../../store/'
import IconCross from '../IconBase/icons/IconCross.vue'
import IconOk from '../IconBase/icons/IconOk.vue'
import IconSend from '../IconBase/icons/IconSend.vue'
import chatIcon from '../../assets/chat-icon.svg'

export default {
  components: {
    UserInputButton,
    Suggestions,
    IconCross,
    IconOk,
    IconSend,
    ReplyMessage,
  },
  props: {
    icons: {
      type: Object,
      default: function () {
        return {
          closeSvg: {
            img: CloseIconSvg,
            name: 'default'
          }
        }
      }
    },
    suggestions: {
      type: Array,
      default: () => []
    },
    showFile: {
      type: Boolean,
      default: () => false
    },
    enableNewLine: {
      type: Boolean,
      default: () => false
    },
    onSubmit: {
      type: Function,
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
    maxlength: {
      type: Number,
      default: 200
    },
  },
  data() {
    return {
      file: null,
      inputActive: false,
      store,
      numchars: 0,
    }
  },
  computed: {
    editMessageId() {
      return this.isEditing;
    },
    replyMessage() {
      return store.replyMessage;
    },
    isEditing() {
      return store.editMessage && store.editMessage.id
    },
    isReplying() {
      return store.replyMessage && store.replyMessage.id
    },
    replyMessageId() {
      return store.replyMessage ? store.replyMessage.id : null;
    },
    chatImageUrl() {
      return (store.sender && store.sender.imageUrl) || chatIcon
    },
  },
  watch: {
    replyMessage() {
      if (store.replyMessage != null && store.replyMessage != undefined) {
        this.$refs.userInput.focus();
      }
    },
    editMessageId(m) {
      if (store.editMessage != null && store.editMessage != undefined) {
        this.$refs.userInput.focus();
        console.log("FOCUS")
        this.$refs.userInput.value = store.editMessage.data.text.substring(0, this.maxlength);
      } else {
        this.$refs.userInput.value = ''
      }
      this.numchars = this.$refs.userInput.value.length;
    }
  },
  mounted() {
    console.log(store.editMessage !== null)
    if (!this.enableNewLine) {

    }
    this.$root.$on('focusUserInput', () => {
      if (this.$refs.userInput) {
        this.focusUserInput()
      }
    })
  },
  methods: {
    setInputActive(onoff) {
      this.inputActive = onoff
    },
    handleKey(event) {

      if (event.keyCode === 13 && event.shiftKey && !this.enableNewLine) {
        event.preventDefault()
        return;
      }

      if (this.$refs.userInput.value.length >= this.maxlength && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40) {
        event.preventDefault();
      }

      if (event.keyCode === 13 && !event.shiftKey) {
        if (!this.isEditing) {
          this._submitText(event)
        } else {
          this._editText(event)
        }
        this._editFinish()
        event.preventDefault()
      } else if (event.keyCode === 27) {
        this._editFinish()
        event.preventDefault()
      }
      this.numchars = this.$refs.userInput.value.length;
      this.$emit('onType')
    },
    handlePaste(event) {
      setTimeout(() => {
        if (this.$refs.userInput.value.length >= this.maxlength && event.keyCode != 8) {
          this.$refs.userInput.value = this.$refs.userInput.value.substring(0, this.maxlength);
        }
        this.numchars = this.$refs.userInput.value.length;
      })
    },
    focusUserInput() {
      this.$nextTick(() => {
        this.$refs.userInput.focus()
      })
    },
    _submitSuggestion(suggestion) {
      this.onSubmit({ author: store.sender.id, type: 'text', data: { text: suggestion }, reply: this.replyMessageId })
    },
    _checkSubmitSuccess(success) {
      if (Promise !== undefined) {
        Promise.resolve(success).then(
          function (wasSuccessful) {
            if (wasSuccessful === undefined || wasSuccessful) {
              this.$refs.userInput.value = ''
              this.numchars = 0;
              store.replyMessage = null;
            }
          }.bind(this)
        )
      } else {
        this.$refs.userInput.innerHTML = ''
        this.numchars = 0;
      }
    },
    _submitText(event) {
      const text = this.$refs.userInput.value
      if (text && text.length > 0) {
        this._checkSubmitSuccess(
          this.onSubmit({
            author: store.sender.id,
            type: 'text',
            data: { text },
            reply: this.replyMessageId,
            upvotes: 0,
          })
        )
      }
    },
    _editText(event) {
      const text = this.$refs.userInput.value
      if (text && text.length) {
        this.$emit('edit', {
          author: store.sender.id,
          type: 'text',
          id: store.editMessage.id,
          data: { text },
          reply: this.replyMessageId
        })
        this._editFinish()
      }
    },
    _editFinish() {
      this.store.editMessage = null
    }
  }
}
