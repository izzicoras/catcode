import './styles.scss';
import { createApp } from 'vue';
import App from './app/App.vue';
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

const app = createApp(App);
app.mount('#root');

app.use(VueMonacoEditorPlugin, {
    paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
    },
});
