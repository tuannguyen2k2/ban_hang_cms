import { BsFillPeopleFill } from 'react-icons/bs';
import { GiClothes, GiStabbedNote } from 'react-icons/gi';
import { SiGoogleanalytics } from 'react-icons/si';
const navMenuConfig = [
    {
        label: 'Quản lý sản phẩm',
        key: 'quan-ly-sản-phẩm',
        icon: <GiClothes size={21} />,
        path: '/category',
    },
    {
        label: 'Quản lý khách hàng',
        key: 'quan-ly-khach-hang',
        icon: <BsFillPeopleFill size={20} />,
        path: '/customer',
    },
    {
        label: 'Quản lý đơn hàng',
        key: 'quan-ly-don-hang',
        icon: <GiStabbedNote size={21} />,
        path: '/order',
    },
    {
        label: 'Thống kê',
        key: 'thong-ke',
        icon: <SiGoogleanalytics size={19} />,
        path: '/analytic',
    },
];

export default navMenuConfig;
