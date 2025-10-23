# ReciclaWeb - Projeto Borboleta (NextJS)

## 1. Visão Geral do Projeto

O **ReciclaWeb - Projeto Borboleta** é uma transformação do projeto original, agora desenvolvido com Next.js 14, React 18 e TypeScript. Esta versão traz melhorias significativas na arquitetura, desempenho e manutenibilidade do código, mantendo o foco na conscientização sobre reciclagem e coleta seletiva.

## 2. Caráter Extensionista

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O ReciclaWeb - Projeto Borboleta foi concebido como uma ferramenta de extensão universitária, visando promover a conscientização ambiental e a educação para a sustentabilidade através da tecnologia. Este projeto se alinha com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, em especial o ODS 11 (Cidades e Comunidades Sustentáveis) e o ODS 12 (Consumo e Produção Responsáveis).

### 2.1 Impacto Social

- **Educação Ambiental**: Oferece uma plataforma interativa para aprendizagem sobre coleta seletiva e reciclagem
- **Acessibilidade**: Desenvolvido com práticas de acessibilidade para garantir que todos possam utilizar o jogo
- **Conscientização**: Promove a reflexão sobre os impactos do descarte incorreto de resíduos
- **Comunidade**: Pode ser utilizado por escolas, ONGs e instituições de ensino como ferramenta educacional

## 3. Tecnologias Utilizadas

- **Next.js 14**: Framework React para renderização híbrida estática e no servidor
- **React 18**: Biblioteca para construção de interfaces de usuário
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **CSS Modules**: Para estilização com escopo local
- **ESLint**: Ferramenta de análise estática para identificar padrões problemáticos
- **Git**: Controle de versão

## 4. Guia de Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Git (para clonar o repositório)

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd Projeto_Borboleta
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

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Constrói a aplicação para produção
- `npm start`: Inicia o servidor de produção (após o build)
- `npm run lint`: Executa o ESLint para análise de código

## 5. Arquitetura e Implementação do Projeto

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O ReciclaWeb foi desenvolvido utilizando Next.js 14 com TypeScript, aproveitando os recursos mais recentes do framework, como o App Router, Server Components e Server Actions. A seguir, detalhamos os principais componentes e sua funcionalidade.

### 5.1 Estrutura de Arquivos e Componentes

#### `src/app/layout.js` - Estrutura Base da Aplicação

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

#### `src/app/page.js` - Página Inicial

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
- Gerencia a navegação entre slides com funções específicas

#### `src/app/game/page.tsx` - Jogo de Classificação

```typescript
'use client';

import { useState, useEffect } from 'react';
import { gameData, MAX_GAME_SCORE } from '../data/trashCategories';
import { GameItem } from '../types';

export default function Game() {
  const [gameScore, setGameScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  // Inicializa o jogo
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setGameScore(0);
    setGameItems([...gameData]);
    newItem();
  };

  const newItem = () => {
    if (gameScore === MAX_GAME_SCORE) {
      showMaxScoreFeedback();
      return;
    }

    let availableItems = gameItems.length > 0 ? gameItems : [...gameData];
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const selectedItem = availableItems[randomIndex];
    
    setCurrentItem(selectedItem);
    setGameItems(prev => prev.filter((_, index) => index !== randomIndex));
  };

  // ...
}
```

**Explicação:**
- Implementa a lógica principal do jogo de classificação de resíduos
- Utiliza TypeScript para tipagem estática e melhor manutenibilidade
- Gerencia o estado do jogo com hooks do React
- Implementa a lógica de seleção aleatória de itens e verificação de respostas

### 5.2 Gerenciamento de Estado e Tipagem

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

### 5.3 Estrutura de Dados

Os dados do jogo são armazenados em `src/data/trashCategories.ts`, incluindo:

- Categorias de lixo com suas propriedades
- Itens de jogo com suas classificações
- Constantes como pontuação máxima

### 5.4 Estilização

A estilização é feita com CSS Modules, o que garante escopo local para os estilos. O projeto utiliza variáveis CSS para cores e espaçamentos, definidas em `src/app/globals.css`.

### 5.5 Navegação

A navegação entre páginas é feita com o componente `Link` do Next.js, que permite navegação client-side sem recarregamento da página, melhorando a experiência do usuário.

## 6. Desafios e Aprendizados

### Desafios Técnicos

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

### Aprendizados

- **Next.js 14**: Domínio dos novos recursos como Server Actions, Metadata API e melhorias no App Router
- **TypeScript**: Tipagem estática para melhor manutenibilidade e detecção de erros
- **Arquitetura**: Melhores práticas de organização de código em projetos React/Next.js
- **Acessibilidade**: Implementação de práticas de acessibilidade para tornar o jogo mais inclusivo

## 7. Melhorias Futuras

### Próximos Passos

1. **Implementação de API**
   - Desenvolver endpoints para armazenar pontuações dos jogadores
   - Implementar imagens de lixeiras, itens e fundo

2. **Melhorias na Interface**
   - Adicionar animações mais suaves
   - Melhorar a responsividade para dispositivos móveis
   - Incluir mais feedback visual durante o jogo

3. **Conteúdo Adicional**
   - Adicionar mais itens de lixo
   - Incluir dicas sobre reciclagem
   - Criar diferentes níveis de dificuldade

4. **Estrutura**
   - Organizar melhor a estrutura das pastas do projeto
   

## 8. Considerações Finais

O Projeto Borboleta representa um avanço significativo em relação à versão anterior, trazendo uma base sólida para desenvolvimento contínuo. A migração para Next.js 14 e TypeScript proporcionou uma base mais robusta e escalável, permitindo a implementação de novos recursos com maior confiabilidade.

Acreditamos que esta aplicação tem grande potencial para impactar positivamente a conscientização sobre reciclagem, combinando educação e entretenimento de forma acessível e envolvente.

---

**Desenvolvido por**: João Vitor Tortorello e Eduardo Augusto Clara Olivato  
**Disciplina**: Web Mobile  
**Semestre**: 2025.2  
**Instituição**: Universidade Presbiteriana Mackenzie
