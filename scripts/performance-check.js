#!/usr/bin/env node

/**
 * Script de otimização de performance pré-build
 * Verifica e reporta oportunidades de otimização
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const checksToRun = [
  {
    name: 'Verificar componentes com Framer Motion desnecessária',
    check: () => {
      const componentsDir = path.join(__dirname, '../components');
      let findings = [];

      // Procura por imports de framer-motion em componentes UI simples
      const files = getAllFiles(componentsDir).filter((f) => f.endsWith('.tsx'));

      files.forEach((file) => {
        const content = fs.readFileSync(file, 'utf-8');
        if (
          content.includes("from 'framer-motion'") &&
          !content.includes('motion.') &&
          !content.includes('AnimatePresence')
        ) {
          findings.push(`  ⚠️  ${path.relative(process.cwd(), file)}`);
        }
      });

      return findings.length > 0 ? findings.join('\n') : null;
    },
  },
  {
    name: 'Verificar tamanho de bundle',
    check: () => {
      const buildDir = path.join(__dirname, '../.next');
      if (!fs.existsSync(buildDir)) return null;

      const getSize = (dir) => {
        let size = 0;
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            size += getSize(filePath);
          } else {
            size += stat.size;
          }
        });
        return size;
      };

      const totalSize = getSize(buildDir);
      const sizeInMB = (totalSize / 1024 / 1024).toFixed(2);

      if (parseFloat(sizeInMB) > 3) {
        return `  ⚠️  Bundle size ${sizeInMB}MB (recomendado: < 3MB)`;
      }
      return null;
    },
  },
];

function getAllFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  });

  return files;
}

console.log('\n🔍 Executando verificações de performance...\n');

checksToRun.forEach(({ name, check }) => {
  const result = check();
  if (result) {
    console.log(`${name}:`);
    console.log(result);
    console.log();
  } else {
    console.log(`✅ ${name}`);
  }
});

console.log('✨ Verificações concluídas!\n');
