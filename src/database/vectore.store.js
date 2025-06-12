import { MongoDBAtlasVectorSearch } from 'langchain/vectorstores/mongodb_atlas';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_ATLAS_URI || '');
const namespace = 'langchain.test';
const [dbName, collectionName] = namespace.split('.');
const collection = client.db(dbName).collection(collectionName);

const vectorStore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings(), {
  collection,
  indexName: 'default', // The name of the Atlas search index. Defaults to "default"
  textKey: 'text', // The name of the collection field containing the raw content. Defaults to "text"
  embeddingKey: 'embedding', // The name of the collection field containing the embedded text. Defaults to "embedding"
});

export default vectorStore;
