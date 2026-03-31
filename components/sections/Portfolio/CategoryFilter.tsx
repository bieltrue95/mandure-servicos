'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectCategory } from '@/lib/types';
import type { CategoryFilterProps } from './Portfolio.types';

const CATEGORIES = Object.values(ProjectCategory);

export function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex justify-center">
      <Tabs
        value={activeCategory}
        onValueChange={(val) => onChange(val as ProjectCategory)}
        className="w-full max-w-2xl"
      >
        <TabsList className="flex h-auto flex-wrap gap-1 bg-white p-1 shadow-sm">
          {CATEGORIES.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-lg px-4 py-2 text-sm font-medium"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((category) => (
          <TabsContent key={category} value={category} className="sr-only !mt-0">
            Categoria ativa: {category}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
