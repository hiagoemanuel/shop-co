export const toArray = <T>(value: string | undefined): T[] => {
  if (value) {
    return value.split('_') as T[]
  } else {
    return [] as T[]
  }
}
