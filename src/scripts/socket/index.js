import io from 'socket.io-client'
import { EventEmitter } from 'eventemitter3'
const Status = {
  READY: 'ready',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  OPEN: 'open',
  CLOSE: 'close'
}
export default class Socket {
  socket = undefined
  status = Status.READY
  events = {}
  event = new EventEmitter()
  url = ''
  sendCache = []
  constructor(url) {
    this.url = url
  }
  on(eventName, eventFunc) {
    console.log(eventName)
    if (!this.events[eventName]) {
      this.events[eventName] = []
      if (this.socket) {
        this.socket.on(eventName, data => {
          console.log('接收', eventName, data)
          this.events[eventName].forEach(e => {
            e(data)
          })
        })
      }
    }
    if (this.events[eventName].indexOf(eventFunc) != -1) {
      return
    }
    this.events[eventName].push(eventFunc)
  }
  off(eventName, eventFunc) {
    if (!this.events[eventName]) {
      return
    }
    let index = this.events[eventName].indexOf(eventFunc)
    if (index == -1) {
      return
    }
    this.events[eventName].splice(index, 1)
  }
  send(method, data) {
    if (this.status != Status.OPEN) {
      return this.sendCache.push({
        method: method,
        data: data
      })
    }
    data.eventName = method
    console.log('?????', data)
    this.socket.emit('message', data)
  }
  eventOn(eventName, event) {
    this.event.on(eventName, event)
  }
  eventOff(eventName, event) {
    this.event.off(eventName, event)
  }
  eventOnce(eventName, event) {
    this.event.once(eventName, event)
  }
  getId() {
    return this.socket ? this.socket.id : null
  }
  isConnected() {
    return this.status == Status.OPEN
  }
  close() {
    this.socket.close()
    this.socket = null
    this.status = Status.CLOSE
  }
  createSocket() {
    if (this.socket) {
      this.close()
    }
    this.socket = io(this.url)
    this.socket.on('connect', () => {

      this.status = Status.OPEN
      this.sendCache.forEach(cache => {
        this.send(cache.method, cache.data)
      })
      this.sendCache = []
      this.event.emit('changeStatus', 'connect')
      this.log('socketIo connect:', this.socket.id)
    })
    this.socket.on('connect_error', () => {

      this.status = Status.DISCONNECT
      this.event.emit('changeStatus', this.status)
      this.log('socketIo disconnect:', this.socket.id)
    })
    this.on('reconnect', () => {
      this.event.emit('reconnect')
    })
    this._addEvent()
  }
  _addEvent() {
    if (!this.socket) {
      return
    }
    for (let i in this.events) {
      ; (i => {
        this.socket.on(i, data => {
          this.log(i, data)
          this.events[i].forEach(event => {
            event(data)
          })
        })
      })(i)
    }
  }
  log(...data) {
    console.warn(...data)
  }
  eventOnByVue(events, vue) {
    for (let eventName in events) {
      this.on(eventName, events[eventName].bind(vue))
    }
  }
  static installed = false
  static install(Vue) {
    if (Socket.installed) {
      return
    }
    Socket.installed = true
    Vue.mixin({
      beforeCreate() {
        if (this.$options.socket) {
          this.$socket = this.$options.socket
        }
      }
    })
  }
}
