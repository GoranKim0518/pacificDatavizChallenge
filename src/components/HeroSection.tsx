// components/HeroSection.tsx
import { useAppStore } from '../stores/useAppstore';

const HeroSection = () => {
  const { customImageUrl, setCustomImage } = useAppStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Report Title - 정확한 IBM Carbon Typography */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mb-8 sm:mb-10 md:mb-12 lg:mb-10 xl:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-5 text-left mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10">
              Pacific's Tech-Future
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-gray-600 font-light leading-6 text-left">
              While access to basic IT devices is improving across most Pacific nations, their digital infrastructure still needs significant improvement. This report examines IT infrastructure development, highlighting gaps in digital connectivity and suggesting future directions.
            </h2>
          </div>

          {/* Central Image - 크기와 위치 그대로 유지 */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
            {customImageUrl ? (
              <div className="relative w-full">
                <div className="aspect-[3/2] w-full overflow-hidden sm:shadow-xl lg:shadow-2xl">
                  <img
                    src={customImageUrl}
                    alt="Pacific Cultural Elements"
                    className="w-full h-full object-cover"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <button
                  onClick={() => setCustomImage('')}
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg shadow-lg"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-full">
                <div className="aspect-[3/2] w-full bg-white  shadow-lg sm:shadow-xl lg:shadow-2xl flex flex-col items-center justify-center border-none stroke-trasnparent">
                  <div className="text-center p-4 sm:p-6 md:p-6 lg:p-6 xl:p-12">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-14 lg:h-14 xl:w-24 xl:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-4 lg:mb-3 xl:mb-6">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-7 lg:h-7 xl:w-12 xl:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg mb-2 sm:mb-3 md:mb-3 lg:mb-2 xl:mb-6 leading-6">
                      Upload Pacific cultural image
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm mb-3 sm:mb-4 md:mb-4 lg:mb-3 xl:mb-6 leading-5">
                      Recommended resolution: 1536 × 1024px
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-5 lg:py-2 xl:px-6 xl:py-3 rounded-md sm:rounded-lg cursor-pointer transition-colors text-sm sm:text-base md:text-base lg:text-base xl:text-base font-medium"
                    >
                      Select Image
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
