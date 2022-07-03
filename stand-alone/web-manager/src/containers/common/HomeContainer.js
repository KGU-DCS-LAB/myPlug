export default () => {
    return (
        <>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">myPlug : Data Management Systems</h1>
                    <p className="col-md-8 fs-4">나만의 충전소 데이터 관리 시스템.</p>
                    <a className="btn btn-primary btn-lg" type="button" href="https://github.com/KGU-DCS-LAB/myPlug">github</a>
                </div>
            </div>

            <div className="row mb-4 align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-white bg-dark rounded-3">
                        <h2>raw 데이터 수집</h2>
                        <p>데이터 수집은 station-data-generator(Java)에서 진행해주세요. 수집한 데이터는 MongoDB의 Cluster 서버로 들어가도록 했습니다.</p>
                        {/* <button className="btn btn-outline-light" type="button">ㅇㅇ</button> */}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h2>데이터 정제</h2>
                        <p>데이터 정제 작업을 통해 수집한 raw 데이터에서 충전소와 충전기 데이터를 뽑아내는 작업을 진행합니다. 이때 수집된 데이터는 중복이 없어야 하며, 최신 상태로 업데이트 하는 작업을 지원합니다.</p>
                        <button className="btn btn-outline-secondary" type="button">Example button</button>
                    </div>
                </div>
            </div>

            <div class="row align-items-md-stretch">
                <div class="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h2>데이터 관리 시작하기</h2>
                        <p>하단의 메뉴를 통해 데이터 관리를 할 수 있습니다.</p>
                        <ul class="icon-list">
                            <li><a href="data/get_keco_raw_all">📄 KECO 서버로부터 수집한 "KECO 전기자동차 충전소 정보" RAW 데이터 확인하기</a></li>
                            <li><a href="data/update_keco_raw_all">🔃 수집한 원본 데이터 중 한번도 검사하지 않은 "KECO 전기자동차 충전소 정보" RAW 데이터 업데이트 하기</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-6">
                    <div className="h-100 p-5 text-white bg-dark  border rounded-3">
                        <h2>사용 가이드</h2>
                        <p>사용방법에 대해서 알아보세요.</p>
                        <ul class="icon-list">
                            <li><a href="#">Quick start</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}