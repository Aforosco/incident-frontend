import { createApp } from "vue";
import App from "./App.vue";
<<<<<<< HEAD
import router from "./router/index"; // import your router
=======
import router from "./router/index"; 
import './style.css';
>>>>>>> email-feature

const app = createApp(App);


app.use(router);

app.mount("#app");
