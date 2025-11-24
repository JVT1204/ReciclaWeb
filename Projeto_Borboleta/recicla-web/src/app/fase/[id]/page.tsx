// NÃO coloque 'use client' aqui

export default async function FasePage({ params }) {
  const { id } = await params; // aqui a gente "desembrulha" a Promise

  return (
    <main className="main">
      <div className="container">
        <header className="header">
          <h1 className="logo">♻️ ReciclaWeb</h1>
          <p className="subtitle">Fase {id} do Jogo</p>
        </header>

        <section className="content">
          <h2 className="title">🎮 Jogo da Reciclagem</h2>
          <p className="description">
            Você está jogando a fase <strong>{id}</strong>.<br />
            (Esta tela vem de uma <strong>rota dinâmica</strong> do Next.js.)
          </p>
        </section>

        <footer className="footer">
          <p>Desenvolvido por João Vitor Tortorello e Eduardo Augusto Clara Olivato</p>
          <p>Web Mobile - 2025.2</p>
        </footer>
      </div>
    </main>
  );
}
