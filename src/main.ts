import { createApp } from 'vue';
import './styles/mug.scss';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import App from './App.vue';
import { useBeverageStore } from './stores/beverageStore';
import { setupFirestore } from './setupFirestore';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);
app.use(pinia);

async function initializeApp() {
  try {
    await setupFirestore();

    const beverageStore = useBeverageStore();
    console.log('Initializing beverage store...');
    await beverageStore.init();
    console.log('Store initialized');

    app.mount('#app');
    console.log('App mounted successfully');
  } catch (error) {
    console.error('Error initializing app:', error);
    app.mount('#app');
  }
}

initializeApp();
