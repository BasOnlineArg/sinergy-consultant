'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type ServiceKey = 'higiene' | 'auditoria' | 'estructural' | 'ambiente' | 'topografia'

interface ServiceFeature {
  icon: string
  title: string
  text: string
}

interface Service {
  icon: string
  title: string
  desc: string
  features: ServiceFeature[]
}

const services: Record<ServiceKey, Service> = {
  higiene: {
    icon: '🦺',
    title: 'Higiene y Seguridad Laboral',
    desc: 'Brindamos un servicio integral de Higiene y Seguridad en el Trabajo conforme a la Ley 19.587, el Decreto 351/79 y la normativa de la SRT. Acompañamos a las empresas en el cumplimiento legal, la prevención de accidentes y la construcción de una cultura de seguridad sostenible.',
    features: [
      { icon: '📝', title: 'Relevamiento y documentación', text: 'Elaboración y actualización de Programas de Seguridad, Legajos Técnicos y documentación exigida por la SRT.' },
      { icon: '⚠️', title: 'Identificación de riesgos', text: 'Relevamiento CyMAT, matrices de riesgo y planes de acción correctivos.' },
      { icon: '🎓', title: 'Capacitaciones', text: 'Programas de formación en seguridad para operarios, supervisores y personal jerárquico.' },
      { icon: '🚨', title: 'Gestión de emergencias', text: 'Planes de evacuación, simulacros y gestión de accidentes e incidentes laborales.' },
    ],
  },
  auditoria: {
    icon: '📋',
    title: 'Auditoría Interna Integrada',
    desc: 'Realizamos auditorías internas de sistemas de gestión integrados (SGI) bajo las normas ISO 9001, ISO 14001 e ISO 45001. Nuestro enfoque está orientado a la mejora continua, la identificación de no conformidades y el fortalecimiento de los procesos organizacionales.',
    features: [
      { icon: '🔎', title: 'Diagnóstico inicial', text: 'Evaluación del estado de situación de los sistemas de gestión frente a los requisitos normativos vigentes.' },
      { icon: '📊', title: 'Auditoría de procesos', text: 'Revisión sistemática de procesos clave con evidencia documentada y hallazgos trazables.' },
      { icon: '📌', title: 'Informe de no conformidades', text: 'Clasificación de hallazgos, análisis de causas raíz y planes de acción propuestos.' },
      { icon: '🔄', title: 'Seguimiento de acciones', text: 'Acompañamiento en la implementación de acciones correctivas y verificación de su eficacia.' },
    ],
  },
  estructural: {
    icon: '🏗️',
    title: 'Integridad Estructural',
    desc: 'Ofrecemos servicios de inspección, evaluación y diagnóstico de estructuras civiles e industriales. Nuestros informes son herramientas clave para la toma de decisiones en mantenimiento, ampliaciones y habilitaciones.',
    features: [
      { icon: '🏢', title: 'Inspección visual y técnica', text: 'Relevamiento de estructuras de hormigón, acero, madera y mixtas con registro fotográfico y planillas técnicas.' },
      { icon: '🧪', title: 'Ensayos no destructivos', text: 'Técnicas de END para evaluación de integridad sin afectar la operatividad de la instalación.' },
      { icon: '📄', title: 'Informes de aptitud', text: 'Emisión de informes para presentación ante organismos municipales, provinciales y clientes privados.' },
      { icon: '🛠️', title: 'Planes de mantenimiento', text: 'Planes preventivos y correctivos orientados a extender la vida útil estructural.' },
    ],
  },
  ambiente: {
    icon: '🌿',
    title: 'Medio Ambiente',
    desc: 'Asesoramos a industrias y organismos en la gestión ambiental responsable, el cumplimiento de la legislación vigente y la minimización del impacto sobre el entorno, bajo los estándares de ISO 14001 y normativa provincial y nacional aplicable.',
    features: [
      { icon: '📋', title: 'Estudios de impacto ambiental', text: 'Elaboración de EIA para proyectos industriales, mineros y de infraestructura ante organismos de contralor.' },
      { icon: '🗑️', title: 'Gestión de residuos', text: 'Planes de gestión de residuos sólidos urbanos, industriales y peligrosos conforme a normativa.' },
      { icon: '📈', title: 'Monitoreo ambiental', text: 'Programas de monitoreo de aire, agua, suelo y ruido con informes periódicos de cumplimiento.' },
      { icon: '📁', title: 'Plan de Gestión Ambiental', text: 'Elaboración de PGA para proyectos que requieren habilitación o renovación de certificados ambientales.' },
    ],
  },
  topografia: {
    icon: '📐',
    title: 'Topografía',
    desc: 'Contamos con profesionales matriculados y equipos de última generación para brindar servicios topográficos de precisión en relevamientos urbanos, rurales e industriales en toda la región patagónica.',
    features: [
      { icon: '🗺️', title: 'Relevamientos topográficos', text: 'Levantamientos planimétricos y altimétricos para proyectos de construcción, catastro e ingeniería civil.' },
      { icon: '📏', title: 'Nivelaciones y replanteos', text: 'Nivelaciones de precisión y replanteo de obras civiles e industriales con control de avance.' },
      { icon: '📐', title: 'Mensuras y subdivisiones', text: 'Mensuras, subdivisiones y unificaciones de parcelas con tramitación ante el Registro Catastral.' },
      { icon: '🛰️', title: 'Cartografía y SIG', text: 'Cartografía técnica digital e integración con sistemas de información geográfica (SIG/GIS).' },
    ],
  },
}

