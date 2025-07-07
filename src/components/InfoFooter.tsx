const InfoFooter = () => {
    return(
        <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              보고서 정보
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="border-r border-gray-200 last:border-r-0">
                <p className="text-sm text-gray-500 mb-1">발행일</p>
                <p className="text-base font-medium text-gray-900">2025년 7월</p>
              </div>
              <div className="border-r border-gray-200 last:border-r-0">
                <p className="text-sm text-gray-500 mb-1">연구 범위</p>
                <p className="text-base font-medium text-gray-900">태평양 지역 14개국 IT 현황 분석</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">데이터 기간</p>
                <p className="text-base font-medium text-gray-900">2020-2024년 통계 자료 기반</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default InfoFooter;