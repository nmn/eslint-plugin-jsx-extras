export type Report = Object
export type eslintLocValue = {line: number, column: number}
export type EslintNode =
  { parent?: EslintNode
  , value?: any
  , openingElement?: EslintNode
  , closingElement?: EslintNode
  , type: string
  , start: number
  , end: number
  , loc:
      { start: eslintLocValue
      , end: eslintLocValue
      }
  , range: [number, number]
  , raw: string
  , children?: Array<EslintNode>
  }
export type Context =
  { report(node: Object, props?: Object, message: string): Report
  }

export type Rules =
  { [key: string]: (node: EslintNode) => Report
  }
