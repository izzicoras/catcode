export type Token = {
    type: string;
    value: string;
    line: number;
    column: number;
};

class Tokenizer
{
    private input: string;
    private index = 0;
    private line = 0;
    private column = 0;
    private tokens: Token[] = [];

    public constructor(input: string)
    {
        this.input = input;
    }

    public tokenize()
    {
        while (this.index < this.input.length) {
            if (this.match(/^[a-zA-Z]/)) {
                let value = this.current();

                this.next();

                while (this.match(/^[a-zA-Z0-9]/)) {
                    value += this.current();
                    this.next();
                }

                this.push('IDENTIFIER', value);
            } else if (this.match(/^(\n|\s)/)) {
                this.next();
            } else if (this.match('(')) {
                this.push('PARENTHESIS_OPEN', this.current());
                this.next();
            } else if (this.match(')')) {
                this.push('PARENTHESIS_CLOSE', this.current());
                this.next();
            } else if (this.match('[')) {
                this.push('SQUARE_BRACKET_OPEN', this.current());
                this.next();
            } else if (this.match(']')) {
                this.push('SQUARE_BRACKET_CLOSE', this.current());
                this.next();
            } else if (this.match('.')) {
                this.push('ACCESSOR', this.current());
                this.next();
            } else if (this.match(',')) {
                this.push('COMMA', this.current());
                this.next();
            } else if (this.match(/^(>=|<=)/)) {
                this.push('OPERATOR', this.current() + this.next());
                this.next();
            } else if (this.match(/^(\*|\+|-|\/|>|<)/)) {
                this.push('OPERATOR', this.current());
                this.next();
            }  else if (this.match(/^\d/)) {
                let value = '';
                let pastDecimal = false;
                let malformed = false;

                while (this.match(/^(\d|\.)/)) {
                    value += this.current();

                    if (this.match('.')) {
                        if ( ! pastDecimal) {
                            pastDecimal = true;
                        } else {
                            malformed = true;
                            break;
                        }
                    }

                    this.next();
                }

                if (value.endsWith('.')) {
                    malformed = true;
                }

                if (malformed) {
                    this.push('MALFORMED_NUMBER', value);
                } else {
                    this.push('NUMBER', value);
                }
            } else if (this.match(';')) {
                this.push('STATEMENT_END', this.current());
                this.next();
            } else {
                this.push('UNEXPECTED', this.current());
                this.next();
            }
        }

        return this.tokens;
    }

    private push(type: string, value: string) {
        this.tokens.push({
            type,
            value,
            line: this.line,
            column: this.column,
        });
    }

    private match(test: RegExp | string) {
        const substr = this.input.substring(this.index);

        if (typeof test === 'string') {
            return substr.startsWith(test);
        }

        return substr.match(test);
    }

    private current() {
        return this.input.charAt(this.index);
    }

    private next() {
        const nextChar = this.input.charAt(++this.index);

        this.column++;

        if (nextChar === '\n') {
            this.line += 1;
            this.column = 0;
        }

        return nextChar;
    }
}

export function tokenize(input: string): Token[] {
    return new Tokenizer(input).tokenize();
}
