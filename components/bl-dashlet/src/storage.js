export class Storage {
  constructor(instanceId) {
    this.name = `UIComponent_Dashlet_${ instanceId }`;
  }

  getStore() {
    let result;

    try {
      result = JSON.parse(localStorage.getItem(this.name));
    } catch (e) {
      result = {};
    }

    if (!result || typeof result !== 'object' || Array.isArray(result)) {
      result = {};
    }

    return result;
  }

  setValue(key, value) {
    const store = this.getStore();

    localStorage.setItem(this.name, JSON.stringify({ ...store, [key]: value }));
  }

  getValue(key) {
    const store = this.getStore();

    return store[key];
  }

  get isOpen() {
    const isOpen = this.getValue('isOpen');

    return isOpen === undefined ? true : isOpen;
  }

  set isOpen(value) {
    this.setValue('isOpen', value);
  }

  get position() {
    return this.getValue('position');
  }

  set position(value) {
    this.setValue('position', value);
  }

  get size() {
    return (this.getValue('size'));
  }

  set size(value) {
    this.setValue('size', value);
  }
}
