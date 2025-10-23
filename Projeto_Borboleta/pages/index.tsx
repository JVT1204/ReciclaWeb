import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>ReciclaWeb - Projeto Borboleta</title>
        <meta name="description" content="Educação ambiental através de tecnologia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        <div className="container">
          <header className="header">
            <h1 className="logo">
              ♻️ ReciclaWeb
            </h1>
            <p className="subtitle">Projeto Borboleta</p>
          </header>
          
          <section className="content">
            <h2 className="title">
              🗂️ Conheça os Tipos de Lixo
            </h2>
            <p className="description">
              Navegue pelas categorias e aprenda a separar corretamente cada resíduo 
              para contribuir com um planeta mais sustentável
            </p>
            
            <div className="categories">
              <div className="category">
                <div className="categoryIcon">🥤</div>
                <h3>PLÁSTICO</h3>
                <p>Garrafas PET, embalagens, sacolas plásticas</p>
              </div>
              
              <div className="category">
                <div className="categoryIcon">📄</div>
                <h3>PAPEL</h3>
                <p>Jornais, revistas, caixas de papelão</p>
              </div>
              
              <div className="category">
                <div className="categoryIcon">🍶</div>
                <h3>VIDRO</h3>
                <p>Garrafas de vidro, potes de conserva</p>
              </div>
              
              <div className="category">
                <div className="categoryIcon">🥫</div>
                <h3>METAL</h3>
                <p>Latas de alumínio, objetos de ferro</p>
              </div>
              
              <div className="category">
                <div className="categoryIcon">🍌</div>
                <h3>ORGÂNICO</h3>
                <p>Restos de comida, cascas de frutas</p>
              </div>
            </div>
            
            <div className="cta">
              <button className="button">
                🎯 Jogar Agora!
              </button>
            </div>
          </section>
          
          <footer className="footer">
            <p>Desenvolvido por João Vitor Tortorello e Eduardo Augusto Clara Olivato</p>
            <p>Web Mobile - 2025.2</p>
          </footer>
        </div>
      </main>
    </>
  )
}
