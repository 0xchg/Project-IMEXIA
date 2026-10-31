# Project-IMEXIA

Learning React while building the institutional website for IMEXIA.

## Conceitos revistos

### 1. Componente

Um componente é uma parte reutilizável da interface. Em React, normalmente é uma
função que devolve JSX, isto é, uma descrição do que deve ser apresentado no
ecrã.

```tsx
function Welcome() {
  return <h1>Bem-vindo à IMEXIA!</h1>
}
```

#### Por que é importante?

- Divide uma interface grande em partes pequenas e fáceis de compreender.
- Permite reutilizar a mesma estrutura em vários locais.
- Facilita a manutenção e os testes, porque cada componente tem uma
  responsabilidade mais específica.

Um componente pode ser utilizado dentro de outro componente:

```tsx
function App() {
  return (
    <main>
      <Welcome />
      <p>Conteúdo da página</p>
    </main>
  )
}
```

Os nomes dos componentes começam por letra maiúscula. Assim, `<Welcome />` é
reconhecido como um componente React, enquanto elementos como `<p>` são
elementos HTML.

### 2. Propriedades (props)

Propriedades são valores enviados de um componente pai para um componente filho.
Funcionam de forma semelhante aos argumentos de uma função e permitem que o
componente seja configurado e reutilizado.

```tsx
type PostProps = {
  text: string
}

function Post({ text }: PostProps) {
  return <p>{text}</p>
}

function App() {
  return (
    <>
      <Post text="Primeiro post" />
      <Post text="Segundo post" />
    </>
  )
}
```

#### Regras básicas das props

- As props são somente de leitura: o componente filho não deve alterá-las.
- Podem conter strings, números, booleanos, arrays, objetos e até funções.
- Em TypeScript, é recomendável definir o tipo das props para evitar valores
  inválidos.
- Uma prop especial chamada `children` permite passar conteúdo entre a abertura
  e o fecho de um componente.

No projeto, o componente [`Post`](./website-institucional/src/components/Post.tsx)
recebe a prop `text` e apresenta o seu valor.

### 3. Estado (state)

O estado é a informação interna e dinâmica de um componente. Quando o estado
muda, React renderiza novamente o componente para atualizar a interface.

O estado é criado normalmente com o hook `useState`:

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Cliques: {count}
    </button>
  )
}
```

`count` é o valor atual e `setCount` é a função utilizada para o atualizar.
Não se deve alterar o valor diretamente, por exemplo, `count++`; deve-se usar
sempre a função de atualização.

#### Estado no projeto

No componente `App`, o estado guarda a lista de posts:

```tsx
const [posts, setPosts] = useState<string[]>([
  'Post 1',
  'Post 2',
  'Post 3',
])

function createPost() {
  setPosts([...posts, 'Post 4'])
}
```

O operador `...` cria uma nova lista em vez de modificar a lista original.
Criar um novo array ou objeto é importante para que React detete a alteração.

#### Regras e ideias essenciais sobre estado

- O estado pertence ao componente onde foi criado.
- Para partilhar dados, o estado pode ser elevado para um componente pai e
  enviado aos filhos através de props.
- Atualizações de estado podem ser agrupadas; não se deve depender de uma
  atualização ser aplicada imediatamente.
- Para atualizações baseadas no valor anterior, é mais seguro usar a forma
  funcional:

  ```tsx
  setCount(previousCount => previousCount + 1)
  ```

### Como estes conceitos trabalham juntos

Uma aplicação React costuma seguir este fluxo:

1. Um componente pai mantém o estado.
2. O pai envia dados aos componentes filhos através de props.
3. Um filho pode receber uma função como prop para pedir uma alteração.
4. O pai atualiza o estado e React renderiza novamente a interface.

Ao renderizar listas, cada item deve ter uma `key` estável para que React possa
identificar corretamente os elementos:

```tsx
{posts.map(post => (
  <Post key={post} text={post} />
))}
```

As `keys` devem ser únicas entre os irmãos e não devem ser geradas
aleatoriamente a cada renderização.

## 4. Estilização

A estilização define a aparência dos componentes: cores, tamanhos, espaçamento,
fontes, alinhamento e comportamento visual. Em React, o CSS continua a ser
utilizado, mas as classes são aplicadas através do atributo `className`, e não
`class`.

### CSS global

Uma forma simples é criar um ficheiro CSS e importá-lo no componente ou no
ponto de entrada da aplicação:

```tsx
import './App.css'

function App() {
  return <h1 className="title">Website IMEXIA</h1>
}
```

```css
.title {
  color: #124;
  font-size: 2rem;
}
```

Os estilos definidos desta forma podem afetar qualquer elemento que utilize a
mesma classe. No projeto, [`App.css`](./website-institucional/src/App.css)
define, por exemplo, a cor de fundo, a cor do texto e a fonte da página.

### Estilos inline

Também é possível passar um objeto JavaScript para a propriedade `style`. Os
nomes das propriedades CSS usam camelCase:

```tsx
function Button() {
  const buttonStyle = {
    backgroundColor: '#124',
    color: 'white',
    padding: '8px 16px',
  }

  return <button style={buttonStyle}>Enviar</button>
}
```

Esta abordagem é útil para valores dinâmicos ou estilos muito específicos, mas
não substitui o CSS para folhas de estilo maiores. No `style`, propriedades com
valores numéricos geralmente representam pixels, enquanto outras unidades
devem ser escritas como strings, como `'1rem'` ou `'50%'`.

### Classes condicionais

Como classes são strings, podem ser escolhidas com base em props ou estado:

```tsx
type MessageProps = {
  isError: boolean
}

function Message({ isError }: MessageProps) {
  const className = isError ? 'message error' : 'message success'

  return <p className={className}>Operação concluída</p>
}
```

Isto permite que a interface reaja a alterações de estado sem duplicar o
componente:

```css
.message {
  padding: 8px;
}

.error {
  color: crimson;
}

.success {
  color: seagreen;
}
```

### CSS Modules

Quando muitos componentes possuem classes com nomes semelhantes, CSS Modules
ajuda a evitar conflitos. Um ficheiro com o nome `Button.module.css` tem classes
com escopo local:

```tsx
import styles from './Button.module.css'

function Button() {
  return <button className={styles.primary}>Continuar</button>
}
```

```css
.primary {
  background-color: #124;
  color: white;
}
```

O nome `primary` é transformado num nome único durante a compilação, evitando
que o estilo de um componente afete acidentalmente outro.

### Boas práticas

- Prefira classes CSS para estilos reutilizáveis e estilos inline para valores
  realmente dinâmicos.
- Use nomes de classes descritivos e relacionados à função ou ao componente.
- Separe estrutura, comportamento e apresentação: JSX organiza a interface,
  enquanto CSS define a aparência.
- Organize os estilos por componente à medida que a aplicação cresce.
- Verifique o comportamento em diferentes tamanhos de ecrã e mantenha contraste
  suficiente entre texto e fundo.
