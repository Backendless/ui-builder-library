module.exports = {
  'extends': 'eslint-config-backendless',
  'rules'  : {
    'simple-import-sort/imports': [
      'warn',
      {
        'groups': [
          /* node_modules */
          [
            '^react',
            '^prop-types',
            '^@?\\w',
          ],

          /* External libraries files */
          [
            '^\\./lib/(?=.*/)(?!/?$)',
            '^\\./lib/(?!/?$)',
            '^\\./lib/?$',
          ],

          /* Relative imports */
          [
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
        ],
      },
    ],

    'semi'   : [1, 'always'],
    'max-len': ['warn', {
      'code'         : 120,
      'ignoreStrings': true,
    }],
  },
  'globals': {
    'React'        : true,
    'ReactDOM'     : true,
    'BackendlessUI': true,
    'Backendless'  : true,
  },
  'settings': {
    'react': {
      'version': '17',
    },
  },
};
