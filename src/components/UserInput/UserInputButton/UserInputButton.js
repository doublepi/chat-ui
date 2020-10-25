import IconBase from '../../IconBase/IconBase.vue'

export default {
  components: {
    IconBase
  },
  props: {
    color: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  methods: {
    keydown(event) {
      this.$emit('keydown', event)
    }
  }
}
