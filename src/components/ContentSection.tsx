// components/ContentSection.tsx
interface ContentSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  titleAlignment?: 'left' | 'center';
  containerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const ContentSection = ({
  title,
  subtitle,
  description,
  children,
  className = '',
  titleAlignment = 'left',
  containerSize = 'xl'
}: ContentSectionProps) => {
  const getContainerMaxWidth = () => {
    const sizes = {
      xs: 'max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl',
      sm: 'max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl',
      md: 'max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl',
      lg: 'max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl',
      xl: 'max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl',
      '2xl': 'max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl',
      '3xl': 'max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl',
      '4xl': 'max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl'
    };
    return sizes[containerSize];
  };

  const titleAlignClass = titleAlignment === 'center' ? 'text-center' : 'text-left';

  return (
    <section className={`flex items-start justify-center py-8 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className={`w-full ${getContainerMaxWidth()}`}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.2] ${titleAlignClass} mb-4 sm:mb-5 md:mb-6 lg:mb-5 xl:mb-8`}>
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-gray-600 font-light leading-[1.3] text-left mb-4 sm:mb-5 md:mb-6 lg:mb-5 xl:mb-8">
                {subtitle}
              </h2>
            )}
            {description && (
              <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-500 leading-[1.5] text-left">
                {description}
              </p>
            )}
          </div>

          {children && (
            <div className={`w-full ${getContainerMaxWidth()} mt-6 sm:mt-8 md:mt-8 lg:mt-6 xl:mt-16`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
