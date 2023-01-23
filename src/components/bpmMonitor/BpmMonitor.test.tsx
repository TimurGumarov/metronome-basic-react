import React from 'react';
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../utils/test-utils'
import BpmMonitor from './BpmMonitor'

describe('BpmMonitor component', () => {
  vi.mock('../../context/MetronomeContext', async () => {
    return {
      MetronomeContext: React.createContext<object | null>({metronomeState: { bpm: 162 }})
    }
  });

  vi.mock("./BpmMonitor.module.css", () => ({
    default: new Proxy(new Object(), {
      get(_, style) {
        return style;
      },
    }),
  }));

  it('should be rendered once', async () => {
    const { container } = render(<BpmMonitor />)
    const nodes = container.getElementsByClassName('BpmMonitor');
    expect(nodes.length).toBe(1)
  })
  it('should have 3 digit elements', async () => {
    const { container } = render(<BpmMonitor />)
    const nodes = container.getElementsByClassName('BpmMonitor_Text');
    expect(nodes.length).toBe(3)
  })

  it('shows data correctly', async () => {
    render(<BpmMonitor />)
    expect(await screen.findByText(/^1$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^6$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^2$/i)).toBeInTheDocument()
  })
})
