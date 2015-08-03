/* @flow */

import jsxNoStringLiteral from './rules/jsx-no-string-literals'
import reactExports from './rules/no-untyped-react-exports'

export default
  { rules:
      { 'jsx-no-string-literals': jsxNoStringLiteral
      , 'no-untyped-react-exports': reactExports
      }
  , rulesConfig:
      { 'jsx-no-string-literals': 1
      , 'no-untyped-react-exports': 1
      }
  }
