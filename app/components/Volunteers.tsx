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
  { 
    id: 'v1', 
    name: 'Aamna S Qazi', 
    role: 'Menstrual Educator', 
    photo: '/volunteer/Aamna Qazi.webp', 
    description: 'Champions revolutionary menstrual education through innovative partnership between Pink Legal Ibtida and WTC, creating transformative spaces where legal awareness meets menstrual advocacy.' 
  },
  { 
    id: 'v2', 
    name: 'Fatima', 
    role: 'State Lead, Delhi', 
    photo: '/volunteer/Fatima.webp', 
    description: 'Dedicated member for 4.5 years, originally serving as Bihar Lead. Specializes in Menstrual Hygiene Management training, empowering underprivileged women with awareness and resources.' 
  },
  { 
    id: 'v3', 
    name: 'Jeeya Thukral', 
    role: 'Menstrual Trainer', 
    photo: '/volunteer/Jeeya Thukral.webp', 
    description: 'Trained over 3,500 Delhi government school students on menstrual hygiene and gender sensitization. Creates meaningful connections across diverse communities in Hyderabad.' 
  },
  { 
    id: 'v4', 
    name: 'Sana Khan', 
    role: 'Menstrual Educator', 
    photo: '/volunteer/Sana Khan.webp', 
    description: 'Brings powerful dual perspective representing Pink Legal Ibtida partnership. Weaves together menstrual health awareness with legal literacy for comprehensive empowerment.' 
  },
  { 
    id: 'v5', 
    name: 'Hoinunnem Chongloi', 
    role: 'Lead Impact Trainer, Assam', 
    photo: '/volunteer/Hoinunnem Chongloi.webp', 
    description: 'Dynamic leader with years of dedicated service in menstrual hygiene management and waste sustainability across Assam. Successfully led numerous training sessions and rural outreach programs.' 
  },
  { 
    id: 'v6', 
    name: 'Suinila Joseph', 
    role: 'Lead for North-East India', 
    photo: '/volunteer/Suinila Joseph.webp', 
    description: 'Serves as vital bridge connecting WTC\'s central mission to peripheral communities across North-East India. Delivered menstrual hygiene kits during Manipur riots, ensuring critical support reached women in crisis.' 
  },
  { 
    id: 'v7', 
    name: 'Zaheer Alam', 
    role: 'State Lead, Rajasthan', 
    photo: '/volunteer/Zaheer Alam.webp', 
    description: 'State Lead for Rajasthan while working as District Coordinator with ActionAid Association. Spearheads MHHM campaigns across the state, focusing on empowering children and young girls through education and sustainable menstrual health management.' 
  },
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


