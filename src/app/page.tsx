"use client";

import { useChat } from 'ai/react';
import { Textarea, Button, Avatar } from "@nextui-org/react";
import { FaUser, FaRobot, FaRegFilePdf } from "react-icons/fa";
import { IoSend } from "react-icons/io5"
import Link from 'next/link';

import { useRef, useEffect } from 'react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className='z-50 flex flex-col justify-between gap-5 h-screen m-auto py-5 max-w-[1000px]'>
      <div className="-z-10 fixed left-0 top-0 h-screen w-screen bg-[url('/bg-image.webp')] bg-cover bg-center opacity-10"></div>
      <div ref={messagesRef} className="flex flex-col items-start gap-y-10  border h-full rounded-xl p-10 overflow-y-scroll">
        <div className='bg-[#18181b] rounded-2xl p-5'>
          <span className='flex items-center gap-2'>
            <Avatar
              className='text-2xl'
              icon={<FaRobot />}
            />
            <b>Felipe</b>
          </span>
          <div className='pt-2'>
            <p>¡Hola! 👋, soy Felipe, tu asistente de IA 🤖 personal. Me he entrenado minuciosamente con un documento PDF repleto de información sobre estructuras de datos.</p>
            <div className='flex items-center gap-2 my-4'>
              <p>Este el documento por si lo quieres descargar:</p>
              <Link className='p-2 rounded-xl bg-blue-600 text-3xl' href="estruc-datos.pdf" target="_blank" download><FaRegFilePdf /></Link>
            </div>
            <p>
              Estoy listo para responder todas tus preguntas relacionadas con este fascinante tema.
              ¡No dudes en preguntarme sobre estructuras de datos y exploraremos juntos este emocionante mundo!
            </p>
          </div>
        </div>
        {messages.map(m => (
          <div key={m.id} className='bg-[#18181b] rounded-2xl p-5'>
            <span className='flex items-center gap-2'>
              <Avatar
                className='text-2xl'
                icon={m.role === 'user' ? <FaUser /> : <FaRobot />}
              />
              <b>{m.role === 'user' ? 'User' : 'Felipe'}</b>
            </span>
            <p className='pt-2'>
              {m.content}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full flex items-end gap-2">
        <Textarea
          minRows={2}
          variant="bordered"
          placeholder="Enter a question"
          value={input}
          className='bg-red'
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit({ ...e, currentTarget: e.currentTarget.parentElement as HTMLFormElement });
            }
          }}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          className='text-white py-7'
        >
          {!isLoading ? <IoSend /> : ""}
        </Button>
      </form>
    </main>
  )
}
