import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { authQueryProps } from '@/features/auth/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

import cls from './VerifyPage.module.scss'

export const VerifyPage = () => {
  const navigate = useNavigate()
  const verify = useMutation({ ...authQueryProps.verifyMut() })
  const resendVerification = useMutation({
    ...authQueryProps.resendVerificationMut(),
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const { email, token: tokenParam } = useParams({
    from: '/verify/$email/{-$token}',
  })

  const [token, setToken] = useState<string | undefined>(
    tokenParam ? tokenParam : '',
  )

  const fetchVerify = async () => {
    if (!token) return

    await verify.mutateAsync({ body: token })

    if (verify.error) {
      toast.error('Ошибка')
    } else {
      toast.success('Аккаунт подтвержден')

      setTimeout(() => {
        navigate({ to: '/' })
      }, 3000)
    }
  }

  const fetchResendVerification = async () => {
    await resendVerification.mutateAsync({ body: email })
    if (resendVerification.error) {
      toast.error('Ошибка')
    } else {
      toast.success('Токен отправлен на вашу почту')
    }
  }

  useEffect(() => {
    fetchResendVerification()
  }, [])

  return (
    <div className={cls.verifyPage}>
      <Toaster position="top-center" />
      <h1>Verify account</h1>
      <div className={cls.actions}>
        <Label>Token</Label>
        <Input
          full

          name="token"
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJ..."
          ref={inputRef}
          required
          value={token || ''}
        />

        <Button
          full
          onClick={() => fetchVerify()}
          variant="default"
        >
          Verify
        </Button>
        <Button
          full
          onClick={() => fetchResendVerification()}
          variant="outline"
        >
          Repeat send token
        </Button>
      </div>
    </div>
  )
}
