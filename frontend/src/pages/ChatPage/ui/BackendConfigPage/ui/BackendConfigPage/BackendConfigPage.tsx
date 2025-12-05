import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { useBackendConfig } from '@/shared/hooks/useBackendConfig'
import { FORM_STYLES } from '@/shared/styles/form_styles'
import { BackButton } from '@/shared/ui/BackButton'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

import cls from './BackendConfigPage.module.scss'

export const BackendConfigPage = () => {
  const navigate = useNavigate()
  const { backendDomain, setBackendDomain } = useBackendConfig()
  const [tempDomain, setTempDomain] = useState<string>('')
  const [isTesting, setIsTesting] = useState<boolean>(false)

  useEffect(() => {
    // Если backendDomain пустой, оставляем поле пустым
    setTempDomain(backendDomain || '')
  }, [backendDomain])

  // Логика формирования URL:
  // 1. Если пусто -> возвращаем пустую строку (относительный путь)
  // 2. Если есть текст -> добавляем https:// (если нет)
  const buildFullUrl = (domain: string) => {
    const trimmed = domain.trim()
    if (!trimmed) return ''

    // Если пользователь уже ввел https://, не дублируем
    if (trimmed.startsWith('https://')) {
      return trimmed
    }
    return `https://${trimmed}`
  }

  const testConnection = useMutation({
    mutationFn: async (url: string) => {
      setIsTesting(true)
      try {
        // Если url пустой, fetch полетит на '/api/health' (относительно текущего домена)
        const endpoint = url ? `${url}/api/health` : '/api/health'

        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            // Добавляем заголовок для ngrok на случай, если тестируем его
            'ngrok-skip-browser-warning': 'true',
          },
          method: 'GET',
          signal: AbortSignal.timeout(5000),
        })

        if (!response.ok) {
          throw new Error(`HTTP ошибка! Статус: ${response.status}`)
        }

        return { success: true }
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : 'Не удалось подключиться к серверу',
        )
      } finally {
        setIsTesting(false)
      }
    },
    onError: (error: Error) => {
      toast.error(`Ошибка подключения: ${error.message}`)
    },
    onSuccess: () => {
      toast.success('Подключение успешно! Сервер доступен.')
    },
  })

  const handleSave = () => {
    const fullUrl = buildFullUrl(tempDomain)

    // Сценарий 1: Пустая строка (сброс на относительный путь)
    if (!fullUrl) {
      setBackendDomain('')
      toast.success('Используется относительный путь (Proxy/Local)')
      setTimeout(() => navigate({ to: '/' }), 1000)
      return
    }

    // Сценарий 2: Валидация URL
    try {
      new URL(fullUrl) // Проверяем валидность
      // Сохраняем "чистый" домен (без https:// если нужно, или как есть)
      // В вашем случае хук useBackendConfig ожидает строку домена или URL?
      // Если хук ожидает именно то, что ввел юзер (домен), то сохраняем tempDomain.trim()
      // Но лучше сохранить без протокола, если логика приложения сама его подставляет,
      // либо сохранить полный URL, если логика гибкая.
      // Исходя из вашего прошлого кода, сохраняем то, что в инпуте:
      setBackendDomain(tempDomain.trim())

      toast.success('Домен бэкенда сохранен!')
      setTimeout(() => navigate({ to: '/' }), 1000)
    } catch {
      toast.error('Некорректный URL')
    }
  }

  const handleTestConnection = () => {
    const fullUrl = buildFullUrl(tempDomain)
    // Разрешаем тестировать и пустой домен (относительный путь)
    try {
      if (fullUrl) new URL(fullUrl) // Валидируем только если не пусто
      testConnection.mutate(fullUrl)
    } catch {
      toast.error('Введите корректный домен')
    }
  }

  const handleResetToRelative = () => {
    setTempDomain('')
    toast.success('Выбран относительный путь')
  }

  const displayFullUrl = buildFullUrl(tempDomain)
  const isModified = tempDomain !== (backendDomain || '')

  return (
    <div className={cls.backendConfigPage}>
      <div className={cls.contentWrapper}>
        <BackButton className={cls.backButton} />
        <Toaster position="top-center" />

        <h1 className={cls.title}>Настройка сервера</h1>

        <div className={cls.container}>
          <div className={cls.infoSection}>
            <p className={cls.infoText}>
              Укажите публичный домен (HTTPS) или оставьте поле пустым для работы через прокси (Relative Path).
            </p>
            <div className={cls.examplesGrid}>
              <div className={cls.exampleCard}>
                <span className={cls.exampleLabel}>Пустое поле:</span>
                <code className={cls.exampleCode}>(Относительный путь)</code>
              </div>
              <div className={cls.exampleCard}>
                <span className={cls.exampleLabel}>Ngrok / Публичный:</span>
                <code className={cls.exampleCode}>abc.ngrok-free.app</code>
              </div>
            </div>
          </div>

          <div className={cls.actions}>
            <div className={cls.inputGroup}>
              <Label htmlFor="backend-domain">Домен сервера</Label>
              <div className={cls.inputWithPort}>
                <Input
                  disabled={isTesting}
                  full
                  id="backend-domain"
                  name="backend-domain"
                  onChange={(e) => setTempDomain(e.target.value)}
                  placeholder="Оставьте пустым или введите домен"
                  value={tempDomain}
                />
                <div className={cls.portBadge}>HTTPS</div>
              </div>
            </div>

            <div className={cls.preview}>
              <p className={cls.hint}>
                Итоговый адрес:
                {' '}
                <code className={displayFullUrl ? cls.activeUrl : cls.relativeUrl}>
                  {displayFullUrl || '/api/... (Relative Path)'}
                </code>
              </p>
            </div>

            <div className={cls.buttonGrid}>
              <Button
                className={cls.saveButton}
                disabled={isTesting || !isModified}
                full
                onClick={handleSave}
                variant="default"
              >
                Сохранить
              </Button>

              <Button
                className={cls.testButton}
                disabled={isTesting}
                full
                onClick={handleTestConnection}
                variant="secondary"
              >
                {isTesting ? 'Тестирование...' : 'Проверить подключение'}
              </Button>

              <div className={cls.auxButtons}>
                <Button
                  onClick={handleResetToRelative}
                  size="sm"
                  variant="ghost"
                >
                  Сбросить (Относительный путь)
                </Button>
              </div>
            </div>
          </div>

          <div className={cls.statusSection}>
            <div className={cls.statusIndicators}>
              <div className={cls.statusItem}>
                <div className={cls.statusInfo}>
                  <span className={`${cls.statusDot} ${backendDomain ? cls.active : cls.neutral}`} />
                  <span>Текущий режим:</span>
                </div>
                <code className={cls.domainValue}>
                  {backendDomain ? backendDomain : 'Относительный путь (Proxy)'}
                </code>
              </div>

              <div className={cls.statusItem}>
                <div className={cls.statusInfo}>
                  <span className={`${cls.statusDot} ${testConnection.isSuccess ? cls.success : testConnection.isError ? cls.error : ''}`} />
                  <span>Статус:</span>
                </div>
                <span className={cls.connectionStatus}>
                  {testConnection.isSuccess
                    ? 'Доступен'
                    : testConnection.isError
                      ? 'Ошибка'
                      : 'Не проверялся'}
                </span>
              </div>
            </div>
          </div>

          <div className={FORM_STYLES.footer}>
            <span>Или вернитесь к </span>
            <Link to="/">главной странице</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
