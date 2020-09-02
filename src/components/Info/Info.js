export default {
  props: {
    participants: {
      type: Array,
      required: true
    },
    colors: {
      type: Object,
      default: () => ({})
    }
  },
}
