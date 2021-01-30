/**
 * Test retrieving data from the API
 */
import Breed from '../../api/breed';
describe('API functions', () => {
  it('should retrieve data from API', () => {
    return new Breed().retrieve().then((data) => {
      expect(data).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      );
    });
  });
});
