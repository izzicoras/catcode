import { marked } from 'marked';
import { ref } from 'vue';

export function useManageReadme() {
    const markdownCode = ref('');
    const markdownModalOpen = ref(false);

    const loadReadMe = async () => {
        const response = await fetch(`${window.location.toString()}/README.md?v=${new Date().getTime()}`);
        const text = await response.text();
        const code = await marked.parse(text);
        const container = document.createElement('div');

        container.innerHTML = code;

        container.querySelectorAll('table').forEach(t => t.classList.add('table', 'table-bordered', 'table-striped'));

        markdownCode.value = container.innerHTML;
    };

    loadReadMe();

    return {
        markdownCode,
        markdownModalOpen,
    };
}
