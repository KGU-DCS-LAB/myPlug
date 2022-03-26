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
          <div class="col-md-8">
            <h2>데이터 관리 시작하기</h2>
            <p>하단의 메뉴를 통해 데이터 관리를 할 수 있습니다.</p>
            <ul class="icon-list">
              <li><a href="data/get_raw_all">수집한 모든 원본 데이터 확인하기</a></li>
              <li><a href="data/update_raw_all">수집한 원본 데이터 중 한번도 검사하지 않은 데이터 업데이트 하기(진행중)</a></li>
              <li><a href="data/get_raw_checked_false">수집한 전체 원본 데이터 중 checked가 false인 데이터 확인하기</a></li>
            </ul>
          </div>
    
          <div class="col-md-4">
            <h2>사용 가이드</h2>
            <p>사용방법에 대해서 알아보세요.</p>
            <ul class="icon-list">
              <li><a href="#">Quick start</a></li>
            </ul>
          </div>
        </div>
      </main>
    )
}
export default MainView;