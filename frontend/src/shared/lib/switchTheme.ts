export const switchTheme = async () => {
  const html = document.documentElement
  const isDark = html.classList.contains('dark')

  const button = document.activeElement as HTMLElement
  const rect = button?.getBoundingClientRect()
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

  // Радиус чуть меньше, чтобы не терялся эффект
  const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) * 0.75

  const duration = 1000 // немного длиннее = заметнее

  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      html.classList.toggle('dark')
      localStorage.setItem('theme', !isDark ? 'dark' : 'light')
    })

    // Ждём готовности и запускаем анимацию
    await transition.ready

    document.documentElement.animate(
      { opacity: [0.8, 1] },
      { duration: 0, easing: 'ease-out' },
    )

    // Небольшая задержка для плавности
    setTimeout(() => {
      html.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    }, 100)
  }
  else {
    html.classList.toggle('dark')
    localStorage.setItem('theme', !isDark ? 'dark' : 'light')
  }
}
