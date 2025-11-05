# ReciclaWeb - Projeto Borboleta (NextJS)

## 1. Visão Geral do Projeto

O **ReciclaWeb - Projeto Borboleta** é uma aplicação web interativa desenvolvida com Next.js 14, React 18 e TypeScript, focada em educação ambiental e conscientização sobre reciclagem. O projeto combina um guia informativo sobre tipos de resíduos com um jogo educativo que ajuda os usuários a aprenderem de forma divertida a separar corretamente o lixo.

### 🎮 Funcionalidades

- **Jogo de Classificação de Resíduos**: Desafio interativo onde os jogadores devem classificar corretamente diferentes itens de lixo nas categorias apropriadas.
- **Sistema de Pontuação**: Acompanhamento do progresso com feedback imediato sobre acertos e erros.
- **Dicas de Reciclagem**: Informações úteis e dicas práticas para cada tipo de resíduo.
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela, funcionando bem em dispositivos móveis e desktop.
- **Estatísticas de Desempenho**: Feedback personalizado sobre o desempenho do usuário no jogo.
- **Animações e Feedback Visual**: Efeitos visuais que melhoram a experiência do usuário e fornecem feedback imediato.

## 2. Caráter Extensionista

O ReciclaWeb - Projeto Borboleta foi concebido como uma ferramenta de extensão universitária, visando promover a conscientização ambiental e a educação para a sustentabilidade através da tecnologia. Este projeto se alinha com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, em especial o ODS 11 (Cidades e Comunidades Sustentáveis) e o ODS 12 (Consumo e Produção Responsáveis).

### 2.1 Impacto Social

- **Educação Ambiental**: Oferece uma plataforma interativa para aprendizagem sobre coleta seletiva e reciclagem
- **Acessibilidade**: Desenvolvido com práticas de acessibilidade para garantir que todos possam utilizar o jogo
- **Conscientização**: Promove a reflexão sobre os impactos do descarte incorreto de resíduos
- **Comunidade**: Pode ser utilizado por escolas, ONGs e instituições de ensino como ferramenta educacional

## 3. Tecnologias Utilizadas

### 3.1 Principais Tecnologias
- **Next.js 14**: Framework React para renderização híbrida estática e no servidor
- **React 18**: Biblioteca para construção de interfaces de usuário
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **CSS Modules**: Para estilização com escopo local
- **ESLint**: Ferramenta de análise estática para identificar padrões problemáticos
- **Git**: Controle de versão

### 3.2 Design e Experiência do Usuário
- **Design Responsivo**: Adaptação para diferentes tamanhos de tela
- **Feedback Visual**: Animações e transições para melhorar a experiência do usuário
- **Interface Intuitiva**: Navegação simples e direta

## 4. Guia de Instalação e Execução

### 4.1 Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Git (para clonar o repositório)

### 4.2 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd Projeto_Borboleta/recicla-web
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em:
```
http://localhost:3000
```

### 4.3 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Constrói a aplicação para produção
- `npm start`: Inicia o servidor de produção (após o build)
- `npm run lint`: Executa o ESLint para análise de código

## 5. Estrutura do Projeto

O ReciclaWeb foi desenvolvido utilizando Next.js 14 com TypeScript, aproveitando os recursos mais recentes do framework, como o App Router, Server Components e Server Actions. A seguir, detalhamos os principais componentes do projeto.

### 5.1 Componentes Principais

#### 5.1.1 `Header.tsx` - Cabeçalho Responsivo

O componente Header é responsável pela navegação principal e é totalmente responsivo, com suporte a dispositivos móveis.

```tsx
// Componente Header - Responsável pela barra de navegação superior
const Header = () => {
  // Estado para controlar a visibilidade do menu móvel
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Efeito para fechar o menu quando a rota mudar
  // Melhora a experiência em dispositivos móveis
  useEffect(() => {
    const handleRouteChange = () => setIsMobileMenuOpen(false);
    // Adiciona um listener para o evento de mudança de rota
    window.addEventListener('routeChange', handleRouteChange);
    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener('routeChange', handleRouteChange);
  }, []);

  return (
    <header className="header">
      {/* Logo clicável que redireciona para a página inicial */}
      <Link href="/" className="logo" aria-label="Ir para a página inicial">
        ♻️ ReciclaWeb
      </Link>
      
      {/* Botão de alternância do menu móvel */}
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>
      
      {/* Navegação principal */}
      <nav 
        className={`nav ${isMobileMenuOpen ? 'active' : ''}`}
        aria-label="Navegação principal"
      >
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
        <Link href="/game" onClick={() => setIsMobileMenuOpen(false)}>Jogar</Link>
      </nav>
    </header>
  );
};
```

#### 5.1.2 `CategoryCard.tsx` - Card de Categoria

