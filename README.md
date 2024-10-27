# Frontend Challenge

Este projeto é uma aplicação frontend construída em Angular, que inclui funcionalidades como login, gerenciamento de usuários e controle de pagamentos. O propósito deste projeto é demonstrar habilidades com Angular e boas práticas de desenvolvimento em uma aplicação CRUD com autenticação e manipulação de dados.

## Funcionalidades do Projeto

- **Autenticação de usuário**: Tela de login com verificação de credenciais.
- **Gerenciamento de contas**: Adicionar, editar, visualizar e remover usuários.
- **Controle de pagamentos**: Adicionar, editar, visualizar e remover registros de pagamentos.
- **Interação com API simulada**: Uso do `JSON Server` para simular uma API RESTful.
- **Pesquisa e Ordenação de Dados**: Pesquisa de registros diretamente na tabela e opção para ordenar colunas para uma melhor visualização dos dados.

## Pré-requisitos

Para rodar este projeto, você precisa ter os seguintes itens instalados:

- **Node.js** (versão 14 ou superior)
- **npm** (geralmente incluído com o Node.js)
- **Angular CLI** (versão 18.2 ou superior)

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/belamacedo/frontend-challenge.git
   cd frontend-challenge
   ```

2. **Instale as dependências do projeto:**:
   ```bash
   npm install
   ```

## Executando o Projeto

### Servidor de Desenvolvimento

Para rodar o projeto no modo de desenvolvimento, use o seguinte comando:

```bash
   ng serve
```

Isso iniciará o servidor Angular na porta 4200 por padrão.

### Servidor da API Mock

O projeto utiliza o JSON Server para simular uma API. Para iniciar o servidor da API, execute:

```bash
   npm run dev:server
```

O servidor será iniciado na porta 3030 e fornecerá uma API RESTful mock que simula os dados do sistema.

## Tecnologias Utilizadas

O projeto foi desenvolvido usando as seguintes tecnologias e bibliotecas:

- **Angular 18.2**: Framework principal para construção do frontend.
- **Angular Material**: Conjunto de componentes de UI para Angular.
- **RxJS**: Programação reativa e manipulação de dados assíncronos.
- **JSON Server**: Utilizado como API mock para simular operações de backend.
- **SASS**: Pré-processador de CSS, utilizado para facilitar a escrita de estilos com mais eficiência.
