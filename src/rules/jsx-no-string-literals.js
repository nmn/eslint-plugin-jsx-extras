/**
 * @fileoverview Disallows using string literals in JSX to enforce localization.
 * @author Naman Goel
 */
import type {Context, Rules, EslintNode} from './types'

const numberSpace = /^[\s0-9]*$/
const isLiteral = child => child.type === 'Literal'
const isNotEmpty = literalNode => !numberSpace.test(literalNode.value)
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export default function(context: Context): Rules {
  return {
    JSXElement: function(node: EslintNode): void {
      node.children
        .filter(isLiteral)
        .filter(isNotEmpty)
        .forEach(function(childNode){
          context.report(childNode, 'Use L10ns not a string literal')
        })
    }
  }

}

export const schema: Array<any> = []
