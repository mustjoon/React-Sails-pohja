module.exports = {
    "extends": "eslint:recommended",
    "env": { "es6": true,
      "browser": true,
      "node": true,
      "jasmine": true
    },
    "parser": "babel-eslint",
    "plugins": [
      "react"
    ],
    "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
    },
    rules : {
         "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
          "react/jsx-uses-react": "error",
          "react/jsx-uses-vars": "error",
    }
};