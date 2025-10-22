# 🏡 Welhome: Gerenciamento de Imóveis

O **Welhome** é uma aplicação completa (Full Stack) desenvolvida para gerenciar um catálogo de imóveis. Ela implementa as funcionalidades básicas de **CRUD** (Create, Read, Update, Delete) de forma eficiente e modular.

O projeto é totalmente conteinerizado, garantindo um ambiente de desenvolvimento e produção consistente e fácil de configurar através do **Docker Compose**.

---

## 💻 Tecnologias Utilizadas

### Frontend (SPA)

| Tecnologia | Descrição                                                |
| ---------- | -------------------------------------------------------- |
| Next.js    | Framework React para construção da interface de usuário. |
| TypeScript | Garante tipagem segura e melhor manutenção do código.    |

### Backend (API REST)

| Tecnologia        | Descrição                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| Node.js (Express) | Servidor leve e rápido para a API REST.                                                            |
| Prisma ORM        | ORM moderno para acesso e manipulação do banco de dados.                                           |
| SQLite            | Banco de dados leve e embarcado, utilizado para persistência dos dados no ambiente conteinerizado. |

### Orquestração

| Tecnologia     | Descrição                                                       |
| -------------- | --------------------------------------------------------------- |
| Docker         | Para construir imagens portáteis dos serviços.                  |
| Docker Compose | Para orquestrar o frontend, backend e rede em um único comando. |

---

## 🚀 Como Rodar o Projeto com Docker Compose

Siga os passos abaixo para colocar o Welhome no ar em menos de um minuto.

### Pré-requisitos

* Docker e Docker Compose instalados em seu sistema operacional.

### 1. Clonar o Repositório

```bash
git clone https://github.com/Vinicius-Rodriguess/case_welhome.git
cd welhome
```

### 2. Executar o Projeto

```bash
docker-compose up --build -d
```

* O comando `--build` garante que as imagens mais recentes sejam criadas (especialmente importante na primeira vez).
* O flag `-d` executa os contêineres em modo **detached** (segundo plano).

### 3. Acompanhamento e Logs

```bash
docker-compose logs -f
```

* O serviço backend aplica as migrações do Prisma (`npx prisma migrate deploy`) antes de iniciar o servidor Express.
* O frontend aguarda o backend estar ativo para iniciar.

### 4. Acessar a Aplicação

**Acesso Local:**

| Serviço            | Porta | URL de Acesso                                  |
| ------------------ | ----- | ---------------------------------------------- |
| Frontend (Next.js) | 3000  | [http://localhost:3000](http://localhost:3000) |
| Backend (API)      | 8080  | [http://localhost:8080](http://localhost:8080) |

**Acesso em Produção (AWS EC2):**

* Você também pode acessar o frontend pelo link do deploy na EC2:

```text
http://3.130.110.199:3000/
```

### 5. Finalizar a Execução

```bash
docker-compose down
```

> Remove contêineres, redes e volumes (exceto o volume persistente do banco de dados).

---

## 📂 Estrutura do Projeto

```text
.
├── 📁 back_end/       # Serviço de API (Node/Express/Prisma)
│   ├── 📁 prisma/     # Arquivos de schema e migrações do banco de dados
│   ├── 📁 src/        # Código-fonte da API
│   ├── 🐳 Dockerfile  # Instruções de build e execução do backend
│   └── 📄 docker-entrypoint.sh # Script para rodar migrações antes de iniciar
├── 📁 front_end/      # Interface de Usuário (Next.js)
│   ├── 📁 public/     # Assets estáticos (imagens, ícones)
│   ├── 📁 src/        # Componentes, páginas e lógica Next.js
│   └── 🐳 Dockerfile  # Build em duas fases para otimização da imagem final
└── ⚙️ docker-compose.yml # Arquivo de orquestração que define os serviços e a rede
```

---

## 💾 Persistência de Dados

O serviço backend utiliza um **volume nomeado** (`welhome-db-data`) para persistir o arquivo SQLite (`dev.db`).

* Mesmo após `docker-compose down` / `docker-compose up`, os dados de imóveis cadastrados não serão perdidos.
