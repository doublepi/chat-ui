import UserInputButton from './UserInputButton/UserInputButton.vue'
import Suggestions from './Suggestions/Suggestions.vue'
import ReplyMessage from './ReplyMessage/ReplyMessage.vue'
import CloseIconSvg from '../../assets/close.svg'
import store from '../../store/'
import IconCross from '../IconBase/icons/IconCross.vue'
import IconOk from '../IconBase/icons/IconOk.vue'
import IconSend from '../IconBase/icons/IconSend.vue'

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
    onSubmit: {
      type: Function,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Write something...'
    },
    colors: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      file: null,
      inputActive: false,
      store
    }
  },
  computed: {
    editMessageId() {
      return this.isEditing && store.editMessage.id
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
  },
  watch: {
    editMessageId(m) {
      if (store.editMessage != null && store.editMessage != undefined) {
        this.$refs.userInput.focus()
        this.$refs.userInput.textContent = store.editMessage.data.text
      } else {
        this.$refs.userInput.textContent = ''
      }
    }
  },
  mounted() {
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

      this.$emit('onType')
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
              this.$refs.userInput.innerHTML = ''
              store.replyMessage = null;
            }
          }.bind(this)
        )
      } else {
        this.$refs.userInput.innerHTML = ''
      }
    },
    _submitText(event) {
      const text = this.$refs.userInput.textContent
      if (text && text.length > 0) {
        this._checkSubmitSuccess(
          this.onSubmit({
            author: store.sender.id,
            type: 'text',
            data: { text },
            reply: this.replyMessageId
          })
        )
      }
    },
    _editText(event) {
      const text = this.$refs.userInput.textContent
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
