import { TbCategory } from 'react-icons/tb';
import { GiClothes } from 'react-icons/gi';
const navMenuConfig = [
    {
        label: 'Quản lý danh mục',
        key: 'quan-ly-danh-muc',
        icon: <TbCategory size={20} />,
        path: '/category',
    },
    {
        label: 'Quản lý sản phẩm',
        key: 'quan-ly-phu-tung',
        icon: <GiClothes size={20} />,
        path: '/product',
    },
];

export default navMenuConfig;
