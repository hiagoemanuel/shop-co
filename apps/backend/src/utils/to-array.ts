export const toArray = <T>(value: unknown): T[] => {
  if (typeof value === 'string') {
    return value.split('_') as T[]
  } else {
    return [] as T[]
  }
}
