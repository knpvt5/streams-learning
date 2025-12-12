class CustomEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      throw new Error(`Event ${eventName} does not exist`);
    }
    this.events[eventName].forEach((listener) => {
      listener(...args);
    });
  }
}
