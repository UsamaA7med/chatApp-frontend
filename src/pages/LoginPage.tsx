import { useForm, type SubmitHandler } from 'react-hook-form'
import { loginSchema, type TLoginForm } from '../zodValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare } from 'lucide-react'
import { useAuth } from '../store/useAuth'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })
  const { login, isLoading } = useAuth()
  const submitForm: SubmitHandler<TLoginForm> = (data) => {
    login(data)
  }
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex gap-3 flex-col items-center">
        <MessageSquare className="text-primary size-10" />
        <p>Welcome Back</p>
        <p>Sign in to your account</p>
      </div>
      <form
        className="flex flex-col items-center gap-5 min-w-[300px]"
        onSubmit={handleSubmit(submitForm)}
      >
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="string"
            {...register('email')}
            placeholder="mail@site.com"
          />
        </label>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </label>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <button
          disabled={isLoading}
          className="btn min-w-[300px]"
          type="submit"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <div className="text-sm flex gap-1">
        <p className="text-gray-400">Don't have an account?</p>
        <Link className="link link-primary " to="/auth/signup">
          Create account
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
