export interface ProfileData {
  username: string
  displayName: string
  bio: string
  links: {
    id: string
    platform: string
    url: string
  }[]
}

/**
 * Encode profile data into a base64 URL-safe string
 */
export function encodeProfile(data: ProfileData): string {
  const json = JSON.stringify(data)
  const encoded = btoa(unescape(encodeURIComponent(json)))
  return encoded
}

/**
 * Decode base64 string back into profile data
 */
export function decodeProfile(encoded: string): ProfileData | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    const data = JSON.parse(json) as ProfileData
    return data
  } catch {
    return null
  }
}

/**
 * Build the full shareable URL with encoded profile in hash
 */
export function buildShareableURL(data: ProfileData): string {
  const encoded = encodeProfile(data)
  const base = `${window.location.origin}/profile/${data.username}`
  return `${base}#p=${encoded}`
}

/**
 * Extract and decode profile data from the current URL hash
 * Returns null if no profile data found in hash
 */
export function decodeFromHash(hash: string): ProfileData | null {
  if (!hash || !hash.startsWith('#p=')) return null
  const encoded = hash.slice(3) // remove '#p='
  return decodeProfile(encoded)
}

/**
 * Shorten a URL using TinyURL API
 * Returns the shortened URL or null if it fails
 */
export async function shortenURL(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    )
    if (!res.ok) return null
    const short = await res.text()
    return short.startsWith('http') ? short : null
  } catch {
    return null
  }
}