import './styles.scss';
import { createApp } from 'vue';
import { createBootstrap } from 'bootstrap-vue-next';
import App from './app/App.vue';
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const app = createApp(App);
app.use(createBootstrap());
app.mount('#root');

app.use(VueMonacoEditorPlugin, {
    paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
    },
});
