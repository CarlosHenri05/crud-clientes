# Por que esse CRUD foi feito?

Essa é uma aplicação full-stack feita como teste técnico da empresa Anka! 

# CRUD de Clientes

Aplicação fullstack para gerenciamento de clientes, permitindo operações de **Criar, Ler, Atualizar e Deletar** (CRUD). Desenvolvida com foco em boas práticas de desenvolvimento, arquitetura modular, boas práticas do TDD e uso de containers com Docker.

## 👷️ Tecnologias Utilizadas

* **Frontend**: React + Next.js
* **Backend**: Node.js com Fastify + Prisma (ORM)
* **Banco de Dados**: MySQL
* **Containerizção**: Docker e Docker Compose
* **Linguagens**: TypeScript
* **Ferramenta de teste**: Jest(TypeScript)
* **Outros**: Zod, Tailwindcss

## 🚀 Funcionalidades

* Cadastro de novos clientes e ativos
* Listagem de clientes e ativos com paginação
* Edição de informações dos clientes e ativos
* Remoção de clientes e dos ativos do sistema
* Validação de dados no frontend e backend
* Comunicação entre frontend e backend via API REST

## 📆 Estrutura do Projeto

```
crud-clientes/
├── backend/
│   ├── jest.config.ts
│   ├── dockerfile # -> dockerfile da aplicação back-end
│   ├── prisma/
│   │   ├──migrations # -> Script migrations
│   │   ├── schema.prisma # -> schemas do Prisma
│   ├── src/         # Codigo-fonte do servidor Node.js (Fastify + Prisma)
│   │  ├── controllers/
│   │  ├──  __tests__/ # Testes com Jest (jest-ts)
│   │  ├── services/
│   │  ├── schema/
│   │  ├── routes/
│   │  ├── prisma.ts
│   │  └── server.ts
│
├── frontend/            # Aplicacao React + Next.js
│   ├── src/
│   │   ├── app/
│   │   │    ├── layout.tsx
│   │   │    ├── page.tsx
│   │   ├── components/
│   │   ├── types/
│   │   ├── services/
│   │   └── app.module.ts
│
├── docker-compose.yml   # Orquestracao dos containers
├── .gitignore
└── README.md
```

## ⚙️ Como Executar o Projeto

### Pré-requisitos

* [Docker](https://www.docker.com/get-started) instalado
* [Docker Compose](https://docs.docker.com/compose/install/) instalado
* [Node](https://nodejs.org/pt) instalado

### Passos para rodar

1. Clone o repositório:

```bash
git clone https://github.com/CarlosHenri05/crud-clientes.git
cd crud-clientes
```

2. Inicie os containers com:

```bash
docker-compose up --build
```

3. Acesse a aplicação:

* Frontend: [http://localhost:4200](http://localhost:3001)
* API Backend: [http://localhost:3000](http://localhost:3000)
* Documentação do backend: [http://localhost:3000/docs](http://localhost:3000/docs)

> O banco de dados estará acessível internamente via `mysql:3306` com credenciais configuradas no `docker-compose.yml`.

## 🧪 Testes

O backend dessa aplicação possui testes unitários feitos em Jest (Typescript), seguindo as práticas do TDD. 

## 📷 Fotos da aplicação

![printquatro](https://github.com/user-attachments/assets/5b57aeee-23d3-453f-bb64-11689dc7454d)
![printum](https://github.com/user-attachments/assets/b81dc82e-8be3-4f09-8100-c149ebd452cf)
![printdois](https://github.com/user-attachments/assets/cf5005af-721c-43cf-9673-527dac6a5676)
![printtres](https://github.com/user-attachments/assets/843cd328-d728-4e88-9041-31208ae4032b)
![image](https://github.com/user-attachments/assets/2b349702-2c85-47e7-a7fd-9986a2db647d)



---

Se este projeto foi útil para você, deixe uma ⭐ no repositório!
