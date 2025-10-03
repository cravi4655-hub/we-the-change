'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface DialogueBubble {
  id: string;
  text: string;
  speaker: string;
  position: { top: string; left: string };
  delay: number;
  color: string;
}

interface AnimatedDialogueImageProps {
  program: string;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedDialogueImage({ program, className = "", onClick }: AnimatedDialogueImageProps) {
  const [currentDialogue, setCurrentDialogue] = useState(0);

  // Program-specific dialogues and themes
  const getProgramData = (program: string) => {
    const programs = {
      'paint-me-red': {
        background: 'from-red-500 via-pink-500 to-red-700',
        icon: '��',
        title: 'Breaking the Silence',
        dialogues: [
          { id: '1', text: "I never thought I could express this through art!", speaker: "Priya, 16", position: { top: "15%", left: "10%" }, delay: 0, color: "bg-red-500" },
          { id: '2', text: "This workshop changed how I see my body.", speaker: "Meera, 19", position: { top: "45%", left: "70%" }, delay: 1, color: "bg-pink-500" },
          { id: '3', text: "We're creating change, one brushstroke at a time.", speaker: "Asha, 24", position: { top: "75%", left: "25%" }, delay: 2, color: "bg-coral-500" },
          { id: '4', text: "Art helped me find my voice.", speaker: "Sunita, 17", position: { top: "30%", left: "60%" }, delay: 3, color: "bg-red-400" }
        ]
      },
      'red-waste': {
        background: 'from-teal-500 via-green-500 to-teal-700',
        icon: '♻️',
        title: 'Green Revolution',
        dialogues: [
          { id: '1', text: "Finally, a way to dispose safely!", speaker: "Rahul, 22", position: { top: "20%", left: "15%" }, delay: 0, color: "bg-teal-500" },
          { id: '2', text: "Our village is now waste-free.", speaker: "Kavita, 28", position: { top: "50%", left: "65%" }, delay: 1, color: "bg-green-500" },
          { id: '3', text: "Teaching my daughters about sustainability.", speaker: "Neha, 32", position: { top: "80%", left: "30%" }, delay: 2, color: "bg-teal-400" },
          { id: '4', text: "Every small action counts!", speaker: "Vikram, 25", position: { top: "35%", left: "75%" }, delay: 3, color: "bg-green-400" }
        ]
      },
      'train-the-trainer': {
        background: 'from-yellow-500 via-orange-500 to-yellow-700',
        icon: '��',
        title: 'Empowering Leaders',
        dialogues: [
          { id: '1', text: "I'm now training others in my community!", speaker: "Dr. Patel, 35", position: { top: "25%", left: "20%" }, delay: 0, color: "bg-yellow-500" },
          { id: '2', text: "The knowledge I gained is priceless.", speaker: "Rajesh, 28", position: { top: "55%", left: "70%" }, delay: 1, color: "bg-orange-500" },
          { id: '3', text: "I can now lead workshops confidently.", speaker: "Sunita, 26", position: { top: "80%", left: "15%" }, delay: 2, color: "bg-yellow-400" },
          { id: '4', text: "Training others gives me purpose.", speaker: "Meera, 30", position: { top: "40%", left: "60%" }, delay: 3, color: "bg-orange-400" }
        ]
      },
      'project-sachet': {
        background: 'from-blue-500 via-indigo-500 to-blue-700',
        icon: '��',
        title: 'Health for All',
        dialogues: [
          { id: '1', text: "Now I can afford proper hygiene!", speaker: "Kavita, 24", position: { top: "20%", left: "25%" }, delay: 0, color: "bg-blue-500" },
          { id: '2', text: "My daughters never miss school now.", speaker: "Asha, 29", position: { top: "50%", left: "65%" }, delay: 1, color: "bg-indigo-500" },
          { id: '3', text: "The sachets are so convenient!", speaker: "Priya, 18", position: { top: "75%", left: "20%" }, delay: 2, color: "bg-blue-400" },
          { id: '4', text: "Finally, dignity for all women.", speaker: "Sunita, 31", position: { top: "35%", left: "70%" }, delay: 3, color: "bg-indigo-400" }
        ]
      }
    };
    
    return programs[program as keyof typeof programs] || programs['paint-me-red'];
  };

  const programData = getProgramData(program);

  // Cycle through dialogues
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDialogue((prev) => (prev + 1) % programData.dialogues.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [programData.dialogues.length]);

  return (
    <motion.div 
      className={`relative overflow-hidden group cursor-pointer ${className}`} 
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated gradient background */}
      <div className={`w-full h-full bg-gradient-to-br ${programData.background} relative overflow-hidden`}>
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Central icon with animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            className="text-8xl mb-4"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {programData.icon}
          </motion.div>
        </div>

        {/* Animated dialogue bubbles */}
        {programData.dialogues.map((dialogue, index) => (
          <motion.div
            key={dialogue.id}
            className="absolute"
            style={dialogue.position}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: currentDialogue === index ? 1 : 0,
              scale: currentDialogue === index ? 1 : 0.8,
              y: currentDialogue === index ? 0 : 20
            }}
            transition={{ 
              duration: 0.5, 
              delay: dialogue.delay * 0.2,
              ease: "easeOut"
            }}
          >
            <div className="relative">
              {/* Speech Bubble */}
              <motion.div 
                className={`${dialogue.color} text-white rounded-2xl px-4 py-3 shadow-lg border border-white/20 max-w-[200px] backdrop-blur-sm`}
                animate={{
                  scale: currentDialogue === index ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: currentDialogue === index ? 0.5 : 0
                }}
              >
                <p className="text-sm font-medium leading-relaxed">
                  "{dialogue.text}"
                </p>
                <p className="text-xs text-white/80 mt-1 italic">
                  — {dialogue.speaker}
                </p>
              </motion.div>
              
              {/* Speech Bubble Tail */}
              <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95"></div>
            </div>
          </motion.div>
        ))}

        {/* Title overlay */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{programData.title}</h3>
          <p className="text-white/80 text-sm">Real voices, real change</p>
        </motion.div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 border-2 border-white/30 rounded-lg"
          animate={{ 
            borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.3)'],
            boxShadow: ['0 0 0 rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.3)', '0 0 0 rgba(255,255,255,0)']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
    </motion.div>
  );
}
