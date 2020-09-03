export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    actions: {
      type: Array,
    },
  },
  methods: {
    onClick(action) {
      action.onClick(this.message, action);
      this.$emit('action', this.message, action);
    },
  },
}
