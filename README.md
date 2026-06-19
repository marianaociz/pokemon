<p align="center"> <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" width="300"> </p> 

# 🎮 Sobre o Projeto

O PokéBattle Arena é uma aplicação mobile onde os usuários podem:

✅ Criar uma conta

✅ Realizar login

✅ Visualizar sua Pokédex

✅ Montar equipes com até 5 Pokémon

✅ Participar de batalhas em equipe

✅ Ganhar novos Pokémon ao vencer batalhas

✅ Acompanhar seu histórico de vitórias e derrotas

✅ Visualizar estatísticas dos Pokémon

---

# 🏗️ Tecnologias Utilizadas

* React Native
* Expo
* TypeScript
* Expo Router
* AsyncStorage
* Context API
* PokéAPI
* React Navigation

---

# 🚀 Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/marianaociz/pokemon
```

## 2. Instalar dependências

```bash
npm install
```

ou

```bash
yarn install
```

## 3. Executar o projeto

```bash
npx expo start
```

---

# 📁 Estrutura das Pastas

O projeto está organizado da seguinte forma:

```bash
src/
├── app/
│   ├── (app)/
│   │   ├── pokedex/
│   │   │   └── index.tsx
│   │   ├── battle.tsx
│   │   ├── dashboard.tsx
│   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   ├── perfil.tsx
│   │   └── team.tsx
│   │
│   ├── (auth)/
│   │   ├── index.tsx
│   │   └── register.tsx
│   │
│   ├── index.tsx
│   └── _layout.tsx
│
├── components/
│   ├── alerta/
│   ├── button/
│   ├── card/
│   │   └── card.tsx
│   │       → Utilizado nas páginas de login e cadastro
│   ├── header/
│   ├── input/
│   ├── list/
│   ├── pokemon-card/
│   │   ├── index.tsx
│   │   └── styles.ts
│   └── pokemon-details/
│       ├── index.tsx
│       ├── pokedex.ts
│       └── styles.ts
│
├── constants/
│   ├── colors.ts
│   └── pokemon.ts
│
├── context/
│   └── authcontext.tsx
│
├── integration/
│   └── pokemonintegration.ts
│
├── authintegration/
│
├── styles/
│   ├── out.css
│   ├── batalha.css
│   ├── index.css
│   ├── perfil.css
│   └── time.css
│
└── types/
    └── pokemon.ts
```
---

# 🔐 Regras de Autenticação

## Login

O usuário somente consegue realizar login caso esteja previamente cadastrado.

Caso tente acessar utilizando credenciais inexistentes, o acesso será negado.

---

## Logout

O usuário somente será desconectado caso clique explicitamente no botão:

```text
Sair
```

A aplicação mantém a sessão ativa através do armazenamento local.

---

# 📝 Cadastro de Usuários

Para criar uma conta, o usuário deve informar um nome de usuário e senha.

O sistema realiza uma validação para garantir que não existam usuários duplicados.

## Regras

✅ É possível criar uma conta com um nome de usuário novo.

❌ Não é possível criar uma conta utilizando um nome de usuário que já esteja cadastrado.

Caso o usuário tente se cadastrar com um nome já existente, o sistema exibirá uma mensagem de erro informando que aquele nome de usuário já está em uso.

Essa validação foi implementada para garantir a unicidade dos usuários cadastrados na aplicação.

---

## Proteção de Rotas

As telas internas do aplicativo somente podem ser acessadas por usuários autenticados.

Se o usuário não estiver logado:

* Não acessa Pokédex
* Não acessa Equipe
* Não acessa Perfil
* Não acessa Batalhas

---

# 👤 Perfil

A foto exibida no perfil é gerada automaticamente através de uma API externa, talvez demore um pouco para carregar, mas se atualizar
a pagina ela aparecerá normalmente.

Isso significa que:

* A imagem é aleatória
* Pode mudar ao atualizar os dados
* Não é uma foto fixa armazenada no sistema

---

# ⚔️ Sistema de Batalhas

<p align="center"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/144.gif" width="120"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/145.gif" width="120"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/146.gif" width="120"> </p>

O sistema de batalhas funciona exclusivamente em modo:

## Batalha em Equipe

O usuário deve:

1. Entrar na tela Equipe
2. Selecionar exatamente 5 Pokémon
3. Clicar em:

```text
Batalha em Equipe
```

4. Será redirecionado para a Arena de Batalha

---

## Modos de Ataque

Durante a batalha existem dois botões:

### ⚔️ Atacar

Permite que o jogador controle manualmente cada ataque.

---

### 🤖 Auto

Permite que a batalha aconteça automaticamente até que haja um vencedor.

---

# 🏆 Sistema de Recompensas

Ao vencer uma batalha:

* O usuário recebe experiência (XP)
* O usuário ganha um novo Pokémon aleatório

O sistema impede que:

* Pokémon repetidos sejam entregues
* Pokémon da equipe base sejam entregues novamente

---
 <p align="center"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif" width="180"> </p> 

# 📊 Sistema de Estatísticas

Cada Pokémon possui:

* HP
* Attack
* Defense
* Special Attack
* Special Defense
* Speed

As estatísticas são exibidas visualmente através de barras.

---

# ⭐ Pokémon Especiais

Alguns Pokémon exibidos na Pokédex possuem:

* ✨ Ícone de estrela
* ✨ Cards com efeito visual diferenciado (brilho)

Esses Pokémon são classificados como Pokémon especiais, trazendo mais destaque visual dentro da Pokédex.

---

# 🧭 Navegação do Sistema

Na tela de Pokédex existe um botão de voltar, que redireciona o usuário para a Dashboard.

Na Dashboard o usuário pode escolher entre:

👤 Acessar o Perfil
📘 Acessar a Pokédex

Além disso, o sistema também permite navegação livre pela navbar, sem necessidade de depender apenas dos botões internos das telas.

---

# 🎯 Fluxo Esperado do Sistema

```text
Login
   ↓
Pokédex
   ↓
Equipe
   ↓
Selecionar 5 Pokémon
   ↓
Batalha em Equipe
   ↓
Vitória
   ↓
Novo Pokémon
```

---

# 🛠️ Possíveis Problemas e Soluções

## Erro ao iniciar projeto

### Solução

```bash
npm install
```

Depois:

```bash
npx expo start
```

---

## Dependências não encontradas

### Solução

Remover node_modules:

```bash
rm -rf node_modules
```

Instalar novamente:

```bash
npm install
```

---

## Cache do Expo corrompido

### Solução

```bash
npx expo start -c
```

---

## Problemas com versões

Verificar versões instaladas:

```bash
node -v
npm -v
```

Recomendado utilizar versões compatíveis com a versão do Expo utilizada no projeto.

---

## AsyncStorage com dados antigos

Caso algum Pokémon apresente dados incorretos por conta de testes:

Limpar armazenamento local:

```bash
npx expo start -c
```

ou remover os dados do aplicativo instalado no dispositivo.

---

# 👩‍💻 Desenvolvedoras

Projeto desenvolvido como atividade acadêmica utilizando conceitos de:

* Desenvolvimento Web
* React Native
* APIs REST
* Gerenciamento de Estado
* Autenticação
* Navegação
* Armazenamento Local

---
<p align="center"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/133.gif"> </p>

<div align="center"> <h4>Tecnologias utilizadas:</h4>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" height="40" width="40" /> <img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg" height="40" width="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg" height="40" width="40" /> <img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="40" width="40" /> </div>


