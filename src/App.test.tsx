import { render } from './utils/test-utils'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

describe('App component', () => {
  vi.mock('./utils/metronome-engine', async () => {
    const actual: object = await vi.importActual("./utils/metronome-engine")
    return {
      ...actual,
      MetronomeInit: vi.fn(),
    }
  })

  it('should be rendered once', () => {
    const { container } = render(<App />)
    const nodes = container.getElementsByClassName('App');
    expect(nodes.length).toBe(1)
  })
})
