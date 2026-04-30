import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/login/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-logo">Sinergy<span>.</span>Consultant</div>
        <div className="dashboard-user">
          <span className="dashboard-user-email">{user?.email}</span>
          <form action={logout}>
            <button type="submit" className="btn-logout">Cerrar sesión</button>
          </form>
        </div>
      </header>

      <main className="dashboard-main">
        <h1>Panel de administración</h1>
        <p>Bienvenido, <strong>{user?.email}</strong>. Gestioná los servicios y consultas desde aquí.</p>

        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <div className="dashboard-stat-num">+65</div>
            <div className="dashboard-stat-label">Clientes activos</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-num">+150</div>
            <div className="dashboard-stat-label">Proyectos realizados</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-num">+15</div>
            <div className="dashboard-stat-label">Años de experiencia</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-num">5</div>
            <div className="dashboard-stat-label">Líneas de servicio</div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Servicios activos</h2>
          <div className="dashboard-services-list">
            <div className="dashboard-service-item"><span>🦺</span><span>Higiene y Seguridad</span></div>
            <div className="dashboard-service-item"><span>📋</span><span>Auditoría Interna Integrada</span></div>
            <div className="dashboard-service-item"><span>🏗️</span><span>Integridad Estructural</span></div>
            <div className="dashboard-service-item"><span>🌿</span><span>Medio Ambiente</span></div>
            <div className="dashboard-service-item"><span>📐</span><span>Topografía</span></div>
          </div>
        </div>
      </main>
    </div>
  )
}
