declare module 'markdown-it' {
  interface Token {
    type: string
    tag: string
    attrs: Array<[string, string]> | null
    map: [number, number] | null
    nesting: number
    level: number
    children: Token[] | null
    content: string
    markup: string
    info: string
    meta: any
    block: boolean
    hidden: boolean
    attrSet(name: string, value: string): void
    attrGet(name: string): string | null
    attrJoin(name: string, value: string): void
  }

  interface Renderer {
    rules: {
      [key: string]: (
        tokens: Token[],
        idx: number,
        options: Options,
        env: any,
        self: Renderer
      ) => string
    }
    render(tokens: Token[], options: Options, env: any): string
    renderToken(tokens: Token[], idx: number, options: Options): string
  }

  interface Options {
    html?: boolean
    xhtmlOut?: boolean
    breaks?: boolean
    langPrefix?: string
    linkify?: boolean
    typographer?: boolean
    quotes?: string
    highlight?: (str: string, lang: string, attrs: string) => string
  }

  interface MarkdownIt {
    render(src: string, env?: any): string
    renderInline(src: string, env?: any): string
    use(plugin: any, ...params: any[]): MarkdownIt
    utils: {
      escapeHtml(str: string): string
      unescapeHtml(str: string): string
      escapeRE(str: string): string
      isValidEntityCode(c: number): boolean
      fromCodePoint(c: number): string
      unescapeMd(str: string): string
      unescapeAll(str: string): string
      isWhiteSpace(code: number): boolean
      isMdAsciiPunct(ch: number): boolean
      isPunctChar(ch: string): boolean
      isSpace(code: number): boolean
      normalizeReference(str: string): string
    }
    renderer: Renderer
    options: Options
  }

  interface MarkdownItConstructor {
    new (presetName?: string, options?: Options): MarkdownIt
    new (options?: Options): MarkdownIt
    (presetName?: string, options?: Options): MarkdownIt
    (options?: Options): MarkdownIt
  }

  const MarkdownIt: MarkdownItConstructor
  export default MarkdownIt
}
