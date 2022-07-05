module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  "extensions": ["ts"],
  "node-option": [
    "experimental-specifier-resolution=node",
    "loader=ts-node/esm"
  ]
};
