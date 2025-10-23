// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { tanstackConfig } from "@tanstack/eslint-config";
import eslintPluginPrettierRecommended, {
  plugins,
} from "eslint-plugin-prettier/recommended";
import stylistic from "@stylistic/eslint-plugin";

export default [
  ...tanstackConfig,
  ...storybook.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },
];
