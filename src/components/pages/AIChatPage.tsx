import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, Heart, MessageCircle, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI mental health assistant. I'm here to listen, provide support, and help you manage stress. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Demo responses based on keywords
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return "I understand you're feeling stressed. Let's try a quick breathing exercise: Take a deep breath in for 4 counts, hold for 4, and exhale for 4. Repeat this 3 times. Would you like to talk about what's causing the stress?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return "I'm sorry you're feeling this way. Your feelings are valid. Sometimes it helps to break down what's troubling you. Would you like to share what's on your mind? Remember, if you're experiencing severe depression, please reach out to a professional through our Doctors Directory.";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return "Sleep issues can really affect our mental health. Here are some tips: maintain a consistent sleep schedule, avoid screens 1 hour before bed, and try relaxation techniques. Would you like me to guide you through a relaxation exercise?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm here whenever you need support. Remember, taking care of your mental health is a sign of strength. Is there anything else I can help you with today?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('emergency')) {
      return "If you're in crisis or need immediate help, please use our Emergency Support feature in the navigation menu, or call your local emergency services. For non-emergency support, I'm here to listen and help. What would you like to talk about?";
    }
    
    // Default supportive response
    return "Thank you for sharing that with me. I'm here to support you. Can you tell me more about how you're feeling? Sometimes talking through our thoughts can help us understand them better.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "I'm feeling stressed",
    "Help me relax",
    "I can't sleep",
    "I need motivation",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-primary/10 to-highlightyellow/10 py-12">
          <div className="max-w-[100rem] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-heading text-4xl md:text-5xl text-foreground">
                    AI Mental Health Assistant
                  </h1>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Demo Mode
                  </Badge>
                </div>
                <p className="font-paragraph text-lg text-foreground/80">
                  Your 24/7 companion for stress relief and mental health support
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chat Interface */}
        <section className="w-full py-8 flex-1">
          <div className="max-w-[100rem] mx-auto px-6 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Main Chat Area */}
              <div className="lg:col-span-2">
                <Card className="border-2 h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-heading text-2xl flex items-center gap-2">
                          <Sparkles className="w-6 h-6 text-primary" />
                          Chat with AI Assistant
                        </CardTitle>
                        <CardDescription className="font-paragraph">
                          Confidential and supportive conversation
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-paragraph text-sm text-foreground/60">Online</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-foreground'
                          }`}
                        >
                          <p className="font-paragraph text-sm leading-relaxed">
                            {message.content}
                          </p>
                          <p className={`font-paragraph text-xs mt-2 ${
                            message.role === 'user' ? 'text-white/70' : 'text-foreground/50'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-4 rounded-2xl">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </CardContent>

                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 h-12 font-paragraph"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="h-12 px-6"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Quick Prompts</CardTitle>
                    <CardDescription className="font-paragraph">
                      Start a conversation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto py-3 px-4"
                        onClick={() => setInputMessage(prompt)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-paragraph text-sm text-left">{prompt}</span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-2 bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      Important Note
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-blue-900 leading-relaxed">
                      This AI assistant is in demo mode and provides general support. 
                      For professional mental health care, please visit our Doctors Directory 
                      or use Emergency Support if you're in crisis.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-heading text-sm">Stress Relief</p>
                        <p className="font-paragraph text-xs text-foreground/60">
                          Guided relaxation techniques
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bot className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-heading text-sm">24/7 Support</p>
                        <p className="font-paragraph text-xs text-foreground/60">
                          Always here when you need to talk
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-heading text-sm">Personalized Care</p>
                        <p className="font-paragraph text-xs text-foreground/60">
                          Tailored responses to your needs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