Componente que exibe as informações de cada tipo de lixo de forma visual e interativa, mostrando ícone, título, descrição e dicas de reciclagem.

```tsx
/**
 * Interface que define as propriedades do componente CategoryCard
 */
interface CategoryCardProps {
  // Objeto contendo as informações do tipo de lixo
  trashType: {
    id: string;           // Identificador único (ex: 'plastico', 'papel')
    icon: string;         // Ícone representativo (emoji)
    title: string;        // Título da categoria
    color: string;        // Cor temática em hexadecimal
    description: string;  // Descrição detalhada
    tip: string;         // Dica de reciclagem
  };
  // Indica se o card está ativo (usado para animações e destaque)
  isActive: boolean;
}

/**
 * Componente que renderiza um card informativo sobre um tipo específico de lixo
 * É usado no carrossel da página inicial para apresentar as categorias de reciclagem
 */
export default function CategoryCard({ trashType, isActive }: CategoryCardProps) {
  return (
    <div 
      className={`lixo-card ${trashType.id}${isActive ? ' active' : ''}`}
      role="article"
      aria-label={`Informações sobre ${trashType.title}`}
    >
      {/* Container do ícone com classe dinâmica para estilização específica */}
      <div 
        className={`lixo-icon ${trashType.id}`}
        aria-hidden="true"
      >
        {trashType.icon}
      </div>
      
      {/* Título da categoria com cor dinâmica */}
      <h3 style={{ color: trashType.color }}>
        {trashType.title}
      </h3>
      
      {/* Descrição da categoria */}
      <p className="lixo-description">
        {trashType.description}
      </p>
      
      {/* Dica de reciclagem com estilo especial */}
      <div className="lixo-tip" role="note">
        <span aria-hidden="true">💡</span> {trashType.tip}
      </div>
    </div>
  );
}
```

## 6. Páginas Principais

### 6.1 `layout.js` - Estrutura Base

