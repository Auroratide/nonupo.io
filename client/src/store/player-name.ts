import { writable } from 'svelte/store'

export const key = 'playerName'

export const playerName = writable(localStorage.getItem(key) ?? '')

playerName.subscribe(value => localStorage.setItem(key, value))
