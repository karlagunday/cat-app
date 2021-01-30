import axios from 'axios';

/**
 * Base class representing all resources using the API
 */
export default class Base {
  /**
   * Constructor to be inherited by subclasses
   */
  constructor() {
    this.sourceURL = 'https://api.thecatapi.com/v1';
    this.apiKey = process.env.API_KEY;
  }

  /**
   * Retrieves data from the API
   * @param {Object} options Optional request options supported by Axios
   * @return {Promise} Data retrieved from the API
   */
  retrieve(options = {}) {
    return this.get('', options);
  }

  /**
   * Retrieves data from the API based on the provided search criteria
   * @param {Object} filters Object of filter/search criteria
   * @param {Object} options Optional request options supported by Axios
   * @return {Promise} Data retrieved from the API
   */
  search(filters = {}, options = {}) {
    // add filters as parameters
    if (!options.params && typeof options.params !== 'object') {
      options.params = {};
    }
    options.params = {
      ...options.params,
      ...filters,
    };
    return this.get('/search', options);
  }

  /**
   * Generates the entity resource API URL
   */
  resourceUrl() {
    if (!this.resource) {
      throw new Error('No resource specified.');
    }
    return `${this.sourceURL}/${this.resource}`;
  }

  /**
   * Executes a GET request to the source API
   * @param {String} endpoint Optional String of URL endpoint
   * @param {Object} options Optional request options supported by axios
   * @return {Promise} Response data
   */
  get(endpoint = '', options = {}) {
    // determine request URL
    const url = `${this.resourceUrl()}${endpoint}`;

    // add authentication
    if (!options.headers && typeof options.headers !== 'object') {
      options.headers = {};
    }
    options.headers = {
      ...options.headers,
      'x-api-key': this.apiKey, // make sure configured API key will always take precedence
    };
    return axios
      .get(url, options)
      .then((result) => result.data)
      .catch((error) => {
        // @TODO - should this be an error code instead?
        throw new Error(
          'Apologies but we could not load new cats for you at this time! Miau!',
        );
      });
  }
}
