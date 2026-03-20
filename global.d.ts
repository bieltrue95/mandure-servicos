/**
 * Permite que o TS Server aceite side-effect imports de CSS global.
 * O Next continua responsável pelo bundling e pelas restrições de uso desses arquivos.
 */
declare module '*.css';
