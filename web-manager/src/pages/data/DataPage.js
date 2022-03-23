import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import RawAllView from '../../views/data/RawAllView';
import RawCheckedFalseView from '../../views/data/RawCheckedFalseView';
const data = {
  raw_all: {
    html:<RawAllView/>,
  },
  raw_checked_false: {
    html:<RawCheckedFalseView/>,
  },
};

const DataPage = () => {
  const params = useParams();
  const menu = data[params.menu];

  return (
    <div>
        <Header/>
        {menu ? (
            <div>
            {menu.html}
            </div>
        ) : (
            <p>존재하지 않는 메뉴입니다.</p>
        )}
    </div>
  );
};

export default DataPage;