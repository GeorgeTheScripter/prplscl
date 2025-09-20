import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import directives from "./directives/index";

const app = createApp(App);

directives.forEach(({ name, directive }) => {
  app.directive(name, directive);
});

app.mount("#app");
