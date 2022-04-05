import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import GetKecoRawAll from '../../views/data/GetKecoRawAll';
import UpdateKecoRawAllView from '../../views/data/UpdateKecoRawAllView';

const data = {
  // get_raw_all: {
  //   html:<RawAllView/>,
  // },
  // update_raw_all:{
  //   html:<UpdateRawAllView/>,
  // },
  // get_raw_checked_false: {
  //   html:<RawCheckedFalseView/>,
  // },
  get_keco_raw_all:{
    html:<GetKecoRawAll/>,
  },
  update_keco_raw_all:{
    html:<UpdateKecoRawAllView/>,
  },
};

const DataPage = () => {
  const params = useParams();
  const menu = data[params.menu];

  return (
    <div>
        <Header/>
        {/* 이 자리에 container가 오지 않는 이유는 loading 페이지 간격아 어색하기 때문임 */}
        {menu ? (
            <>
              {menu.html}
            </>
        ) : (
            <p>존재하지 않는 메뉴입니다.</p>
        )}
    </div>
  );
};

export default DataPage;