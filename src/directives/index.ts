export default {
  directives: {
    // 在模板中使用 v-focus
    focus: {
      mounted(el: { focus: () => void }) {
        el.focus();
      },
    },
  },
};
