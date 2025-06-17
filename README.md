# MecanicaOficializada-FrontEnd

## Descrição do Projeto

Este projeto **Front-End Angular 19** foi desenvolvido para o Projeto Integrador do 5º período do curso de Engenharia de Software. Ele tem como objetivo principal o **gerenciamento de ordens de serviço** para uma oficina mecânica.

---

## ⚙️ Funcionalidades Principais

O sistema oferece as seguintes funcionalidades para gerenciar operações de oficina mecânica:

-   **Cadastro de Entidades:**
  -   Marcas de veículos
  -   Modelos de veículos
  -   Veículos
  -   Peças
  -   Serviços
  -   Clientes (Pessoa Física e Jurídica)
-   **Gerenciamento de Ordens de Serviço (OS):** Criação, edição, visualização e acompanhamento do status das OS.
-   **Relatório Gerencial:** Geração de relatório para análise de desempenho e tomada de decisões.

---

## 🛠️ Requisitos Técnicos

Para executar este projeto localmente, você precisará dos seguintes softwares:

-   **NodeJs:** Versão **18** ou superior.

-   **Angular** Versão **18**
---


## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para clonar e executar o projeto em sua máquina:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/Jmauro10/MecanicaEspecializada-FrontEnd.git](https://github.com/Jmauro10/MecanicaEspecializada-FrontEnd.git)
    ```

2.  **Acesse o Diretório do Projeto:**
    ```bash
    cd MecanicaEspecializada-FrontEnd
    ```

3.  **Instalar as dependências:**

    ```bash
    npm install --force
    ```
    Execute a aplicação em sua IDE de preferencia, a aplicação estará disponível em `http://localhost:4200` (porta padrão do Angular).

---

## 📂 Estrutura do Projeto

A organização do código segue as boas práticas de um projeto Angular, facilitando a navegação e o entendimento:

```
Markdown

# 📂 Estrutura do Projeto

A organização do código segue as boas práticas de um projeto Angular e padrões de design comuns, facilitando a navegação e o entendimento:

MecanicaEspecializada-FrontEnd/
│
├── .angular/                  # Arquivos de build e cache do Angular
├── .idea/                     # Configurações do projeto para IDE (ex: WebStorm/IntelliJ)
├── node_modules/              # Dependências externas do projeto (gerenciado pelo npm)
├── public/                    # Arquivos públicos/estáticos (imagens, fontes, etc)
└── src/                       # Código-fonte principal da aplicação
    ├── app/                   # Módulo principal da aplicação Angular
    │   ├── adapter/           # Adaptações e tratadores de dados/API
    │   ├── componentes/       # Componentes de interface e funcionalidades
    │   │   ├── cliente-list/              # Listagem de clientes
    │   │   ├── funcionario-list/          # Listagem de funcionários
    │   │   ├── marca-list/                # Listagem de marcas
    │   │   ├── modelo-list/               # Listagem de modelos
    │   │   ├── ordem-servico-formulario/  # Formulário de ordem de serviço
    │   │   ├── ordem-servico-list/        # Listagem de ordens de serviço
    │   │   ├── ordemservico-detalhes/     # Detalhamento da ordem de serviço
    │   │   ├── peca-list/                 # Listagem de peças
    │   │   ├── relatorio-os-dashboard/    # Dashboard/relatórios OS
    │   │   ├── servico-list/              # Listagem de serviços
    │   │   └── veiculo-list/              # Listagem de veículos
    │   ├── models/                # Interfaces e modelos TypeScript
    │   ├── service/               # Serviços (integração com API, lógica de negócio)
    │   ├── app.component.css      # Estilos globais do componente principal
    │   ├── app.component.html     # Estrutura HTML do componente principal
    │   ├── app.component.ts       # Lógica do componente principal
    │   ├── app.config.server.ts   # Configuração do servidor
    │   ├── app.config.ts          # Configurações gerais do app
    │   └── app.routes.ts          # Rotas da aplicação
    │
    ├── index.html           # HTML principal do app Angular
    ├── main.server.ts       # Entrada da renderização server-side (Angular Universal)
    ├── main.ts              # Ponto de entrada principal da aplicação
    └── styles.css           # Estilos globais compartilhados
```

---

## 🤝 Guia de Contribuição

Ficamos felizes com o seu interesse em contribuir para o projeto! Para garantir um processo colaborativo e organizado, por favor, siga estas diretrizes:

### 1. Reportando Bugs

Antes de abrir uma nova issue, por favor, verifique se o bug já foi reportado em [Issues](https://github.com/Edielson062/MecanicaEspecializada-BackEnd/issues).

- Se não encontrar, abra uma nova issue, fornecendo uma descrição clara, passos para reproduzir o erro e, se possível, logs ou screenshots.

### 2. Sugerindo Melhorias

-   Abra uma nova issue com o título começando com `[Sugestão]`.
-   Descreva a melhoria proposta e explique por que ela seria benéfica para o projeto.

### 3. Submetendo Pull Requests (PRs)

Se você deseja contribuir com código, siga este fluxo:

1.  **Faça um Fork** do projeto para o seu próprio GitHub.
2.  **Crie uma Nova Branch** a partir da branch `main`. Utilize um nome descritivo para a sua branch (Ex: `feature/adicionar-relatorio-vendas`).
    ```bash
    git checkout -b feature/nome-da-sua-feature
    ```
3.  **Implemente suas Alterações.** Certifique-se de que seu código está bem comentado e segue as convenções do projeto.
4.  **Crie Commits Claros e Descritivos.** Cada commit deve representar uma alteração lógica única.
    ```bash
    git commit -m "feat: Adiciona funcionalidade de relatório de vendas"
    ```
5.  **Execute os Testes.** Garanta que todas as funcionalidades existentes continuam funcionando corretamente.
6.  **Envie suas Alterações** para o seu fork no GitHub:
    ```bash
    git push origin feature/nome-da-sua-feature
    ```
7.  **Abra um Pull Request (PR)** da sua branch no seu fork para a branch `main` do repositório original.
  -   Forneça uma **descrição clara e detalhada** das mudanças realizadas no PR.

Seu PR será revisado e feedback será fornecido. Agradecemos sua colaboração!
