import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  HelpCircle,
  PhoneCall,
  ChevronDown,
  Minimize2,
  RefreshCw,
  Info
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  badge?: string;
  chips?: string[];
}

const PRESET_TOPICS = [
  'Why is CABO a gateway, not a buyer?',
  'How do weekly payouts & 4% fees work?',
  'How does optical OCR verify the CT clamp?',
  'Which Madhya Pradesh DISCOMs are active?',
  'Can I connect my 3 kW PM Surya Ghar solar?',
];

const KNOWLEDGE_BASE: Record<string, string> = {
  gateway: `**CABO is an open dMRV clearinghouse and gateway — not a speculative buyer or carbon broker.**

Here is how our non-custodial model protects solar hosts:
1. **Zero Inventory Risk**: We never buy your credits cheap to flip them on global exchanges.
2. **Direct Peer-to-Peer Clearing**: Institutional buyers purchase directly from pooled rooftop producers.
3. **96% Host Payout**: 96% of the carbon credit sale proceeds flow straight into your bank account via automated weekly UPI or NEFT.
4. **4% Transparent Gateway Fee**: CABO retains only a modest 4% infrastructure fee to maintain the cryptographic Merkle pipeline, cellular SIM uplinks, and registry retirement compliance.`,

  payouts: `**Weekly Payouts are automated every Monday morning:**

1. **Daily Gross Generation**: Measured every second at 50 Hz by the Class 0.5S ADE7953 CT sensor.
2. **Weekly Aggregation**: Telemetry from Monday 00:00 to Sunday 23:59 is aggregated into an audit batch.
3. **CEA Baseline Conversion**: Clean generation is multiplied by India's Central Electricity Authority baseline factor (**0.716 kg CO₂/kWh**).
4. **Weekly Financial Settlement**: Accrued carbon credits are matched with institutional ESG purchase contracts. 
- You receive **96% directly in your bank account** via UPI.
- A signed PDF Tax Invoice & Registry Retirement Certificate is generated in your portal.`,

  optical: `**CABO’s Dual-Layer Anti-Tamper Verification:**

Standard smart meters can be hacked or spoofed via inverter firmware mods. To prevent this, CABO uses two completely independent physical channels:

1. **Physical AC Current Clamps (ADE7953 IC)**: Independent split-core magnetic CT sensors clamped on the inverter AC output. Not connected to inverter firmware.
2. **Edge Computer Vision Camera (ESP32-CAM)**: An optical camera pointed at the inverter's physical LCD screen runs on-device TinyML OCR to read cumulative generation digits.
3. **Cross-Validation Gate**: The cryptographic processor (ATECC608A) requires that CT measurements and optical LCD OCR match within **<2.0% discrepancy**. If anyone tries to spoof inverter firmware, the mismatch triggers an immediate integrity quarantine.`,

  discom: `**Active Madhya Pradesh Pilot Deployment (247 Rooftops):**

CABO is currently deployed across all 3 state electricity distribution companies:
- **MPPKVVCL (West Discom)**: 142 rooftops in Indore, Ujjain, and Sanwer industrial corridor.
- **MPMKVVCL (Central Discom)**: 68 rooftops in Bhopal and surrounding institutional campuses.
- **MPPoKVVCL (East Discom)**: 37 rooftops in Jabalpur and industrial micro-clusters.

All nodes are cross-verified against official substation net-meter feeding tariffs under MPERC regulations.`,

  surya: `**Yes! Systems under PM Surya Ghar: Muft Bijli Yojana are 100% compatible.**

- While the government subsidy and DISCOM net-metering handle your electricity bill offset, you own the environmental attribute (carbon rights) of the gross clean energy you generate.
- Standard net meters only measure the surplus electricity you send back to the grid. 
- The CABO meter measures your **gross solar generation** (including the energy your home consumes during the day), unlocking carbon credits for every single kilowatt-hour your panels produce.`,
};

export const SupportChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I'm **Asha**, your CABO Solar & Gateway Assistant.

How can I help you today? Ask me about our **weekly payout calculations**, why **CABO is a zero-inventory gateway**, or how our **hardware anti-tamper verification** works.`,
      timestamp: 'Just now',
      badge: 'AI ASSISTANT · MP PILOT DESK',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Contextual matching logic
    setTimeout(() => {
      let replyText = '';
      const lower = userText.toLowerCase();

      if (lower.includes('gateway') || lower.includes('buy') || lower.includes('commission') || lower.includes('broker') || lower.includes('inventory')) {
        replyText = KNOWLEDGE_BASE.gateway;
      } else if (lower.includes('weekly') || lower.includes('payout') || lower.includes('money') || lower.includes('upi') || lower.includes('payment') || lower.includes('report')) {
        replyText = KNOWLEDGE_BASE.payouts;
      } else if (lower.includes('optical') || lower.includes('camera') || lower.includes('ocr') || lower.includes('tamper') || lower.includes('clamp') || lower.includes('fake') || lower.includes('verify')) {
        replyText = KNOWLEDGE_BASE.optical;
      } else if (lower.includes('discom') || lower.includes('madhya pradesh') || lower.includes('mp') || lower.includes('indore') || lower.includes('bhopal') || lower.includes('mppkvvcl')) {
        replyText = KNOWLEDGE_BASE.discom;
      } else if (lower.includes('surya') || lower.includes('subsidy') || lower.includes('3 kw') || lower.includes('residential') || lower.includes('home') || lower.includes('connect')) {
        replyText = KNOWLEDGE_BASE.surya;
      } else {
        replyText = `Thank you for asking! In short:

