#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para gerar relatório consolidado de testes E2E
 * Executa todos os testes em todos os navegadores/dispositivos
 * e gera um relatório único com estatísticas detalhadas
 */

console.log('🚀 Iniciando testes E2E completos...\n');

// Executar todos os testes
const { execSync } = require('child_process');

try {
  console.log('📋 Executando testes em todos os navegadores e dispositivos...\n');

  // Executar testes com múltiplos reporters
  execSync('npx playwright test --reporter=html,json,junit,list', {
    stdio: 'inherit',
    cwd: process.cwd(),
  });

  console.log('\n✅ Todos os testes foram executados!\n');

  // Aguardar um pouco para garantir que os arquivos sejam escritos
  setTimeout(() => {
    // Ler resultados JSON para análise detalhada
    const resultsPath = path.join(process.cwd(), 'test-results.json');
    if (fs.existsSync(resultsPath)) {
      try {
        const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

        console.log('📊 RELATÓRIO CONSOLIDADO DE TESTES E2E\n');
        console.log('='.repeat(50));

        // Estatísticas gerais
        const totalTests = results.stats.expected;
        const passedTests = results.stats.passed;
        const failedTests = results.stats.failed;
        const skippedTests = results.stats.skipped;
        const duration = (results.stats.duration / 1000).toFixed(2);

        console.log(`📈 Estatísticas Gerais:`);
        console.log(`   • Total de testes: ${totalTests}`);
        console.log(`   • Aprovados: ${passedTests} ✅`);
        console.log(`   • Falharam: ${failedTests} ❌`);
        console.log(`   • Pulados: ${skippedTests} ⏭️`);
        console.log(`   • Tempo total: ${duration}s\n`);

        // Resultados por projeto (navegador/dispositivo)
        console.log(`🌐 Resultados por Navegador/Dispositivo:`);
        results.suites.forEach((suite) => {
          if (suite.title) {
            const projectName = suite.title;
            const projectStats = suite.stats || { passed: 0, failed: 0, skipped: 0 };

            console.log(`   📱 ${projectName}:`);
            console.log(`      ✅ ${projectStats.passed || 0} passaram`);
            console.log(`      ❌ ${projectStats.failed || 0} falharam`);
            console.log(`      ⏭️  ${projectStats.skipped || 0} pulados`);
            console.log('');
          }
        });

        // Lista de falhas (se houver)
        if (failedTests > 0) {
          console.log(`❌ Testes que falharam:`);
          results.suites.forEach((suite) => {
            if (suite.suites) {
              suite.suites.forEach((fileSuite) => {
                if (fileSuite.suites) {
                  fileSuite.suites.forEach((testSuite) => {
                    if (testSuite.tests) {
                      testSuite.tests.forEach((test) => {
                        if (
                          test.results &&
                          test.results[0] &&
                          test.results[0].status === 'failed'
                        ) {
                          console.log(`   • ${test.title}`);
                          if (test.results[0].error) {
                            console.log(`     Erro: ${test.results[0].error.message}`);
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          });
          console.log('');
        }

        console.log('📁 Relatórios gerados:');
        console.log('   • HTML: playwright-report/index.html');
        console.log('   • JSON: test-results.json');
        console.log('   • JUnit: test-results.xml');
        console.log('');
        console.log('💡 Para visualizar o relatório HTML: npm run test:e2e:report');
      } catch (parseError) {
        console.log(
          '⚠️  Não foi possível ler o arquivo de resultados JSON, mas os testes foram executados.'
        );
        console.log('📁 Relatório HTML disponível: playwright-report/index.html');
        console.log('💡 Para visualizar: npm run test:e2e:report');
      }
    } else {
      console.log('⚠️  Arquivo de resultados não encontrado, mas os testes foram executados.');
      console.log('📁 Relatório HTML disponível: playwright-report/index.html');
      console.log('💡 Para visualizar: npm run test:e2e:report');
    }
  }, 2000); // Aguardar 2 segundos
} catch (error) {
  console.error('❌ Erro ao executar testes:', error.message);
  console.log('\n💡 Dica: Certifique-se de que o servidor de desenvolvimento está rodando:');
  console.log('   npm run dev');
  process.exit(1);
}
