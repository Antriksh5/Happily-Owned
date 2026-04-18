export function normalizeLocation(value) {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9,\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchesPropertyLocation(property, rawQuery) {
  const normalizedQuery = normalizeLocation(rawQuery)

  if (!normalizedQuery) return true

  const queryParts = normalizedQuery
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  const haystacks = [
    property.location,
    property.city,
    property.state,
    `${property.city || ''} ${property.state || ''}`,
  ]
    .map(normalizeLocation)
    .filter(Boolean)

  return queryParts.some((part) =>
    haystacks.some((haystack) => haystack.includes(part) || part.includes(haystack)),
  )
}
