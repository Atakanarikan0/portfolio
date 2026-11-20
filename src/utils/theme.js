// Kayıtlı temayı okur; depolama kapalıysa koyu temaya düşer
export function readTheme() {
  try {
    return localStorage.getItem('theme') || 'dark'
  } catch {
    return 'dark'
  }
}
