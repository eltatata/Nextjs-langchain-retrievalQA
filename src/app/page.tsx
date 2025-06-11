"use client"

import React, { useState, useRef, useEffect } from "react"
import { useChat } from 'ai/react';
import ChatHeader from "@/components/chat/chat-header";
import PdfDownloadButton from "@/components/chat/pdf-download-button";
import ChatContainer from "@/components/chat/chat-container";
import ChatFooter from "@/components/chat/chat-footer";
import AnimatedBackground from "@/components/chat/animated-background";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    handleSubmit(e)
  }

  useEffect(() => {
    if (!isLoading) {
      setIsTyping(false)
    }
  }, [isLoading])

  useEffect(() => {
    if (messages.length > 0 && isTyping) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'assistant') {
        setIsTyping(false)
      }
    }
  }, [messages, isTyping])
  
  const handleQuestionClick = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
    setTimeout(() => {
      const form = document.querySelector('form')
      if (form) {
        setIsTyping(true)
        form.requestSubmit()
      }
    }, 0)
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-10 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative max-w-4xl mx-auto h-max z-10">
        <ChatHeader 
          title="Hi, I'm Felipe" 
          subtitle="Ask me anything about data structures and algorithms" 
        />
        <PdfDownloadButton 
          href="estruc-datos.pdf" 
          text="Download Reference PDF" 
        />
        <ChatContainer
          messages={messages}
          input={input}
          isLoading={isLoading}
          isTyping={isTyping}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
          onQuestionClick={handleQuestionClick}
          messagesEndRef={messagesEndRef}
        />
        <ChatFooter text="Powered by AI • Focused on Data Structures & Algorithms" />
      </div>
    </div>
  )
}
