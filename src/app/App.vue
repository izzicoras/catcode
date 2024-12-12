<script setup lang="ts">
import { ref, watch } from 'vue';
import { screenObjectStringifier } from '../catcode/screenObjectStringifier';
import { execute as screenCodeExecute } from '../catcode/screens/execute';
import { execute as programCodeExecute } from '../catcode/execute';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';
import { useManageReadme } from './useManageReadme';

const screenText = ref(`[screen]
0 0 0;
[/screen]
`);
const programText = ref(`first [screen.[0,0]];
second [screen.[1,0]];
third [screen.[2,0]];

first + 1;

second + (first > 9);
third + (second > 9);
first (first <= 9) * first;
second (second <= 9) * second;
third (third <= 9) * third;

[screen.[0,0]] first;
[screen.[1,0]] second;
[screen.[2,0]] third;`);
const screenData = ref<{ [key: string]: number[][] }>({});

const programError = ref('');
const screenError = ref('');

const runScreenCode = ref<() => Record<string, number[][]>>(() => ({}));
const runProgramCode = ref<(screens: Record<string, number[][]>) => Record<string, number[][]>>(() => ({}));

watch(screenText, (value) => {
    screenError.value = '';

    try {
        runScreenCode.value = screenCodeExecute(value);
    }
    catch (e) {
        screenError.value = e.message;

        runScreenCode.value = () => ({});
    }
}, {
    immediate: true,
});

watch(programText, (value) => {
    programError.value = '';

    try {
        runProgramCode.value = programCodeExecute(value);
    }
    catch (e) {
        programError.value = e.message;

        runProgramCode.value = () => ({});
    }
}, {
    immediate: true,
});

const process = () => {
    let data = runScreenCode.value();
    data = runProgramCode.value(data);

    if (Object.keys(data).length) {
        screenText.value = screenObjectStringifier(data);
    }
};

const {
    markdownCode,
    markdownModalOpen,
} = useManageReadme();

</script>

<template>
    <div class="container vh-100 d-flex flex-column py-4">
        <div class="row">
            <div class="col-12">
                <p class="h1">🐈‍⬛ <span class="fst-italic">CATCODE INTERPRETER</span></p>
            </div>
        </div>
        <div class="row flex-grow-1">
            <div class="col-md-6 mb-3 d-flex flex-column">
                <p class="h3 text-primary">Your program</p>
                <div class="position-relative flex-grow-1">
                    <div class="position-absolute top-0 left-0 w-100 h-100">
                        <vue-monaco-editor
                            v-model:value="programText"
                            theme="vs-dark"
                            :options="{ automaticLayout: true, }"
                        />
                    </div>
                </div>
                <p v-if="programError" class="text-danger fw-bold">{{ programError }}</p>
            </div>
            <div class="col-md-6 mb-3 d-flex flex-column">
                <p class="h3 text-primary">Your screens</p>
                <div class="position-relative flex-grow-1">
                    <div class="position-absolute top-0 left-0 w-100 h-100">
                        <vue-monaco-editor
                            v-model:value="screenText"
                            theme="vs-dark"
                            :options="{ automaticLayout: true, }"
                        />
                    </div>
                </div>
                <p v-if="screenError" class="text-danger fw-bold">{{ screenError }}</p>
            </div>
        </div>

        <b-modal v-model="markdownModalOpen" size="lg" title="Catcode documentation" ok-only>
            <div v-html="markdownCode"></div>
        </b-modal>

        <div class="run-controls">
            <b-button variant="secondary" class="fw-bold" @click="markdownModalOpen = true">View documentation</b-button>
            <b-button variant="primary" class="fw-bold" @click="process">RUN THE CODE!</b-button>
        </div>
    </div>
</template>
