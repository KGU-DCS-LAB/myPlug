function MainView() {
    return(
        <main>
        <h1>myPlug : Data Management Systems</h1>
        <p class="fs-5 col-md-8">나만의 충전소 데이터 관리 시스템.</p>
    
        <div class="mb-5">
          <a href="https://github.com/KGU-DCS-LAB/myPlug" class="btn btn-primary btn-lg px-4">GitHub에서 소스코드 보기</a>
        </div>
    
        <hr class="col-3 col-md-2 mb-5"/>
    
        <div class="row g-5">
          <div class="col-md-6">
            <h2>데이터 관리 시작하기</h2>
            <p>하단의 메뉴를 통해 데이터 관리를 할 수 있습니다.</p>
            <ul class="icon-list">
              <li><a href="data/raw_all">수집한 모든 원본 데이터 확인하기</a></li>
              <li><a href="data/raw_checked_false">수집한 모든 원본 데이터 중 처리되지 않은 데이터 확인하기 (coming soon!)</a></li>
            </ul>
          </div>
    
          <div class="col-md-6">
            <h2>Guides</h2>
            <p>Read more detailed instructions and documentation on using or contributing to Bootstrap.</p>
            <ul class="icon-list">
              <li><a href="/docs/5.1/getting-started/introduction/">Bootstrap quick start guide</a></li>
              <li><a href="/docs/5.1/getting-started/webpack/">Bootstrap Webpack guide</a></li>
              <li><a href="/docs/5.1/getting-started/parcel/">Bootstrap Parcel guide</a></li>
              <li><a href="/docs/5.1/getting-started/contribute/">Contributing to Bootstrap</a></li>
            </ul>
          </div>
        </div>
      </main>
    )
}
export default MainView;