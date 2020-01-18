/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-use-before-define */

/**
 * Base class for inheritance.
 */
export default class Base {
  /**
       * Extends this object and runs the init method.
       * Arguments to create() will be passed to init().
       * @return {Object} The new object.
       * @static
       * @example
       *     var instance = MyType.create()
       */
  static create(...args) {
    return new this(...args);
  }

  /**
       * Copies properties into this object.
       *
       * @param {Object} properties The properties to mix in.
       *
       * @example
       *
       *     MyType.mixIn({
       *         field: 'value'
       *     })
       */
  mixIn(properties) {
    return Object.assign(this, properties);
  }

  /**
       * Creates a copy of this object.
       *
       * @return {Object} The clone.
       *
       * @example
       *
       *     var clone = instance.clone()
       */
  clone() {
    const clone = new this.constructor();
    Object.assign(clone, this);
    return clone;
  }
}
