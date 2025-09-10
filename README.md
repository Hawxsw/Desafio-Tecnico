# Desafio Técnico - Vaga Front-End

Este repositório contém uma aplicação Next.js desenvolvida como parte de um desafio técnico para uma vaga de Front-End. O projeto implementa um sistema de CRUD de produtos integrado a um dashboard de métricas, seguindo boas práticas de desenvolvimento, organização de código e uso de tecnologias modernas da stack proposta.

## 🚀 Tecnologias Utilizadas

*   **Next.js:** Framework React para aplicações web com renderização no lado do servidor (SSR) e rotas de API.
*   **React.js:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **Zustand:** Uma solução de gerenciamento de estado leve e flexível.
*   **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
*   **Zod:** Biblioteca para validação de esquemas e formulários.
*   **Hero UI:** Componentes de interface de usuário para uma experiência visual consistente.
*   **Recharts:** Biblioteca de gráficos para visualização de dados.

## ✨ Funcionalidades Implementadas

*   **Autenticação:** Rotas de login e cadastro para autenticação de usuários.
*   **CRUD de Produtos:**
    *   Criação de novos produtos com Título, Descrição e Thumbnail (upload de imagem).
    *   Edição de produtos existentes.
    *   Exclusão de produtos.
    *   Listagem paginada de produtos.
    *   Validação de campos utilizando Zod.
*   **Dashboard de Métricas:**
    *   Gráficos de vendas por categoria, vendas totais, crescimento de usuários e receita semanal (dados mockados).

## 💡 Diferenciais

*   **Dark Mode:** Suporte a tema escuro para uma melhor experiência do usuário em diferentes ambientes.
*   **Organização do Projeto:** Estrutura de pastas clara e modular, separando componentes, stores, serviços e páginas para facilitar a manutenção e escalabilidade.

## 📦 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

### Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior) e um gerenciador de pacotes (npm, yarn, pnpm ou bun) instalados.

### Instalação

1.  Clone este repositório:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd Desafio-Tecnico
    ```
2.  Instale as dependências do projeto:
    ```bash
    pnpm install
    # ou npm install
    # ou yarn install
    # ou bun install
    ```

### Execução

1.  Inicie o servidor de desenvolvimento:
    ```bash
    pnpm dev
    # ou npm run dev
    # ou yarn dev
    # ou bun dev
    ```
2.  Abra seu navegador e acesse: `http://localhost:3000`

## 📄 Estrutura do Projeto

```
.
├── public/             # Arquivos estáticos
├── src/
│   ├── app/            # Rotas e páginas Next.js
│   │   ├── (auth)/     # Rotas de autenticação (signin, signup)
│   │   ├── (dashboard)/# Rotas do dashboard (produtos, métricas)
│   │   └── (main)/     # Página principal
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── features/   # Componentes específicos de funcionalidades (auth, dashboard, product)
│   │   ├── product-table/ # Componentes da tabela de produtos
│   │   ├── shadcn/     # Componentes Shadcn UI (se usados como base/wrapper)
│   │   └── shared/     # Componentes compartilhados (header, menu)
│   ├── lib/            # Utilitários, hooks, schemas (Zod)
│   │   ├── dashboard/  # Dados mockados para o dashboard
│   │   ├── hooks/      # Hooks personalizados
│   │   ├── products/   # Esquemas de produtos (Zod)
│   │   └── user/       # Esquemas de usuário (Zod)
│   ├── services/       # Serviços de API (axios)
│   │   └── clients/    # Clientes de serviço (auth, product, user)
│   └── stores/         # Stores Zustand para gerenciamento de estado
├── .gitignore          # Arquivos e pastas a serem ignorados pelo Git
├── biome.json          # Configuração do Biome (linter/formatter)
├── components.json     # Configuração de componentes (possivelmente Shadcn UI)
├── next.config.ts      # Configuração do Next.js
├── package.json        # Dependências e scripts do projeto
├── pnpm-lock.yaml      # Lock file do pnpm
├── postcss.config.js   # Configuração do PostCSS
├── tailwind.config.js  # Configuração do Tailwind CSS
├── tsconfig.json       # Configuração do TypeScript
└── README.md           # Este arquivo
```

---