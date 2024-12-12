import { interpreter } from './interpreter';
import { parse } from './parser';
import { tokenize } from './tokenizer';

export function execute(code: string) {
    const ast = parse(tokenize(code));

    return (screens: Record<string, number[][]>) => interpreter(ast, screens);
}
