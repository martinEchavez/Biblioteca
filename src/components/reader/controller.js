const { get, getReader, create, update, remove } = require('./store');
const response = require('../../network/response');

const getReaders = async () => {
  const readers = await get();
  if (readers) {
    return response.success('Readers success', 200, readers);
  }
};

const getReaderById = async (id) => {
  const foundReader = await getReader(id);

  if (foundReader.length === 0) {
    return response.error('reader not found', 404);
  }

  return response.success('Found reader', 200, foundReader);
};

const createReader = async (name) => {
  if (typeof name === 'undefined') {
    return response.error('name is required.', 401);
  }

  const reader = {
    name,
  };

  const readerCreate = await create(reader);

  if (readerCreate) {
    const foundReader = await getReader(readerCreate[0]);
    return response.success('Reader Created', 200, foundReader);
  }
};

const updateReader = async (id, reader) => {
  const updateReader = await update(id, reader);
  if (updateReader === 0) {
    return response.error('reader not found', 404);
  }

  const foundReader = await getReader(id);
  return response.success('Reader updated', 200, foundReader);
};

const deleteReader = async (id) => {
  const result = await remove(id);
  if (result === 0) {
    return response.error('Reader not found', 404);
  }

  return response.success('Reader Deleted', 200);
};

module.exports = {
  getReaders,
  getReaderById,
  createReader,
  updateReader,
  deleteReader,
};
