# Projeto Frontend do RocketLab 2024

## Requisitos

### Node.js - [Guia de instalação](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
### pnpm - [Guia de instalação](https://pnpm.io/installation)

## Passos para preparar o ambiente

### 1: Instalar o gerenciador de pacotes pnpm
**Usando npm, entre no diretório /rocketlab-front usando (cd LucaStore e depois cd rocketlab-front) e rode:**

```
npm i pnpm
```

### 2: Instalar as dependências
**Ainda no diretório /rocketlab-front, rode:**

```
  pnpm i
```

## Passos para rodar o projeto

### 1: Rodar o servidor da base de dados
**Ainda no diretório /rocketlab-front, use (cd server) para entrar no repositório do servidor e rode:**

```
  json-server --watch db.json  
```

### 2: Rodar a aplicação

```
  pnpm dev
```
