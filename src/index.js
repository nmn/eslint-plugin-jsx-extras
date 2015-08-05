/* @flow */

import jsxNoStringLiteral from './rules/jsx-no-string-literals'
import reactExports from './rules/no-untyped-react-exports'
import modalNoStringLiterals from './rules/modal-no-string-literals'

export default
  { rules:
      { 'jsx-no-string-literals': jsxNoStringLiteral
      , 'no-untyped-react-exports': reactExports
      , 'modal-no-string-literals': modalNoStringLiterals
      }
  , rulesConfig:
      { 'jsx-no-string-literals': 1
      , 'no-untyped-react-exports': 1
      , 'modal-no-string-literals': 1
      }
  }
