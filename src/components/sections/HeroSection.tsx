import IslandSection from "../ui/IslandSection";
import BinaryWaveBackground from "../ui/WaveBackground";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="w-full text-center sm:text-left sm:max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mt-12 sm:mt-20 mb-8 sm:mb-4">
            <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 leading-tight mb-6 sm:mb-3 tracking-tight">
              Bridging the Gap
            </h1>
            <h2 className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-600 font-light leading-relaxed">
              Pacific nations show connectivity achievements, yet a gap persists between
              infrastructure access and digital skills. Understanding this disconnect is
              essential for economic value creation, which supports Blue Pacific 2050 goals.
              The visualization examines pathways to bridge it.
            </h2>
          </div>
          
          <div className="mb-6 sm:mb-0">
            <IslandSection />
          </div>

          <div className="w-full flex justify-center mt-4 sm:mt-6">
            <div className="w-full sm:max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl overflow-hidden relative">
              <div className="h-[160px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] 2xl:h-[220px] bg-transparent">
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