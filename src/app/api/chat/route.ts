import vectorStore from "@/database/vectore.store";
import { NextRequest } from 'next/server';
import { StreamingTextResponse } from 'ai';
import {
    RunnablePassthrough,
    RunnableSequence,
} from "langchain/schema/runnable";
import { BytesOutputParser } from "langchain/schema/output_parser";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { formatDocumentsAsString } from "langchain/util/document";

// export const runtime = 'edge';

const vectorStoreRetriever = vectorStore.asRetriever();

const SYSTEM_TEMPLATE = `Utilice las siguientes piezas de contexto para responder la pregunta al final.
Actua como un asistente llamado Felipe que ayuda a las personas a entender preguntas sobre las estruturas de datos y reponda de manera amable y clara a el usuario.
Si no sabe la respuesta, simplemente diga que no la sabe, no intente inventar una respuesta.
----------------
{context}`;

const messages = [
    SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
    HumanMessagePromptTemplate.fromTemplate("{question}"),
];

const prompt = ChatPromptTemplate.fromMessages(messages);

export async function POST(req: NextRequest) {
    const body = await req.json();

    const messages = body.messages ?? [];
    const question = messages[messages.length - 1].content;

    console.log(question);

    const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.8,
    });
    const outputParser = new BytesOutputParser();

    const chain = RunnableSequence.from([
        {
            context: vectorStoreRetriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
        },
        prompt,
        model,
        outputParser
    ]);

    console.log("Generando respuesta...");

    const stream = await chain.stream(question);

    console.log("Respuesta generada");

    return new StreamingTextResponse(stream);
}