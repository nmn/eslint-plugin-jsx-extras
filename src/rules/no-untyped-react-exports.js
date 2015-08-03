/**
 * @fileoverview Rule to flag when exporting a React Class while also calling a function on it
 * @author Naman Goel
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 */

import type {Context, Rules, EslintNode} from './types'

function getFinalArg(node: EslintNode): ?string{
  if(node.arguments.length === 1
  && node.arguments[0].type === 'Identifier'){
    return node.arguments[0].name
  }
  if(node.arguments.length === 1
  && node.arguments[0].type === 'CallExpression'){
    return getFinalArg(node.arguments[0])
  }
}
function isReactComponent(node: EslintNode): boolean {
  if(node.type === 'MemberExpression'){
    return node.object.type === 'Identifier'
      && node.object.name === 'React'
      && node.property.type === 'Identifier'
      && node.property.name === 'Component'
  }
  return node.type === 'Identifier' && node.name === 'Component'
}
function isReactClass(node: EslintNode): boolean {
  if(node.type === 'ClassDeclaration'
  && node.superClass
  && isReactComponent(node.superClass)){
    return true
  }
  return false
}
const getFinalParent = node => !node.parent ? node : getFinalParent(node.parent)
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default function(context: Context): Rules {
  return {
    'ExportDefaultDeclaration': function(node){
      if(node.declaration.type === 'CallExpression'
      && node.declaration.callee.type === 'Identifier'
      && node.declaration.arguments.length === 1){
        var arg = getFinalArg(node.declaration)
        getFinalParent(node).body
          .filter(isReactClass)
          .forEach(function(classDecl){
            if(classDecl.id.name === arg){
              context.report(node, 'Use temp variable to set correct type on export')
            }
          })
      }
    }
  , 'AssignmentExpression': function(node){
      if(node.operator === '='
      && node.left.type === 'MemberExpression'
      && node.left.object.type === 'Identifier'
      && node.left.object.name === 'module'
      && node.right.type === 'CallExpression'
      && node.right.callee.type === 'Identifier'
      && node.right.arguments.length === 1){
        var arg = getFinalArg(node.right)
        getFinalParent(node).body
          .filter(isReactClass)
          .forEach(function(classDecl){
            if(classDecl.id.name === arg){
              context.report(node, 'Use temp variable to set correct type on export')
            }
          })
      }
    }
  }
}

export const schema: Array<any> = []
