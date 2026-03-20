import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { Certifications } from '@/components/sections/Certifications';
import { CTAFinal } from '@/components/sections/CTAFinal';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import {
  statsData,
  servicesData,
  projectsData,
  testimonialsData,
  certificationsData,
  processStepsData,
} from '@/lib/data';
import { WhatsAppService } from '@/lib/services';

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
