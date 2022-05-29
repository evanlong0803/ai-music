export default {
  directives: {
    // 在模板中启用 v-focus
    focus: {
      mounted(el: { focus: () => void }) {
        el.focus();
      },
    },
  },
};
