import Base from './base';

/** Cat class that represents the Cat entity */
export default class Cat extends Base {
  /**
   * Instantiates an Cat object
   */
  constructor() {
    super();
    this.resource = 'images'; // resourece endpoint for this entity, and yes, endpoint is 'image'
  }
}
