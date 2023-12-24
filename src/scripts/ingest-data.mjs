import "dotenv/config"
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MongoClient } from "mongodb";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";

const embeddings = new OpenAIEmbeddings();

const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
const namespace = "langchain.test";
const [dbName, collectionName] = namespace.split(".");
const collection = client.db(dbName).collection(collectionName);

const loader = new PDFLoader("./src/docs/estruc-datos.pdf");
const doc = await loader.load();

let text = "";
doc.forEach((page) => {
    text += page.pageContent;
});

const splitter = new CharacterTextSplitter({
    separator: "\n",
    chunkSize: 1000,
    chunkOverlap: 200,
});

const docs = await splitter.createDocuments([text]);
console.log(`Cantidad de documentos creados: ${docs.length}`);

await MongoDBAtlasVectorSearch.fromDocuments(docs, embeddings,
    {
        collection,
        indexName: "default", // The name of the Atlas search index. Defaults to "default"
        textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
        embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    }
)

await client.close();