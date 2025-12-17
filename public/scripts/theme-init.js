(function () {
  try {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDark) {
      document.documentElement.classList.add('dark-mode')
    }
  } catch (e) {}
})()

