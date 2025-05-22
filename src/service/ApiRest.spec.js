import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import * as api from './ApiRest.js'

vi.mock('axios')

describe('Test API REST', () => {

  it('getResponse con messaggio valido', async () => {
    const mockResponse = { data: { reply: 'Ciao!' } }
    axios.post.mockResolvedValue(mockResponse)

    const res = await api.getResponse('Ciao')
    expect(res).toEqual(mockResponse)
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/chatbot/message", 
      { messaggio: 'Ciao' }
    )
  })

  it('getResponse con messaggio vuoto', async () => {
    const mockResponse = { data: { reply: 'Messaggio vuoto' } }
    axios.post.mockResolvedValue(mockResponse)

    const res = await api.getResponse('')
    expect(res).toEqual(mockResponse)
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/chatbot/message", 
      { messaggio: '' }
    )
  })

  it('getResponse gestisce errore', async () => {
    axios.post.mockRejectedValue(new Error('Errore server'))

    await expect(api.getResponse('test')).rejects.toThrow('Errore server')
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/chatbot/message", 
      { messaggio: 'test' }
    )
  })

  it('getHistory ritorna la cronologia', async () => {
    const mockHistory = { data: [{ id: 1, text: 'msg' }] }
    axios.get.mockResolvedValue(mockHistory)

    const res = await api.getHistory()
    expect(res).toEqual(mockHistory)
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/chatbot/getHistory"
    )
  })

  it('getHistory gestisce errore', async () => {
    axios.get.mockRejectedValue(new Error('Errore getHistory'))

    await expect(api.getHistory()).rejects.toThrow('Errore getHistory')
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/chatbot/getHistory"
    )
  })

  it('login con dati corretti', async () => {
    const mockLogin = { data: { token: 'abc123' } }
    axios.post.mockResolvedValue(mockLogin)

    const userBody = { username: 'user', password: 'pass' }
    const res = await api.login(userBody)
    expect(res).toEqual(mockLogin)
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/login", userBody)
  })

  it('login con dati errati - gestisce errore', async () => {
    axios.post.mockRejectedValue(new Error('Errore di autenticazione'))

    const userBody = { username: 'wronguser', password: 'wrongpass' }
    await expect(api.login(userBody)).rejects.toThrow('Errore di autenticazione')
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/login", userBody)
  })

  it('login con input vuoto', async () => {
    const userBody = { username: '', password: '' }
    const mockError = { data: { error: 'Missing fields' } }
    axios.post.mockResolvedValue(mockError)

    const res = await api.login(userBody)
    expect(res).toEqual(mockError)
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/login", userBody)
  })

  it('signUp con dati corretti', async () => {
    const mockSignUp = { data: { success: true } }
    axios.post.mockResolvedValue(mockSignUp)

    const signUpBody = { username: 'newuser', password: '1234' }
    const res = await api.signUp(signUpBody)
    expect(res).toEqual(mockSignUp)
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/signup", signUpBody)
  })

  it('signUp con dati incompleti - gestisce errore', async () => {
    axios.post.mockRejectedValue({ response: { status: 400, data: { error: 'Invalid data' }}})

    const signUpBody = { username: '', password: '' }
    await expect(api.signUp(signUpBody)).rejects.toMatchObject({
      response: { status: 400 }
    })
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/signup", signUpBody)
  })

  it('signUp con password troppo corta', async () => {
    const signUpBody = { username: 'user', password: '123' }
    const mockError = { data: { error: 'Password too short' } }
    axios.post.mockResolvedValue(mockError)

    const res = await api.signUp(signUpBody)
    expect(res).toEqual(mockError)
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/signup", signUpBody)
  })

})

