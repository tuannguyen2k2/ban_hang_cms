import { TbCategory } from "react-icons/tb";
import { MdOutlineSportsMotorsports } from "react-icons/md";
const navMenuConfig = [
  {
    label: "Quản lý danh mục",
    key: "quan-ly-danh-muc",
    icon: <TbCategory size={20}/>,
    path: "/category",
  },
  {
    label: "Quản lý phụ tùng",
    key: "quan-ly-phu-tung",
    icon: <MdOutlineSportsMotorsports  size={20} />,
    path: "/product",
  },
];

export default navMenuConfig;
