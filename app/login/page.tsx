import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">Sinergy<span>.</span>Consultant</div>
        <h1>Acceso al panel</h1>
        <p className="login-subtitle">Ingresá con tu cuenta para continuar</p>

        {error && (
          <div className="login-error">{decodeURIComponent(error)}</div>
        )}

        <form action={login}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-submit">
            Ingresar al panel
          </button>
        </form>
      </div>
    </div>
  )
}