```typescript
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ReciclaWeb - Educação Ambiental Digital",
  description: "Aprenda sobre reciclagem de forma interativa e divertida.",
  keywords: "reciclagem, educação ambiental, sustentabilidade, coleta seletiva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

**Explicação:**
- Define o layout raiz da aplicação com metadados para SEO
- Configura as fontes Geist e Geist Mono para uso em toda a aplicação
- Aplica o idioma português do Brasil como padrão
- Inclui os estilos globais através do `globals.css`

### 6.2 `page.js` - Página Inicial

A página inicial apresenta um carrossel interativo com as categorias de lixo, permitindo que os usuários naveguem entre elas para aprender sobre cada tipo de resíduo.

```jsx
'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import { lixoTypes } from './data/trashCategories';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Rotação automática do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lixoTypes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Header />
      <main>
        <h1>Conheça os Tipos de Lixo</h1>
        <div className="carousel">
          {lixoTypes.map((lixo, index) => (
            <CategoryCard 
              key={lixo.id}
              trashType={lixo}
              isActive={index === currentSlide}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
```

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import { lixoTypes } from './data/trashCategories';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efeito para rotação automática do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lixoTypes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % lixoTypes.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? lixoTypes.length - 1 : prev - 1));
  };

  // ...
}
```

**Explicação:**
- Implementa a página inicial com um carrossel interativo
- Utiliza hooks do React (`useState`, `useEffect`) para gerenciar o estado do carrossel
- Importa componentes reutilizáveis como `Header` e `CategoryCard`
- Utiliza TypeScript para tipagem estática e melhor manutenibilidade
- Gerencia o estado do jogo com hooks do React
- Implementa a lógica de seleção aleatória de itens e verificação de respostas

## 7. Estrutura de Dados

O projeto utiliza TypeScript para garantir a segurança de tipos e melhorar a manutenibilidade do código. O gerenciamento de estado é feito principalmente através dos Hooks do React, como `useState` e `useEffect`.

### 7.1 Tipos de Dados

Os tipos principais são definidos em `src/app/types/index.ts`:

```typescript
/**
 * Interface que define a estrutura de um item do jogo
 * Cada item representa um resíduo que o jogador precisa classificar
 */
export interface GameItem {
  item: string;      // Emoji ou representação visual
  type: string;      // Categoria do item (plastico, papel, etc.)
  name: string;      // Nome descritivo do item
}

// Tipo para as categorias de lixo
export interface TrashType {
  id: string;           // Identificador único
  icon: string;         // Ícone representativo
  title: string;        // Título da categoria
  color: string;        // Cor temática
  description: string;  // Descrição detalhada
  tip: string;         // Dica de reciclagem
}
```

### 7.2 Estrutura dos Dados

Os dados do jogo são armazenados em `src/app/data/trashCategories.ts`:

```typescript
import { TrashType, GameItem } from '../types';

export const lixoTypes: TrashType[] = [
  {
    id: 'plastico',
    icon: '🥤',
    title: 'PLÁSTICO - LIXEIRA VERMELHA',
    color: '#F44336',
    description: 'Garrafas PET, embalagens de produtos de limpeza, sacolas plásticas, etc.',
    tip: '💡 Lave as embalagens antes de descartar!'
  },
  // ... outras categorias
];

export const gameData: GameItem[] = [
  { item: '🍌', type: 'organico', name: 'Banana' },
  { item: '📄', type: 'papel', name: 'Papel' },
  // ... mais itens do jogo
];

export const MAX_GAME_SCORE = 10;

// Estilos globais
:root {
  --primary-color: #2E7D32;
  --secondary-color: #4CAF50;
  --text-color: #333;
  --white: #fff;
}

/* Estilos para o jogo */
.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Estilos para as lixeiras */
.bin {
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.bin:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

type TrashType = {
  id: string;
  icon: string;
  title: string;
  color: string;
  description: string;
  tip: string;
};

type GameItem = {
  item: string;
  type: string;
  name: string;
};

// Estados do Jogo
- `gameScore`: Armazena a pontuação atual do jogador
- `currentItem`: Item atual a ser classificado
- `gameItems`: Lista de itens disponíveis para o jogo
- `feedback`: Mensagens de feedback para o usuário

1. **Inicialização**:
   - Carregamento dos dados dos resíduos
   - Configuração do estado inicial do jogo
   - Seleção aleatória do primeiro item

2. **Jogabilidade**:
   - O usuário seleciona uma lixeira
   - O sistema verifica a resposta
   - Atualização da pontuação e feedback
   - Seleção de um novo item

3. **Finalização**:
   - Exibição de estatísticas
   - Opção de reiniciar o jogo
   - Compartilhamento de resultados

O projeto utiliza TypeScript para garantir a tipagem estática, melhorando a manutenibilidade e reduzindo erros em tempo de desenvolvimento. Os principais tipos são definidos em `src/types/index.ts`:

```typescript
export interface GameItem {
  id: number;
  name: string;
  type: 'plastico' | 'papel' | 'vidro' | 'metal' | 'organico';
  image: string;
  description: string;
  tips: string[];
}

export interface TrashCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  items: string[];
  description: string;
  tips: string[];
}
```

### 7.3 Organização dos Arquivos

Os dados do jogo são armazenados em `src/data/trashCategories.ts`, incluindo:

- Categorias de lixo com suas propriedades
- Itens de jogo com suas classificações
- Constantes como pontuação máxima

### 7.4 Estratégia de Estilização

A estilização é feita com CSS Modules, o que garante escopo local para os estilos. O projeto utiliza variáveis CSS para cores e espaçamentos, definidas em `src/app/globals.css`.

### 7.5 Gerenciamento de Navegação

A navegação entre páginas é feita com o componente `Link` do Next.js, que permite navegação client-side sem recarregamento da página, melhorando a experiência do usuário.

## 8. Desafios e Aprendizados

1. **Migração para Next.js 14**
   - Adaptação à nova estrutura de pastas do App Router
   - Implementação de Server Components e Client Components
   - Configuração do TypeScript com o Next.js

2. **Gerenciamento de Estado**
   - Decisão sobre quando usar estado local vs. estado global
   - Sincronização de estado entre o cliente e o servidor
   - Persistência de dados do jogo

3. **Otimização de Performance**
   - Carregamento preguiçoso (lazy loading) de componentes
   - Otimização de imagens com o componente `Image` do Next.js
   - Redução do tamanho do bundle

- **Next.js 14**: Domínio dos novos recursos como Server Actions, Metadata API e melhorias no App Router
- **TypeScript**: Tipagem estática para melhor manutenibilidade e detecção de erros
- **Arquitetura**: Melhores práticas de organização de código em projetos React/Next.js
- **Acessibilidade**: Implementação de práticas de acessibilidade para tornar o jogo mais inclusivo

## 9. Considerações Finais

O Projeto Borboleta representa um avanço significativo em relação à versão anterior, trazendo uma base sólida para desenvolvimento contínuo. A migração para Next.js 14 e TypeScript proporcionou uma base mais robusta e escalável, permitindo a implementação de novos recursos com maior confiabilidade.

Acreditamos que esta aplicação tem grande potencial para impactar positivamente a conscientização sobre reciclagem, combinando educação e entretenimento de forma acessível e envolvente.

---

**Desenvolvido por**: João Vitor Tortorello e Eduardo Augusto Clara Olivato  
**Disciplina**: Web Mobile  
**Semestre**: 2025.2  
**Instituição**: Universidade Presbiteriana Mackenzie
