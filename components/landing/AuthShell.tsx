import { BrandLogo } from '@/components/brand/BrandLogo'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { IMG } from '@/lib/images'

type Props = {
  title: string
  subtitle?: string
  badge?: string
  children: React.ReactNode
  footer?: React.ReactNode
  image?: string
}

export function AuthShell({
  title,
  subtitle,
  badge,
  children,
  footer,
  image = IMG.login,
}: Props) {
  return (
    <div className="marketing-shell min-h-screen">
      <ImageHero4K imageUrl={image} minHeight="min-h-screen" className="flex items-center justify-center px-5 py-16">
        <div id="main-content" className="auth-wrap">
          <div className="auth-head">
            <BrandLogo href="/inicio" size="lg" className="mx-auto" />
            {badge && <p className="auth-badge">{badge}</p>}
            <h1 className="auth-title">{title}</h1>
            {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          </div>
          <div className="auth-card card-3d">{children}</div>
          {footer && <div className="auth-footer">{footer}</div>}
        </div>
      </ImageHero4K>
    </div>
  )
}

export function AuthField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="auth-field">
      <span className="auth-label">{label}</span>
      {children}
    </label>
  )
}

export function AuthInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="auth-input ux-focus-ring" {...props} />
}

export function AuthSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="auth-input ux-focus-ring" {...props} />
}

export function AuthError({ message }: { message: string }) {
  return <p className="auth-error" role="alert">{message}</p>
}

export function AuthSuccess({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="marketing-shell min-h-screen">
      <ImageHero4K imageUrl={IMG.login} minHeight="min-h-screen" className="flex items-center justify-center px-5 py-16">
        <div id="main-content" className="auth-wrap text-center">
          <div className="auth-card card-3d">
            <h1 className="auth-title !text-2xl mb-3">{title}</h1>
            <p className="auth-subtitle !mx-auto">{body}</p>
          </div>
        </div>
      </ImageHero4K>
    </div>
  )
}
