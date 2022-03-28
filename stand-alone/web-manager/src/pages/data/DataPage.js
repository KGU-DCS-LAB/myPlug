import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import RawAllView from '../../views/data/RawAllView';
import RawCheckedFalseView from '../../views/data/RawCheckedFalseView';
import UpdateRawAllView from '../../views/data/UpdateRawAllView';

const data = {
  get_raw_all: {
    html:<RawAllView/>,
  },
  update_raw_all:{
    html:<UpdateRawAllView/>,
  },
  get_raw_checked_false: {
    html:<RawCheckedFalseView/>,
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