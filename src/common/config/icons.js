import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineEdit,
  AiOutlineSave,
} from 'react-icons/ai';

import { FcGoogle } from 'react-icons/fc';
import { BsDashSquareDotted } from 'react-icons/bs';
import { GiDesk, GiBlockHouse } from 'react-icons/gi';
import {
  FaHome,
  FaImage,
  FaWarehouse,
  FaParking,
  FaStoreAlt,
  FaBed,
  FaBath,
  FaTrash,
  FaSignal,
} from 'react-icons/fa';
import { RiNumber1, RiImageEditFill, RiBuilding2Line } from 'react-icons/ri';
import {
  MdOutlineAddBusiness,
  MdBedroomParent,
  MdLocationOn,
  MdEdit,
} from 'react-icons/md';

import { LogoIcon } from './svgIcons';

const icons = {
  default: LogoIcon,
  showPassword: AiFillEye,
  hidePassword: AiFillEyeInvisible,
  google: FcGoogle,
  edit: MdEdit, // AiOutlineEdit,
  save: AiOutlineSave,
  image_edit: RiImageEditFill,
  add_property: MdOutlineAddBusiness,
  // RENTALS CATEGORIES
  apartment: FaHome,
  office: GiDesk,
  maisonette: RiBuilding2Line,
  condo: GiBlockHouse,
  shop: FaStoreAlt,
  land: FaImage,
  warehouse: FaWarehouse,
  parking: FaParking,
  beds: FaBed,
  bathrooms: FaBath,
  rooms: MdBedroomParent,
  delete: FaTrash,
  location: MdLocationOn,
  floors: FaSignal,
  squareFeet: BsDashSquareDotted,

  //Floors
  first: RiNumber1,
};

export default icons;
