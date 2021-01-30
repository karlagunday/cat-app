/**
 * Test retrieving data from the API
 */
import Breed from '../../api/breed';
import Image from '../../api/image';
describe('API functions', () => {
  let breeds = null;
  it('should retrieve data from API', () => {
    return new Breed().retrieve().then((data) => {
      expect(data).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      );
      breeds = data;
    });
  });
  it('should retrieve a list of images filtered by a specific breed', () => {
    const breed = breeds[0]; // breed to filter results
    return new Image()
      .search({
        breed_id: breed.id,
      })
      .then((data) => {
        expect(data).toStrictEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              breeds: expect.arrayContaining([
                expect.objectContaining({
                  id: breed.id, // make sure images are of the correct breed
                }),
              ]),
            }),
          ]),
        );
      });
  });
});
