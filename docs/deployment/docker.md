# Deploy com Docker

## Desenvolvimento

```bash
docker-compose up
# App disponivel em http://localhost:3000
```

## Build e producao

```bash
# Build da imagem
docker-compose build

# Subir em producao
docker-compose up -d

# Verificar saude
docker-compose ps

# Logs
docker-compose logs -f app
```

## Parar

```bash
docker-compose down
```

## Dockerfile (Multi-stage)

| Stage | Descricao |
|-------|-----------|
| `base` | Node 20 Alpine base |
| `deps` | Instala dependencias |
| `builder` | Build Next.js |
| `runner` | Imagem minima de producao |

Usuario nao-root (`nextjs:nodejs`) por seguranca.

## Healthcheck

Container verifica `http://localhost:3000` a cada 30s.
