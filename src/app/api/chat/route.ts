import vectorStore from '@/database/vectore.store';
import { NextRequest } from 'next/server';
import { LangChainAdapter } from 'ai';
import {
  RunnableSequence,
  RunnablePassthrough,
} from '@langchain/core/runnables';

import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { formatDocumentsAsString } from 'langchain/util/document';

// export const runtime = 'edge';

const vectorStoreRetriever = vectorStore.asRetriever();

const SYSTEM_TEMPLATE = `Utilice las siguientes piezas de contexto para responder la pregunta al final.
Actua como un asistente llamado Felipe que ayuda a las personas a entender preguntas sobre las estruturas de datos y reponda de manera amable y clara a el usuario.
Si no encuentras la respuesta en el contexto o no sabes la respuesta, simplemente diga que no la sabe, no intente inventar una respuesta.
Si la pregunta no está relacionada con estructuras de datos, responde amablemente que estás preparado para responder sólo a preguntas relacionadas con estructuras de datos.
----------------
{context}`;

const messages = [
  SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
  HumanMessagePromptTemplate.fromTemplate('{question}'),
];

const prompt = ChatPromptTemplate.fromMessages(messages);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const messages = body.messages ?? [];
  const question = messages[messages.length - 1].content;

  console.log(question);

  const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.8,
  });
  const outputParser = new StringOutputParser();

  const chain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    outputParser,
  ]);

  console.log('Generando respuesta...');

  const stream = await chain.stream(question);

  console.log('Respuesta generada');

  return LangChainAdapter.toDataStreamResponse(stream);
}
