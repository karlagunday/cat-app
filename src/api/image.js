import Base from './base';

/** Image class that represents the Image entity */
export default class Image extends Base {
  /**
   * Instantiates an image object
   */
  constructor() {
    super();
    this.resource = 'images'; // resourece endpoint for this entity
  }
}
