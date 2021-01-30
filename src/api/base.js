import axios from "axios";

/**
 * Base class representing all resources using the API
 */
export default class Base {

  /**
   * Constructor to be inherited by subclasses
   */
  constructor() {
    this.sourceURL = "https://api.thecatapi.com/v1";
    this.apiKey = process.env.API_KEY
  }

  /**
   * Retrieves data from the API
   * @param {Object} options Optional request options supported by Axios
   * @return {Promise} Data retrieved from the API
   */
  retrieve(options = {}) {
    if (!this.resource) {
      throw new Error("No resource specified.")
    }

    // add authentication
    if (!options.headers && typeof options.headers !== 'object') {
      options.headers = {}
    }
    options.headers = {
      ...options.headers,
      'x-api-key': this.apiKey // make sure configured API key will always take precedence
    }

    // @TODO - require `resource`?
    return axios.get(`${this.sourceURL}/${this.resource}`, options)
      .then(result => result.data)
      .catch(error => {
        // @TODO - should this be an error code instead?
        throw new Error("Apologies but we could not load new cats for you at this time! Miau!")
      })
  }
}