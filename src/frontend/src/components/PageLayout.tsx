import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function PageLayout({ children, title, description, className = '' }: PageLayoutProps) {
  return (
    <div className={`container py-8 md:py-12 ${className}`}>
      {(title || description) && (
        <div className="mb-8 md:mb-12">
          {title && <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>}
          {description && <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
