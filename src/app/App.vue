<script setup lang="ts">
import { ref, watch } from 'vue';
import { screenObjectStringifier } from '../catcode/screenObjectStringifier';
import { execute as screenCodeExecute } from '../catcode/screens/execute';
import { execute as programCodeExecute } from '../catcode/execute';

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
  <div style="margin-bottom: 1rem;">
    <label for="program">Program</label>
    <br>
    <textarea id="program" v-model="programText" col="20" style="border: 1px #000 solid; width: 320px;"></textarea>
    <br>
    {{ programError }}
  </div>
  <div style="margin-bottom: 1rem;">
    <label for="screen">Screens</label>
    <br>
    <textarea id="screen" v-model="screenText" col="20" style="border: 1px #000 solid; width: 320px;"></textarea>
    {{ screenError }}
  </div>
  <button @click="process">Process</button>
</template>
