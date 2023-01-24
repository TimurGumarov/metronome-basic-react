import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, userEvent } from "../../utils/test-utils"
import ButtonsLayout from "./ButtonsLayout"

describe("ButtonsLayout component", () => {
  vi.mock("../../context/MetronomeContext", async () => {
    return {
      MetronomeContext: React.createContext<object | null>({
        updateMetronomeBpm: vi.fn(),
      }),
    }
  })

  it("should be rendered once", async () => {
    render(<ButtonsLayout />)
    expect(await screen.findByText(/^\+1$/i)).toBeInTheDocument()
    expect((await screen.findAllByText(/^\+1$/i)).length).toBe(1)
  })

  it('should render buttons "-1", "+1", "-5", "+5", "-10", "+10"', async () => {
    render(<ButtonsLayout />)
    expect(await screen.findByText(/^-1$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^\+1$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^-5$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^\+5$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^-10$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^\+10$/i)).toBeInTheDocument()
  })

  it('should render button "Play"', async () => {
    render(<ButtonsLayout />)
    expect(await screen.findByText(/^Play$/i)).toBeInTheDocument()
  })

  it('should change button to "Stop" after click', async () => {
    render(<ButtonsLayout />)
    userEvent.click(screen.getByText(/^Play$/i))
    expect(await screen.findByText(/^Stop$/i)).toBeInTheDocument()
  })

  // it('uses flexbox in app header', async () => {
  //   render(<App />)
  //   const element = screen.getByRole('banner')
  //   expect(element.className).toEqual('App-header')
  //   expect(getComputedStyle(element).display).toEqual('flex')
  // })
})
