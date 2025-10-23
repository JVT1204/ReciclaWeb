'use client';

import Link from 'next/link';
import Header from '../components/Header';

export default function Team() {
  const teamMembers = [
    {
      name: 'João Vitor Tortorello',
      ra: '10402674',
      role: 'Frontend Developer',
      avatar: '👨‍💻'
    },
    {
      name: 'Eduardo Augusto Clara Olivato',
      ra: '10738072',
      role: 'Frontend Developer',
      avatar: '👩‍💻'
    }
  ];

  return (
    <div className="container">
      <Header />
      
      <main id="mainContent">
        <section id="team" className="screen team-screen active section">
          <div className="team-intro">
            <h1 className="section-title" id="teamTitle">👥 Desenvolvedores</h1>
            <p className="section-subtitle">
              Conheça quem pensou e criou o ReciclaWeb
            </p>
            <div className="team-quote">
              "Juntos por uma educação ambiental mais acessível e divertida para toda a comunidade!"
            </div>
          </div>

          <div className="team-members">
            {teamMembers.map((member, index) => (
              <article key={index} className="member-card">
                <div className="member-avatar">{member.avatar}</div>
                <div className="member-name">{member.name}</div>
                <div className="member-ra">RA: {member.ra}</div>
                <div className="member-role">{member.role}</div>
              </article>
            ))}
          </div>

          <section className="project-info">
            <h3>📋 Informações do Projeto</h3>
            
            <dl className="project-details">
              <div className="project-detail">
                <dt><strong>🎓 Disciplina:</strong></dt>
                <dd>Web Mobile</dd>
              </div>
              <div className="project-detail">
                <dt><strong>📅 Semestre:</strong></dt>
                <dd>2025.2</dd>
              </div>
              <div className="project-detail">
                <dt><strong>🌍 Caráter:</strong></dt>
                <dd>Extensionista</dd>
              </div>
            </dl>

            <section className="project-mission">
              <h4 style={{ color: '#2E7D32', marginBottom: '1rem' }}>🎯 Missão do Projeto</h4>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Promover <strong>educação ambiental</strong> através de tecnologia acessível e interativa, 
                contribuindo para formar uma comunidade mais consciente sobre a importância da 
                <strong>coleta seletiva</strong> e do <strong>descarte responsável de resíduos</strong>.
              </p>
            </section>

            <p style={{ marginBottom: '1rem', color: '#666' }}>
              <strong>📂 Código Aberto:</strong> Nosso projeto está disponível para toda a comunidade
            </p>
            <a href="https://github.com/JVT1204/ReciclaWeb.git" className="github-link">
              🔗 Acessar Repositório GitHub
            </a>
          </section>
        </section>
      </main>
    </div>
  );
}
