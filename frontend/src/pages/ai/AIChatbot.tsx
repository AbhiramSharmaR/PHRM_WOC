import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/layouts/MainLayout';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  'What are symptoms of diabetes?',
  'How can I improve my sleep?',
  'What foods help lower cholesterol?',
  'Tips for managing stress',
];

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI health assistant. I can help answer your health-related questions, provide general medical information, and offer wellness tips. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponses: Record<string, string> = {
      default: "I understand your concern. While I can provide general health information, I recommend consulting with a healthcare professional for personalized medical advice. Is there anything specific about this topic you'd like me to explain?",
      diabetes: "Diabetes is a metabolic disease that causes high blood sugar. Common symptoms include:\n\n• Increased thirst and frequent urination\n• Unexplained weight loss\n• Fatigue and weakness\n• Blurred vision\n• Slow-healing sores\n\nIf you're experiencing these symptoms, please consult a healthcare provider for proper diagnosis and treatment.",
      sleep: "Here are some tips to improve your sleep quality:\n\n1. **Maintain a schedule** - Go to bed and wake up at the same time daily\n2. **Create a restful environment** - Keep your room dark, quiet, and cool\n3. **Limit screen time** - Avoid phones and computers 1 hour before bed\n4. **Watch your diet** - Avoid caffeine and large meals before bedtime\n5. **Exercise regularly** - But not too close to bedtime\n\nWould you like more specific advice?",
      cholesterol: "Foods that can help lower cholesterol:\n\n• **Oats and whole grains** - Rich in soluble fiber\n• **Fatty fish** - Salmon, mackerel (omega-3 fatty acids)\n• **Nuts** - Almonds, walnuts in moderation\n• **Olive oil** - Use instead of butter\n• **Fruits and vegetables** - Especially apples, grapes, strawberries\n• **Beans and legumes** - Great source of soluble fiber\n\nRemember to combine healthy eating with regular exercise for best results!",
      stress: "Here are effective stress management techniques:\n\n1. **Deep breathing exercises** - Try 4-7-8 breathing technique\n2. **Regular physical activity** - Even a 10-minute walk helps\n3. **Mindfulness meditation** - Start with 5 minutes daily\n4. **Adequate sleep** - Aim for 7-9 hours\n5. **Social connections** - Talk to friends and family\n6. **Time management** - Prioritize tasks and set boundaries\n\nWould you like me to explain any of these techniques in detail?",
    };

    let response = aiResponses.default;
    const lowerText = text.toLowerCase();
    if (lowerText.includes('diabetes')) response = aiResponses.diabetes;
    else if (lowerText.includes('sleep')) response = aiResponses.sleep;
    else if (lowerText.includes('cholesterol')) response = aiResponses.cholesterol;
    else if (lowerText.includes('stress')) response = aiResponses.stress;

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col"
      >
        <div className="mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            AI Health Assistant
          </h1>
          <p className="text-muted-foreground">Get answers to your health questions</p>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-3 max-w-[85%]',
                    message.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                      message.role === 'user' ? 'bg-primary/10' : 'bg-accent'
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'rounded-2xl p-4',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted rounded-tl-sm'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={cn(
                        'text-[10px] mt-2',
                        message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="px-3 py-1.5 text-xs rounded-full bg-accent hover:bg-accent/80 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Ask a health question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isLoading} variant="gradient">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                AI responses are for informational purposes only. Consult a doctor for medical advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
};

export default AIChatbot;
