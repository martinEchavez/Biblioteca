const knex = require('knex');
const config = require('../../database/conection');
const db = knex(config);

const getReaders = async () => {
  return await db('reader');
};

const getReaderById = async (id) => {
  return await db('reader').where('id', '=', id);
};

const createReader = async (reader) => {
  return await db('reader').insert(reader);
};

const updateReader = async (id, reader) => {
  return await db('reader').where('id', '=', id).update(reader);
};

const deleteReader = async (id) => {
  return await db('reader').where('id', '=', id).del();
};

module.exports = {
  get: getReaders,
  getReader: getReaderById,
  create: createReader,
  update: updateReader,
  remove: deleteReader,
};
