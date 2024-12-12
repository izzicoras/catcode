<script setup lang="ts">
import { ref, watch } from 'vue';
import { screenObjectStringifier } from '../catcode/screenObjectStringifier';
import { execute as screenCodeExecute } from '../catcode/screens/execute';
import { execute as programCodeExecute } from '../catcode/execute';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

const screenText = ref('');
const programText = ref('');
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
});

const process = () => {
    screenData.value = runScreenCode.value();
    screenData.value = runProgramCode.value(screenData.value);

    screenText.value = screenObjectStringifier(screenData.value);
};
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
                <p class="text-danger fw-bold">{{ programError }}</p>
                <div class="position-relative flex-grow-1">
                    <div class="position-absolute top-0 left-0 w-100 h-100">
                        <vue-monaco-editor
                            v-model:value="programText"
                            theme="vs-dark"
                            :options="{ automaticLayout: true, }"
                        />
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3 d-flex flex-column">
                <p class="h3 text-primary">Your screens</p>
                <p class="text-danger fw-bold">{{ screenError }}</p>
                <div class="position-relative flex-grow-1">
                    <div class="position-absolute top-0 left-0 w-100 h-100">
                        <vue-monaco-editor
                            v-model:value="screenText"
                            theme="vs-dark"
                            :options="{ automaticLayout: true, }"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="run-controls">
            <b-button variant="primary" class="fw-bold" @click="process">RUN THE CODE!</b-button>
        </div>
    </div>
</template>
