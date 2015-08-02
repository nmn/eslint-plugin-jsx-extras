# eslint-plugin-jsx-extras
A set of Eslint plug-ins for app specific JSX based rules.

Currently this package has a single rule which is being used for the upclose.me website:

## Rules

#### jsx-no-string-literals
This rule disallows the use of string literals (other than numbers) in a JSX expression.
It exists so that a developer doesn't accidentally forget to put localized strings for a component.

## Future
Some rules that I'm currently working on:
1) multiline-attributes-align: To check that JSX attributes are either limited to a single line or the attributes all match the same indentation.

2) jsx-like-html: To check that a `<br />` tag is always self closing, while a `<span></span>` tag is never self closing.

3) jsx-ternary: To enforce indentation rules for ternary expressions in JSX.

4) jsx-function-bind: For ES6 classes, a rule that will check that you use `.bind(this)` for callback functions in JSX.
