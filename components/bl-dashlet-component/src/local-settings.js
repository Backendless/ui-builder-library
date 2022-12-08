export class LocalSettings {
  constructor(instanceId) {
    this.instanceId = instanceId;
  }

  get isOpen() {
    const isOpen = localStorage.getItem(this.instanceId + ' isOpen');

    return isOpen === null || isOpen === 'true';
  }

  set isOpen(value) {
    localStorage.setItem(this.instanceId + ' isOpen', String(value));
  }

  get position() {
    const position = localStorage.getItem(this.instanceId + ' position');

    return position ? JSON.parse(position) : { x: 0, y: 0 };
  }

  set position(value) {
    localStorage.setItem(this.instanceId + ' position', JSON.stringify(value));
  }

  get size() {
    return JSON.parse(localStorage.getItem(this.instanceId + ' size'));
  }

  set size(value) {
    localStorage.setItem(this.instanceId + ' size', JSON.stringify(value));
  }
}
