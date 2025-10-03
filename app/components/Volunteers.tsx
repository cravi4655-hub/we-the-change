'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface VolunteerItem {
  id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
}

interface VolunteersProps {
  items?: VolunteerItem[];
  rotateMs?: number;
}

const DEFAULT_VOLUNTEERS: VolunteerItem[] = [
  { id: 'v1', name: 'Asha Singh', role: 'Program Lead', photo: '/window.svg', description: 'Asha drives outreach in rural communities, coordinating workshops and building partnerships with local leaders to ensure sustainable impact across regions.' },
  { id: 'v2', name: 'Rahul Mehta', role: 'Operations', photo: '/globe.svg', description: 'Rahul manages logistics, procurement, and distribution. His organized approach ensures pads and educational materials reach the last mile reliably.' },
  { id: 'v3', name: 'Fatima Khan', role: 'Educator', photo: '/file.svg', description: 'Fatima facilitates engaging sessions with adolescents and caregivers, helping normalize conversations and dismantle long-held taboos with empathy.' },
  { id: 'v4', name: 'Priya Patel', role: 'Counsellor', photo: '/vercel.svg', description: 'Priya offers one-on-one support, connecting beneficiaries to resources while training peer advocates to extend care in their communities.' },
  { id: 'v5', name: 'Karan Gupta', role: 'Field Coordinator', photo: '/next.svg', description: 'Karan oversees field execution across districts, aligning trainers, schools, and partner NGOs for consistent program quality and monitoring.' },
  { id: 'v6', name: 'Neha Sharma', role: 'Communications', photo: '/window.svg', description: 'Neha documents stories of change and amplifies voices from the field to inspire action and build a community of supporters.' },
  { id: 'v7', name: 'Vikram Rao', role: 'Data & Impact', photo: '/globe.svg', description: 'Vikram analyzes outcomes and feedback, translating insights into improvements that deepen both reach and effectiveness.' },
  { id: 'v8', name: 'Pooja Nair', role: 'Volunteer Coordinator', photo: '/file.svg', description: 'Pooja recruits and mentors volunteers, creating learning paths that equip them to lead sensitive, impact-focused initiatives responsibly.' },
];

export default function Volunteers({ items = DEFAULT_VOLUNTEERS, rotateMs = 5000 }: VolunteersProps) {
  const visible = 3;
  const [queue, setQueue] = useState<VolunteerItem[]>(() => [...items]);
  const controls = useAnimation();

  // Widths to ensure exactly 3 cards visible and 1 extra for sliding
  const trackWidthPercent = ((visible + 1) / visible) * 100;
  const cardWidthPercent = 100 / visible;

  useEffect(() => {
    let mounted = true;
    const advance = async () => {
      await controls.start({ x: `-${100 / visible}%`, transition: { duration: 0.7, ease: 'easeInOut' } });
      if (!mounted) return;
      setQueue((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      controls.set({ x: '0%' });
    };
    const id = setInterval(advance, rotateMs);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [controls, rotateMs, visible]);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Our Volunteers</h2>
          <p className="text-muted max-w-3xl mx-auto">Meet the dedicated team powering programs on the ground.</p>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={controls}
            style={{ width: `${trackWidthPercent}%` }}
            aria-live="polite"
          >
            {queue.slice(0, visible + 1).map((v, idx) => (
              <div key={v.id + '-' + idx} className="flex-none" style={{ width: `${cardWidthPercent}%` }}>
                <div className="rounded-2xl border border-muted/10 bg-bg-alt p-6 shadow-sm h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={v.photo} alt={v.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover bg-white border border-muted/20" />
                    <div>
                      <div className="text-primary font-semibold">{v.name}</div>
                      <div className="text-sm text-muted">{v.role}</div>
                    </div>
                  </div>
                  <p className="text-sm text-text leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


