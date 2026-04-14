import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn', // Adiciona esta regra para evitar variáveis não utilizadas
      '@typescript-eslint/no-explicit-any': 'off', // Desativa esta regra para permitir o uso de 'any' quando necessário
      '@typescript-eslint/explicit-function-return-type': 'error', // Adiciona esta regra para garantir que as funções tenham tipos de retorno explícitos
      '@typescript-eslint/explicit-module-boundary-types': 'error', // Adiciona esta regra para garantir que as funções exportadas tenham tipos de retorno explícitos
      '@typescript-eslint/no-inferrable-types': 'error', // Adiciona esta regra para evitar tipos inferíveis
    },
  },
];
