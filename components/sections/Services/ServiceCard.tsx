'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ServiceIcon } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import {
  Building2,
  Hammer,
  MessageCircle,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceCardProps } from './Services.types';

export function ServiceCard({ service, whatsappUrl }: ServiceCardProps) {
  const serviceIcons: Record<ServiceIcon, LucideIcon> = {
    [ServiceIcon.BUILDING]: Building2,
    [ServiceIcon.HAMMER]: Hammer,
    [ServiceIcon.SHIELD]: ShieldCheck,
    [ServiceIcon.WRENCH]: Wrench,
  };
  const IconComponent = serviceIcons[service.icon] ?? Building2;

  const serviceMessage = `Olá! Tenho interesse no serviço de ${service.title}. Poderia me dar mais informações?`;
  const serviceWhatsapp = (() => {
    const url = new URL(whatsappUrl);
    url.searchParams.set('text', serviceMessage);
    return url.toString();
  })();

  return (
    <div className="h-full transition-transform duration-300 hover:-translate-y-1.5">
      <Card
        className={cn(
          'flex h-full flex-col overflow-hidden',
          service.highlighted && 'border-primary-400 ring-2 ring-primary-400/20'
        )}
      >
        {/* Layout mais compacto para sustentar 4 cards lado a lado sem aumentar demais a altura. */}
        <CardHeader className="p-5 lg:p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50">
            <IconComponent className="h-6 w-6 text-primary-500" />
          </div>
          <CardTitle className="text-xl leading-tight">{service.title}</CardTitle>
          <CardDescription className="text-base leading-7 text-slate-600">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 px-5 pb-0 pt-0 lg:px-6">
          {/* As features viram chips para reduzir a altura sem esconder informação. */}
          <ul className="flex flex-wrap gap-2">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm leading-5 text-slate-700"
              >
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto p-5 pt-5 lg:p-6 lg:pt-5">
          <a href={serviceWhatsapp} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <MessageCircle className="h-4 w-4" />
              Solicitar este Serviço
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
