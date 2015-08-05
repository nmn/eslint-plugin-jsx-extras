/**
 * @fileoverview Disallows using string literals in JSX to enforce localization.
 * @author Naman Goel
 */
/* @flow */
import type {Context, Rules, EslintNode} from './types'

const numberSpace = /^[\s0-9]*$/
const isLiteral = child => child.type === 'Literal'
const isNotEmpty = literalNode => !numberSpace.test(literalNode.value)
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export default function(context: Context): Rules {
  return {
    CallExpression: function(node: EslintNode): void {
      if(!(node.callee.type === 'MemberExpression'
        && node.callee.object.type === 'Identifier'
        && node.callee.object.name === 'ee'
        && node.callee.property.type === 'Identifier'
        && node.callee.property.name == 'emit')){
        return
      }
      if(node.arguments.length !== 2){
        return
      }
      if(node.arguments[0].type !== 'Literal'){
        return
      }
      const eventName = node.arguments[0].value
      if(eventName !== 'showModal' && eventName !== 'showBanner'){
        return
      }
      if(node.arguments[1].type !== 'ObjectExpression'){
        return
      }

      node.arguments[1].properties
        .filter(prop => prop.key.type === 'Identifier')
        .filter(prop => prop.key.name === 'title' || prop.key.name === 'body' || prop.key.name === 'message')
        .filter(prop => prop.value.type === 'Literal')
        .forEach(prop => context.report(prop, 'Use L10ns not a string literal'))
    }
  }

}

export const schema: Array<any> = []
