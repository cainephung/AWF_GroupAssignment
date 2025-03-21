// image_id could be a list of multiple id's or undefined in which case we
//  can assume the user wants all images.
//
// This could be taxing so we should definitely consider pagination.
async function getImagesFromDatabase(user_id, image_id = undefined) {
  // No database yet, to be integrated
  return [];
}

module.exports = {
  getImagesFromDatabase,
};
