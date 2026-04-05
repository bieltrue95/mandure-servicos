'use client';

import { Certifications } from '@/components/sections/Certifications';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import {
  certificationsData,
  processStepsData,
  projectsData,
  servicesData,
  statsData,
  testimonialsData,
} from '@/lib/data';
import { WhatsAppService } from '@/lib/services';
import dynamic from 'next/dynamic';

// Lazy-load grandes seções com fallback skeleton
const Portfolio = dynamic(
  () => import('@/components/sections/Portfolio/Portfolio').then((m) => m.Portfolio),
  {
    loading: () => (
      <section className="bg-slate-100 py-20 lg:py-28">
        <div className="container-max section-padding">
          <div className="animate-pulse space-y-8">
            <div className="h-12 rounded bg-slate-200" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 rounded bg-slate-200" />
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
    ssr: false,
  }
);

const CTAFinal = dynamic(
  () => import('@/components/sections/CTAFinal/CTAFinal').then((m) => m.CTAFinal),
  {
    loading: () => (
      <section className="bg-primary-500 py-16 lg:py-20">
        <div className="container-max section-padding text-center">
          <div className="animate-pulse space-y-4">
            <div className="mx-auto h-10 w-2/3 rounded bg-white/20" />
            <div className="mx-auto h-6 w-3/4 rounded bg-white/20" />
          </div>
        </div>
      </section>
    ),
    ssr: false,
  }
);

export default function Home() {
  const whatsappUrl = WhatsAppService.generateUrl();

  return (
    <main>
      <Hero whatsappUrl={whatsappUrl} />
      <Stats stats={statsData} />
      <Services services={servicesData} whatsappUrl={whatsappUrl} />
      <Portfolio projects={projectsData} />
      <Process steps={processStepsData} />
      <Testimonials testimonials={testimonialsData} />
      <Certifications certifications={certificationsData} />
      <CTAFinal whatsappUrl={whatsappUrl} />
      <Footer whatsappUrl={whatsappUrl} />
      <WhatsAppButton whatsappUrl={whatsappUrl} />
    </main>
  );
}
