# Desafio Magazord

Este é o projeto criado para resolver o desafio propos pela Magazord

Projeto disponível em: https://test-magazord.vercel.app/

## Para rodar localmente, execute os seguintes comandos:

 - git clone https://github.com/borbabeats/test_magazord.git

 - cd test_magazord

 - npm i

 - npm run dev

 - Abra o navegador em https://localhost:3000


## O que o projeto faz?

  ### Home
  - Busca as informações do usuário logado no github e exibe image, nome, empresa, bio.
  - Busca os reposiórios publicos do usuário e exibe uma lista com seus nomes, stars e forks.
  - Apresenta 2 botões que filtram a lista para exibir todos os repositórios ou os repositórios marcados como favoritos.
  - Tem um campo de inserção para busca de repositórios por nome, sem precisar ser o nome completo. O filtro acontece após apertar "Enter". Para exibir todos novamente,  limpar o  campo e apertar Enter novamente
  - Ao clicar em um dos projetos, somos redirecionados para uma nova página.

  ### Detalhes do repositório 
  - Essa nova página exibe o nome do projeto, quantidade de estrelas, quantidade de forks e Issues abertas.
  - Também exibe uma lista com todos os commits do projeto e abaixo as informações das Issues abertas
  - Acima dos commits, temos um campo de inserção que filtra os commits pela palavra correspondente após digitar e clicar "Enter"

## Tecnologias usadas

  - NextJs;
  - ESLint;
  - Tailwind CSS; (Estilização)
  - Zustand; (Controle de estado global)
  - Tanstack Query (formalmente react query); (Cache)
  - TypeScript;
  - Octokit; (para handler da api do Github)
  - Material UI e Emotion react; (Para componentes)
  - React Icons;

## Desafios ao longo do caminho

  - Fazer a integração entre zustand (que já sou um pouco familiarizado) e react query (ainda não havia usado) levou tempo até entender;
  - Consumir a api do Github pode não ter sido tão desafiador, mas precisei de um tempo lendo a documentação para descobrir como fazer as chamadas;
  - Num futuro eu melhoraria o visual. 
    Apesar de seguir o padrão do github, eu trocaria o design para um menos minimalista, e usaria styled components ou sass modules que sou mais familiarizado.
  - Melhoraria a performance da aplicação, fazendo melhor proveito do cache;

## Estrutura do projeto

test_magazord/
|__ src/
|   |__ app/
|   |   |__ home/                       # Rotas
|   |   |   |__ [id]/                   # Pagina dos detalhes do Repositório
|   |   |   |   |__ page.tsx
|   |   |   |__ page.tsx                # Página inicial (/home)
|   |   |__ globals.css                 # Estilização
|   |   |__ layout.tsx        
|   |   |__ page.tsx                    # Página inicial (redirecionamento para /home)
|   |__ components/
|   |   |__ list_main/                  # Lista de repositórios
|   |   |   |__ index.tsx
|   |   |   |__ types.ts
|   |   |__ sidebar/                    # Informações do usuário logado
|   |   |   |__ index.tsx
|   |   |   |__ types.ts
|   |   |__ UI/ 
|   |   |   |__ button/
|   |   |   |   |__ index.tsx            # Botão customizado
|   |   |   |   |__ types.ts                        
|   |   |   |__ card/                    # Card com informações do repositório ou commit
|   |   |   |   |__ index.tsx
|   |   |   |   |__ types.ts
|   |   |   |__ header/                  # Cabeçalho
|   |   |   |   |__ index.tsx
|   |   |   |__ icons/                   # Ícones em svg vindos do figma
|   |   |   |   |__ enterpriseIcon.tsx
|   |   |   |   |__ forkIcon.tsx
|   |   |   |   |__ repoIcon.tsx
|   |   |   |   |__ starIcon.tsx
|   |   |   |__ loading/                  # Elemento de loading
|   |   |   |   |__ index.tsx
|   |__ hook/                             # React query para cache das informações
|   |   |__ useInfos.ts
|   |__ layout/
|   |   |__ homepage/                     # Layout da página inicial
|   |   |   |__ index.tsx
|   |   |__ repositorie/                  # Layout da página de detalhes do repositório
|   |   |   |__ index.tsx
|   |__ Provider/                         # Configuração 'use client' para uso do react query
|   |   |__ queryProvider.js
|   |__ store/                            # Gerenciamento de estado global
|   |   |__ stateStore.ts
|   |   |__ types.ts
|__ package.json                          # Dependências


