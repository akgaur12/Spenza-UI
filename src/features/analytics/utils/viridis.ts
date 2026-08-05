/** Yellow → purple, matching the reference viridis-styled bar charts (index-based, not value-based). */
const VIRIDIS_STOPS = ['#fde725', '#7ad151', '#22a884', '#2a788e', '#414487', '#440154']

/** Stops short of the final (near-black) stop, which reads as muddy/illegible against a dark theme background. */
const MAX_T_FRACTION = 0.75

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Samples `count` colors evenly across the viridis scale — used to give each bar in a fixed-size chart a distinct color. */
export function viridisScale(count: number): string[] {
  if (count <= 1) return [VIRIDIS_STOPS[0]]

  return Array.from({ length: count }, (_, index) => {
    const t = (index / (count - 1)) * (VIRIDIS_STOPS.length - 1) * MAX_T_FRACTION
    const lower = Math.floor(t)
    const upper = Math.min(lower + 1, VIRIDIS_STOPS.length - 1)
    const fraction = t - lower

    const rgbLower = hexToRgb(VIRIDIS_STOPS[lower])
    const rgbUpper = hexToRgb(VIRIDIS_STOPS[upper])
    const blended: [number, number, number] = [
      lerp(rgbLower[0], rgbUpper[0], fraction),
      lerp(rgbLower[1], rgbUpper[1], fraction),
      lerp(rgbLower[2], rgbUpper[2], fraction),
    ]
    return rgbToHex(blended)
  })
}
