export function resolveId<T extends Record<string, any>>(obj: T | null, candidates: string[]): string | null {
  if (!obj) return null
  for (const key of candidates) {
    const val = (obj as any)[key]
    if (val === undefined || val === null) continue
    const s = String(val).trim()
    if (s.length > 0) return s
  }
  return null
}

export default resolveId