export default function Home() {
  const [activeService, setActiveService] = useState<ServiceKey | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const cvTopRef = useRef<HTMLCanvasElement>(null)
  const cvBotRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const drawCurtains = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const hh = Math.ceil(vh / 2)
    ;[cvTopRef.current, cvBotRef.current].forEach((cv) => {
      if (!cv) return
      cv.width = vw
      cv.height = hh
      const ctx = cv.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#0B1F40'
      ctx.fillRect(0, 0, vw, hh)
      ctx.strokeStyle = 'rgba(232,105,32,0.07)'
      ctx.lineWidth = 1
      for (let x = 0; x < vw; x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, hh); ctx.stroke() }
      for (let y = 0; y < hh; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(vw, y); ctx.stroke() }
      ctx.font = 'bold 13px Segoe UI,sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.04)'
      ctx.textAlign = 'center'
      ctx.fillText('SINERGY CONSULTANT — PATAGONIA ARGENTINA', vw / 2, hh / 2)
    })
  }, [])

  const closePanel = useCallback(() => {
    setPanelOpen(false)
    setTimeout(() => {
      setActiveService(null)
      document.body.style.overflow = ''
    }, 650)
  }, [])

  const openService = (key: ServiceKey) => {
    document.body.style.overflow = 'hidden'
    setActiveService(key)
  }

  useEffect(() => {
    if (activeService) {
      drawCurtains()
      requestAnimationFrame(() => requestAnimationFrame(() => setPanelOpen(true)))
    }
  }, [activeService, drawCurtains])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closePanel])

  const service = activeService ? services[activeService] : null

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={overlayRef}
        className={`curtain-overlay${activeService ? ' active' : ''}${panelOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === overlayRef.current) closePanel() }}
      >
        <div className="curtain-half top"><canvas ref={cvTopRef} /></div>
        <div className="curtain-half bot"><canvas ref={cvBotRef} /></div>
      </div>

      {/* Service panel */}
      <div className={`service-panel${panelOpen ? ' open' : ''}`}>
        <button className="panel-close" onClick={closePanel}>✕</button>
        {service && (
          <>
            <div className="panel-icon">{service.icon}</div>
            <div className="panel-tag">Servicio</div>
            <h2 className="panel-title">{service.title}</h2>
            <p className="panel-desc">{service.desc}</p>
            <div className="panel-features">
              {service.features.map((f, i) => (
                <div key={i} className="panel-feature">
                  <h4>{f.icon} {f.title}</h4>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
            <button className="panel-cta" onClick={() => { closePanel(); setTimeout(() => scrollTo('contact'), 650) }}>
              Solicitar este servicio →
            </button>
          </>
        )}
      </div>

      <div id="main-content">
        <nav>
          <div className="nav-inner">
            <div className="logo">Sinergy<span>.</span>Consultant</div>
            <div className="nav-links">
              <button className="nav-btn" onClick={() => scrollTo('about')}>Nosotros</button>
              <button className="nav-btn" onClick={() => scrollTo('services')}>Servicios</button>
              <button className="nav-btn" onClick={() => scrollTo('why')}>¿Por qué elegirnos?</button>
              <button className="nav-btn" onClick={() => scrollTo('sectors')}>Sectores</button>
              <button className="nav-btn" onClick={() => scrollTo('contact')}>Contacto</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a href="/login" className="nav-access">Acceso clientes</a>
              <button className="nav-cta" onClick={() => scrollTo('contact')}>Solicitar consulta</button>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-inner">
            <div className="hero-tag">Consultora Técnica Integral</div>
            <h1>Soluciones que <span>protegen</span> y hacen crecer tu organización</h1>
            <p>Especialistas en Higiene y Seguridad, Auditoría Interna, Integridad Estructural, Medio Ambiente y Topografía. Acompañamos cada etapa de tu proyecto con rigor técnico y compromiso.</p>
            <button className="btn-primary" onClick={() => scrollTo('contact')}>Solicitar una consulta</button>
            <button className="btn-secondary" onClick={() => scrollTo('services')}>Ver servicios</button>
            <div className="hero-stats">
              <div><div className="stat-num">+15</div><div className="stat-label">Años de experiencia</div></div>
              <div><div className="stat-num">+150</div><div className="stat-label">Proyectos realizados</div></div>
              <div><div className="stat-num">+65</div><div className="stat-label">Clientes activos</div></div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="about-grid">
            <div className="about-img">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 340" style={{ width: '100%', height: 'auto', display: 'block', padding: '24px' }}>
                <g stroke="rgba(232,105,32,0.4)" strokeWidth="1.2" fill="none">
                  <line x1="150" y1="60" x2="254" y2="142" /><line x1="254" y1="142" x2="215" y2="272" />
                  <line x1="215" y1="272" x2="85" y2="272" /><line x1="85" y1="272" x2="46" y2="142" />
                  <line x1="46" y1="142" x2="150" y2="60" /><line x1="150" y1="60" x2="215" y2="272" />
                  <line x1="150" y1="60" x2="85" y2="272" /><line x1="254" y1="142" x2="85" y2="272" />
                  <line x1="46" y1="142" x2="215" y2="272" /><line x1="46" y1="142" x2="254" y2="142" />
                </g>
                <text x="150" y="181" textAnchor="middle" fontSize="33" fill="#E86920">♻</text>
                <circle cx="150" cy="60" r="32" fill="rgba(13,37,69,0.9)" stroke="rgba(232,105,32,0.7)" strokeWidth="1.5" />
                <text x="150" y="70" textAnchor="middle" fontSize="27">🦺</text>
                <text x="150" y="103" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Higiene y</text>
                <text x="150" y="114" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Seguridad</text>
                <circle cx="254" cy="142" r="32" fill="rgba(13,37,69,0.9)" stroke="rgba(232,105,32,0.7)" strokeWidth="1.5" />
                <text x="254" y="152" textAnchor="middle" fontSize="27">🏗️</text>
                <text x="254" y="185" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Integridad</text>
                <text x="254" y="196" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Estructural</text>
                <circle cx="215" cy="272" r="32" fill="rgba(13,37,69,0.9)" stroke="rgba(232,105,32,0.7)" strokeWidth="1.5" />
                <text x="215" y="282" textAnchor="middle" fontSize="27">📐</text>
                <text x="215" y="315" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Topografía</text>
                <circle cx="85" cy="272" r="32" fill="rgba(13,37,69,0.9)" stroke="rgba(232,105,32,0.7)" strokeWidth="1.5" />
                <text x="85" y="282" textAnchor="middle" fontSize="27">🌿</text>
                <text x="85" y="315" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Medio Ambiente</text>
                <circle cx="46" cy="142" r="32" fill="rgba(13,37,69,0.9)" stroke="rgba(232,105,32,0.7)" strokeWidth="1.5" />
                <text x="46" y="152" textAnchor="middle" fontSize="27">🔍</text>
                <text x="46" y="185" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Auditoría</text>
                <text x="46" y="196" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">Interna</text>
              </svg>
            </div>
            <div className="about-text">
              <div className="section-tag">Sobre nosotros</div>
              <h2 className="section-title">Experiencia técnica con visión integral</h2>
              <p>Somos una consultora multidisciplinaria radicada en la Patagonia Argentina. Brindamos servicios especializados a empresas industriales, constructoras e instituciones que buscan excelencia en gestión técnica, normativa y ambiental.</p>
              <p>Nuestro equipo de profesionales certificados trabaja bajo estándares nacionales e internacionales, garantizando soluciones precisas, documentadas y aplicables a cada realidad operativa.</p>
              <div className="about-tags">
                <span className="tag">ISO 45001</span>
                <span className="tag">ISO 14001</span>
                <span className="tag">ISO 9001</span>
                <span className="tag">SRT</span>
                <span className="tag">IRAM</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-header">
            <div className="section-tag">Nuestros servicios</div>
            <h2 className="section-title">Todo lo que tu empresa necesita en un solo lugar</h2>
            <p className="section-sub">Hacé click en cualquier servicio para conocer más detalles.</p>
          </div>
          <div className="services-grid">
            {(Object.keys(services) as ServiceKey[]).map((key) => (
              <div key={key} className="service-card" onClick={() => openService(key)}>
                <div className="service-icon">{services[key].icon}</div>
                <h3>{services[key].title}</h3>
                <p>{services[key].desc.slice(0, 120)}...</p>
                <span className="service-link">Ver más →</span>
              </div>
            ))}
            <div
              className="service-card"
              style={{ border: '1.5px solid var(--orange)', background: 'rgba(232,105,32,.03)' }}
              onClick={() => scrollTo('contact')}
            >
              <div className="service-icon" style={{ background: 'rgba(232,105,32,.15)' }}>💬</div>
              <h3>¿Necesitás algo específico?</h3>
              <p>Cada proyecto es único. Consultanos y diseñamos una solución a medida para tu empresa.</p>
              <span className="service-link">Contactanos →</span>
            </div>
          </div>
        </section>

        <section id="why">
          <div className="section-header">
            <div className="section-tag">¿Por qué elegirnos?</div>
            <h2 className="section-title">Nuestros diferenciales</h2>
            <p className="section-sub">Más de una década acompañando organizaciones con rigor técnico, compromiso y resultados medibles.</p>
          </div>
          <div className="why-grid">
            <div className="why-card"><div className="why-num">01</div><h4>Equipo multidisciplinario</h4><p>Profesionales matriculados en cada especialidad, con actualización permanente en normativa nacional e internacional.</p></div>
            <div className="why-card"><div className="why-num">02</div><h4>Enfoque integral</h4><p>Coordinamos todas las áreas de tu proyecto desde un único punto de contacto, ahorrando tiempo y recursos.</p></div>
            <div className="why-card"><div className="why-num">03</div><h4>Documentación rigurosa</h4><p>Informes técnicos detallados, listos para presentar ante organismos de control, clientes y auditores externos.</p></div>
            <div className="why-card"><div className="why-num">04</div><h4>Compromiso y respuesta rápida</h4><p>Tiempos de respuesta ágiles y acompañamiento continuo durante toda la ejecución del servicio contratado.</p></div>
          </div>
        </section>

        <section className="sectors" id="sectors">
          <div className="section-header">
            <div className="section-tag" style={{ color: 'var(--orange-light)' }}>Sectores</div>
            <h2 className="section-title">Industrias que atendemos</h2>
            <p className="section-sub">Trabajamos con empresas de distintos rubros que requieren gestión técnica especializada y cumplimiento normativo.</p>
          </div>
          <div className="sectors-grid">
            <span className="sector-pill">⚙️ Industria manufacturera</span>
            <span className="sector-pill">🏗️ Construcción e infraestructura</span>
            <span className="sector-pill">⛽ Oil &amp; Gas</span>
            <span className="sector-pill">🌾 Agroindustria</span>
            <span className="sector-pill">🏭 Minería</span>
            <span className="sector-pill">🚛 Logística y transporte</span>
            <span className="sector-pill">🐟 Industria pesquera</span>
            <span className="sector-pill">🔋 Energías renovables</span>
          </div>
        </section>

        <section id="contact">
          <div className="section-header">
            <div className="section-tag">Contacto</div>
            <h2 className="section-title">¿Hablamos de tu proyecto?</h2>
            <p className="section-sub">Completá el formulario y nos ponemos en contacto en menos de 24 horas.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Información de contacto</h3>
              <p>Estamos listos para ayudarte. Contanos en qué servicio estás interesado y un especialista se comunicará con vos a la brevedad.</p>
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <label>Ubicación</label>
                  <p>Trelew, Chubut<br />Caleta Olivia, Santa Cruz<br />Neuquén, Neuquén</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📧</div>
                <div className="contact-item-text">
                  <label>Email</label>
                  <p>sinergy.consultant.patagonia@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div className="contact-item-text">
                  <label>Teléfono / WhatsApp</label>
                  <div className="wa-row">
                    <svg className="wa-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#25D366" />
                      <path d="M23.5 19.9c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="white" />
                    </svg>
                    <span className="wa-link" onClick={() => window.open('https://wa.me/5492974254840', '_blank')}>
                      +54 9 297 425-4840
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group"><label>Nombre</label><input type="text" placeholder="Tu nombre" /></div>
                <div className="form-group"><label>Empresa</label><input type="text" placeholder="Nombre de tu empresa" /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="tu@email.com" /></div>
              <div className="form-group">
                <label>Servicio de interés</label>
                <select defaultValue="">
                  <option value="" disabled>Seleccioná un servicio...</option>
                  <option>Higiene y Seguridad</option>
                  <option>Auditoría Interna Integrada</option>
                  <option>Integridad Estructural</option>
                  <option>Medio Ambiente</option>
                  <option>Topografía</option>
                  <option>Consulta general</option>
                </select>
              </div>
              <div className="form-group"><label>Mensaje</label><textarea placeholder="Contanos brevemente sobre tu proyecto o necesidad..." /></div>
              <button className="btn-submit">Enviar consulta</button>
            </div>
          </div>
        </section>

        <footer>
          <p>© 2025 <span>Sinergy Consultant</span> — Todos los derechos reservados. Patagonia Argentina.</p>
        </footer>
      </div>
    </>
  )
}
