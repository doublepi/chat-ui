export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
    actions: {
      type: Array,
    },
  },
  computed: {
    listActions() {
      if (this.message.createdAt) {
        return [{ label: this.message.createdAt }, ...this.actions]
      }
      return this.actions;
    }
  },
  methods: {
    onClick(action) {
      action.onClick(this.message, action);
      this.$emit('action', this.message, action);
    },
  },
}
