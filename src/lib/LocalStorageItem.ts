import { isString } from 'lodash'

/**
 * Abstraction around access to local store on a per-key name
 */
export default class LocalStorageItem {

  constructor(private readonly key: string) {
  }

  get() {
    return LocalStorageProxy.instance.getItem(this.key)
  }

  set(value: string) {
    LocalStorageProxy.instance.setItem(this.key, value)
  }

  remove() {
    LocalStorageProxy.instance.removeItem(this.key)
  }

}

class LocalStorageProxy implements Storage {

  private readonly proxy: object | null = null

  constructor(forceProxy = false) {
    if (forceProxy) {
      this.proxy = {}
      return
    }
    try {
      // Technically the code below only needs to check if accessing `localStorage`
      // throws an error, not actually do anything with the returned value.
      if (typeof global.localStorage === 'undefined') {
        this.proxy = {}
      }
    } catch (e) {
      this.proxy = {}
    }
  }

  get length() {
    return this.proxy === null
      ? localStorage.length
      : Object.getOwnPropertyNames(this.proxy).length
  }

  clear(): void {
    const { proxy } = this
    if (proxy === null) {
      localStorage.clear()
    } else {
      for (const key of Object.getOwnPropertyNames(proxy)) {
        delete (proxy as any)[key]
      }
    }
  }

  getItem(key: string): string | null {
    const value = this.proxy === null
      ? localStorage.getItem(key)
      : (this.proxy as any)[key]
    if ((!value && !isString(value)) || value === 'null') {
      return null
    }
    return value
  }

  key(index: number): string | null {
    const { proxy } = this
    if (proxy === null) {
      return localStorage.key(index)
    }
    return Object.getOwnPropertyNames(proxy)[index] || null
  }

  removeItem(key: string): void {
    const { proxy } = this
    if (proxy === null) {
      localStorage.removeItem(key)
    } else {
      delete (proxy as any)[key]
    }
  }

  setItem(key: string, value: string): void {
    const { proxy } = this
    if (proxy === null) {
      localStorage.setItem(key, value)
    } else {
      (proxy as any)[key] = value
    }
  }

  static instance = new LocalStorageProxy()

  static proxied() {
    return new LocalStorageProxy(true)
  }

}