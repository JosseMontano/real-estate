module.exports = {
  presets: [
    [
      'babel-preset-expo',
      {
        unstable_transformImportMeta: true, // Fixes import.meta
      },
    ],
  ],
};