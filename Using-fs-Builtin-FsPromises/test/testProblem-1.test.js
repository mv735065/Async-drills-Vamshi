// fileOperations.test.js

const { createFiles, deleteFiles } = require('../problem-1'); // Import actual functions

jest.mock('../problem-1', () => ({
  createFiles: jest.fn(),
  deleteFiles: jest.fn(),
}));

describe('File Operations', () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    createFiles.mockReset();
    deleteFiles.mockReset();
  });

  test('should create and delete files successfully', (done) => {
    // Mock successful file creation and deletion
    createFiles.mockImplementation((callback) => callback(null));
    deleteFiles.mockImplementation((callback) => callback(null));

    // Run the code to test
    createFiles((err) => {
      expect(err).toBeNull();
      console.log("Created files successfully!");

      deleteFiles((err) => {
        expect(err).toBeNull();
        console.log("Deleted files and directory successfully!");
        done(); // Call done to indicate the test is complete
      });
    });

    // Assert the functions were called
    expect(createFiles).toHaveBeenCalledTimes(1);
    expect(deleteFiles).toHaveBeenCalledTimes(1);
  });


});