- **Gateway Role**: CABO does **not** purchase or take title of carbon credits; we are a pure software and hardware dMRV gateway. 96% of credit revenue goes directly to the solar owner, with a transparent 4% clearing fee.
- **Physical Accuracy**: Every kilowatt-hour is cross-checked using dual physical sensors (CT clamp + optical LCD camera) with zero inverter tampering risk.
- **Weekly Reporting**: You receive an auditable weekly summary every Monday detailing gross kWh, CEA carbon conversion, and your net bank settlement.

Would you like to explore our **Weekly Report sample** or inspect a **live node packet**?`;
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        badge: 'GATEWAY ADVISOR',
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Pill / Trigger at bottom right */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 px-4 py-3 bg-[#1F2421] text-[#FAF8F5] border border-[#2B4736] shadow-xl hover:bg-[#2B4736] hover:text-white transition-all rounded-none"
            aria-label="Open CABO AI Support"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF00]"></span>
            </span>
            <div className="text-left font-mono">
              <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A84B]" />
                <span>ASK CABO ASSISTANT</span>
              </div>
              <div className="text-[9px] text-[#A0A09A] group-hover:text-white/80 transition-colors">
                AI Support & Gateway FAQ · Online
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[410px] max-h-[85vh] h-[600px] flex flex-col bg-[#FAF8F5] text-[#1F2421] border-2 border-[#1F2421] shadow-2xl font-sans">
          {/* Header Bar */}
          <div className="bg-[#1F2421] text-[#FAF8F5] p-3.5 flex items-center justify-between border-b border-[#333333]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#2B4736] border border-[#E5A84B] flex items-center justify-center text-white font-mono text-xs font-bold">
                <Sparkles className="w-4 h-4 text-[#E5A84B]" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 text-white">
                  <span>ASHA · CABO CONCIERGE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]"></span>
                </div>
                <div className="text-[10px] font-mono text-[#A0A09A]">
                  Non-Custodial Solar MRV & Gateway Desk
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#A0A09A] hover:text-white hover:bg-white/10 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gateway Transparent Pill */}
          <div className="bg-[#EFEAE1] px-3.5 py-2 border-b border-[#D8D0C5] text-[10px] font-mono text-[#4A453E] flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-[#2B4736]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2B4736]" />
              <span>GATEWAY MODEL: 96% HOST / 4% FEE</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#706B63]">
              ZERO INVENTORY
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#FAF8F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.badge && (
                  <span className="text-[9px] font-mono text-[#706B63] uppercase tracking-widest mb-1 px-1">
                    {msg.badge}
                  </span>
                )}
                <div
                  className={`max-w-[90%] p-3 border leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1F2421] text-[#FAF8F5] border-[#1F2421]'
                      : 'bg-[#F2ECE1] text-[#1F2421] border-[#D8D0C5]'
                  }`}
                >
                  <div
                    className="whitespace-pre-line text-xs font-sans"
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>'),
                    }}
                  />
                </div>
                <span className="text-[9px] font-mono text-[#8C867D] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#706B63] p-2 bg-[#EFEAE1] border border-[#D8D0C5] w-fit">
                <RefreshCw className="w-3 h-3 animate-spin text-[#2B4736]" />
                <span>Asha is retrieving verification policy...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Carousel */}
          <div className="p-2.5 bg-[#F2ECE1] border-t border-[#D8D0C5] overflow-x-auto">
            <div className="text-[9px] font-mono uppercase text-[#706B63] font-bold mb-1.5 px-0.5">
              FREQUENT INQUIRIES:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleSend(topic)}
                  className="text-[10px] font-mono text-left px-2 py-1 bg-white hover:bg-[#1F2421] hover:text-white text-[#1F2421] border border-[#D8D0C5] transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputQuery);
            }}
            className="p-3 bg-white border-t border-[#1F2421] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about weekly payouts, gateway fees, optical OCR..."
              className="flex-1 text-xs font-mono bg-[#FAF8F5] border border-[#D8D0C5] px-3 py-2 text-[#1F2421] placeholder-[#8C867D] focus:outline-none focus:border-[#1F2421]"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="px-3.5 py-2 bg-[#2B4736] text-white font-mono text-xs font-bold uppercase hover:bg-[#1F2421] disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <span>SEND</span>
              <Send className="w-3 h-3" />
            </button>
          </form>

          {/* Footer Human Escalation */}
          <div className="bg-[#1F2421] text-[#A0A09A] px-3 py-1.5 text-[9px] font-mono flex items-center justify-between border-t border-[#333333]">
            <span>INDORE FIELD DESK: 1800-CABO-SOLAR</span>
            <span className="text-[#E5A84B]">NON-CUSTODIAL GATEWAY</span>
          </div>
        </div>
      )}
    </>
  );
};
