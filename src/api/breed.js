import Base from './base'

/** Breed class that represents the Breed entity */
export default class Breed extends Base {

  /**
   * Instantiates a breed object
   */
  constructor() {
    super()
    this.resource = "breeds" // resourece endpoint for this entity
  }
}