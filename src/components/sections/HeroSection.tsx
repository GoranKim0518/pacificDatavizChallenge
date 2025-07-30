import IslandSection from "../ui/islandSection";
import BinaryWaveBackground from "../ui/waveBackground";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center pt-12 pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center -mt-[40px]">

          {/* Title & Description */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl text-left mt-20 mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Bridging the Gap
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-gray-600 font-light leading-relaxed">
              Pacific nations show connectivity achievements, yet a gap persists between 
              infrastructure access and digital skills. Understanding this disconnect is 
              essential for economic value creation, which supports Blue Pacific 2050 goals. 
              The visualization examines pathways to bridge it.
            </h2>
          </div>

          {/* Floating Button */}
          <IslandSection />

          {/* Wave Background */}
          <div className="w-full flex justify-center mt-8">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl overflow-hidden relative">
              <div className="h-[150px] bg-transparent">
                <BinaryWaveBackground />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;