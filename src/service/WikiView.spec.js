import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import WikiView from '../views/WikiView.vue'

// Mock dei dati
const articoliMock = [
  { articolo: 10, titolo: "Articolo 10" },
  { articolo: 11, titolo: "Articolo 11" }
]
const principaliMock = [
  { articolo: 1, titolo: "Articolo Principale 1" }
]
const recentiMock = [
  { articolo: 20, titolo: "Articolo Recente 1" }
]

// Mock dei metodi
vi.mock('../components/service/ApiRest.js', () => ({
  getArticoli: vi.fn(() => Promise.resolve({ data: articoliMock })),
  getArtPrincipali: vi.fn(() => Promise.resolve({ data: principaliMock })),
  getArtRecenti: vi.fn(() => Promise.resolve({ data: recentiMock })),
}))

describe('WikiView.vue', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(WikiView)
    await new Promise(resolve => setTimeout(resolve, 0)) // Aspetta il montaggio
  })

  it('mostra i titoli delle sezioni', () => {
    expect(wrapper.text()).toContain("Articoli Principali")
    expect(wrapper.text()).toContain("Tutti gli Articoli")
    expect(wrapper.text()).toContain("Più Recenti")
  })

  it('mostra i dati degli articoli correttamente', () => {
    expect(wrapper.text()).toContain("Articolo 10")
    expect(wrapper.text()).toContain("Articolo 11")
    expect(wrapper.text()).toContain("Articolo Principale 1")
    expect(wrapper.text()).toContain("Articolo Recente 1")
  })

  it('usa href corretti per gli articoli', () => {
    expect(wrapper.find('a[href="/detail/10"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/detail/1"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/detail/20"]').exists()).toBe(true)
  })
})




