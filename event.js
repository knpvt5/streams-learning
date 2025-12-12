import { EventEmitter } from "node:events";

class EmitterError extends Error {
  constructor(message, eventName) {
    super(message);
    this.eventName = eventName;
    this.timestamp = new Date();
  }
}

class CustomEmitter extends EventEmitter {
  constructor() {
    super();
  }

  emit(eventName, ...args) {
    console.log(`[EMIT] Event "${eventName}" fired with args:`, args);

    // Validate event exists
    if (!this.eventNames().includes(eventName)) {
      throw new EmitterError(`Event ${eventName} does not exist`);
    }

    return super.emit(eventName, ...args);
  }
}

const emitter = new CustomEmitter();
emitter.setMaxListeners(20);

// function eventfirer(eventName, arg) {
//   if (!emitter.eventNames().includes(eventName)) {
//     throw new EmitterError(`Event ${eventName} does not exist exist`);
//   }
//   emitter.emit(eventName, arg);
// }

emitter.on("a", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.on("b", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.on("c", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.on("c", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit("a", "Karan");
emitter.emit("b", "Peter");
emitter.emit("c", "Rahul");
emitter.emit("d", "Mukesh");

console.log(emitter.eventNames());
