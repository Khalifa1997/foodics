import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import PrimeVue from "primevue/config";
import InputMask from "primevue/inputmask";

Vue.use(PrimeVue);

Vue.component("InputMask", InputMask);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
