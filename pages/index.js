import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
export default function Home() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm Apple Support Assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // Sample knowledge base for the chatbot
  const knowledgeBase = {
    'iphone': [
      "If your iPhone won't turn on, try holding the power button and volume down button simultaneously for 10 seconds.",
      "To reset your iPhone settings, go to Settings > General > Reset > Reset All Settings.",
      "If your iPhone battery drains quickly, check which apps are using the most battery in Settings > Battery."
    ],
    'mac': [
      "To free up disk space on your Mac, go to Apple menu > About This Mac > Storage > Manage.",
      "If your Mac won't start up, try booting in Safe Mode by holding the Shift key during startup."
    ],
    'airpods': [
      "If one AirPod is quieter than the other, try cleaning it gently with a dry cotton swab.",
      "To reset your AirPods, press and hold the setup button on the back of the case for about 15 seconds.",
      "If your AirPods won't connect, make sure Bluetooth is turned on and try putting them back in the case before reconnecting."
    ],
    'ipad': [
      "If your iPad is frozen, try force restarting it by pressing and holding the top button and either volume button.",
      "To improve iPad battery life, reduce screen brightness and turn off Background App Refresh in Settings.",
      "If your iPad won't charge, check for debris in the charging port and try a different cable and power adapter."
    ],
    'apple watch': [
      "If your Apple Watch isn't receiving notifications, check if Do Not Disturb is enabled.",
      "To force restart your Apple Watch, press and hold both the side button and Digital Crown for at least 10 seconds.",
      "If your Apple Watch isn't pairing with your iPhone, make sure both devices have Bluetooth turned on and are close to each other."
    ]
  };
  // Common phrases that might indicate what product the user is asking about
  const productKeywords = {
    'iphone': ['iphone', 'phone', 'ios', 'siri', 'face id', 'touch id'],
    'mac': ['mac', 'macbook', 'imac', 'macos', 'laptop', 'desktop', 'computer'],
    'airpods': ['airpods', 'airpod', 'headphones', 'earbuds', 'earphones'],
    'ipad': ['ipad', 'tablet', 'ipados', 'pencil'],
    'apple watch': ['watch', 'apple watch', 'watchos']
  };
  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // Focus input field on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    // Add user message
    const userMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    // Check for greetings
    if (input.match(/hello|hi|hey|greetings/i)) {
      return "Hello! How can I assist you with your Apple product today?";
    }
    // Check for thanks
    if (input.match(/thank you|thanks|thx/i)) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    // Check for goodbye
    if (input.match(/bye|goodbye|see you|farewell/i)) {
      return "Thank you for chatting with Apple Support. Have a great day!";
    }
    // Identify which product the user might be asking about
    let detectedProduct = null;
    for (const [product, keywords] of Object.entries(productKeywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        detectedProduct = product;
        break;
      }
    }
    // If we detected a product, provide a relevant response
    if (detectedProduct && knowledgeBase[detectedProduct]) {
      // Randomly select one of the tips for the detected product
      const tips = knowledgeBase[detectedProduct];
      return tips[Math.floor(Math.random() * tips.length)];
    }
    // Check for specific issues
    if (input.includes('password') || input.includes('forgot')) {
      return "To reset your Apple ID password, visit iforgot.apple.com. If you need to reset your device password, I can guide you through the process for your specific device.";
    }
    if (input.includes('slow') || input.includes('performance')) {
      return "Performance issues can have many causes. Try closing unused apps, restarting your device, and checking for software updates. If you tell me which device you're using, I can provide more specific advice.";
    }
    if (input.includes('battery') || input.includes('charging')) {
      return "Battery issues are common. Check your battery health in settings, reduce screen brightness, and close background apps. Which Apple device are you having battery problems with?";
    }
    // Default response if no specific match
    return "I'm not sure I understand your question. Could you provide more details about which Apple product you need help with?";
  };
  // Quick help suggestions
  const suggestions = [
    "My iPhone won't turn on",
    "How do I reset my AirPods?",
    "My Mac is running slowly",
    "Battery draining too fast",
    "Can't remember Apple ID password"
  ];
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    // Submit the form programmatically
    const form = document.getElementById('chat-form');
    if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
  };
  return (
    <div className="min-h-screen bg-apple-gray">
      <Head>
        <title>Apple Support Assistant</title>
        <meta name="description" content="AI-powered support chatbot for Apple products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image 
              src="https://logo.clearbit.com/apple.com" 
              alt="Apple Logo" 
              width={40} 
              height={40}
              className="mr-3"
            />
            <h1 className="text-xl font-semibold text-apple-darkgray">Support Assistant</h1>
          </div>
          <div className="text-sm text-gray-500">
            Managed by AppleCare
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-apple-darkgray text-white">
            <h2 className="text-lg font-medium">Apple Support Chat</h2>
            <p className="text-sm opacity-80">Ask questions about any Apple product</p>
          </div>
          <div className="chat-container overflow-y-auto p-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="message-bubble bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Quick help:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            <form id="chat-form" onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue"
              />
              <button
                type="submit"
                className="bg-apple-blue hover:bg-blue-600 text-white rounded-full px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>This AI assistant is continuously learning to better serve you.</p>
          <p>For urgent issues, please contact <a href="#" className="text-apple-blue hover:underline">Apple Support directly</a>.</p>
        </div>
      </main>
      <footer className="mt-8 py-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Apple Inc. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-gray-500 hover:text-gray-700 mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 mx-2">Terms of Use</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 mx-2">Support</a>
          </p>
        </div>
      </footer>
    </div>
  )
}