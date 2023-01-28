import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineSave,
  AiFillSetting,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiFillStar,
  AiOutlineLogout,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { HiBell, HiCheck, HiChevronDown } from 'react-icons/hi';
import { TfiUser } from 'react-icons/tfi';
import { BiArea } from 'react-icons/bi';
import { SlPieChart, SlPaperPlane } from 'react-icons/sl';
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
  FaInfoCircle,
  FaShareAlt,
  FaChair,
  FaHeart,
  FaRegMoneyBillAlt,
  FaCloudUploadAlt,
  FaSms,
  FaViber,
  FaWhatsapp,
  FaListAlt,
  FaRegCalendarTimes,
  FaRegCalendarCheck,
} from 'react-icons/fa';
import { RiImageEditFill, RiBuilding2Line } from 'react-icons/ri';
import {
  BsFillGridFill,
  BsBuilding,
  BsSearch,
  BsShieldCheck,
  BsFillTagsFill,
  BsPeople,
  BsThreeDotsVertical,
  BsReceipt,
} from 'react-icons/bs';
import {
  MdMenu,
  MdOutlineAddBusiness,
  MdBedroomParent,
  MdLocationOn,
  MdEdit,
  MdEmail,
  MdOutlineCancel,
  MdCall,
  MdDashboard,
  MdSubscriptions,
  MdOutlineStorage,
  MdOutlineSupportAgent,
  MdOutlineBusinessCenter,
  MdOutlineLocalOffer,
  MdOutlineLibraryAdd,
  MdOutlineLibraryAddCheck,
  MdOutlineLibraryBooks,
  MdOutlineUpdate,
} from 'react-icons/md';
import { LogoIcon } from './svgIcons';

const icons = {
  default: LogoIcon,
  showPassword: AiFillEye,
  hidePassword: AiFillEyeInvisible,
  google: FcGoogle,
  edit: MdEdit,
  save: AiOutlineSave,
  image_edit: RiImageEditFill,
  add_property: MdOutlineAddBusiness,
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
  squareFeet: BiArea,
  email: MdEmail,
  info: FaInfoCircle,
  social: FaShareAlt,
  furnished: FaChair,
  favorite: FaHeart,
  feature_quality: BsShieldCheck,
  feature_find: SlPaperPlane,
  feature_update: BsBuilding,
  feature_low_cost: FaRegMoneyBillAlt,
  feature_result: SlPieChart,
  feature_search: BsSearch,
  upload: FaCloudUploadAlt,
  cancel: MdOutlineCancel,
  sms: FaSms,
  call: MdCall,
  viber: FaViber,
  whatsApp: FaWhatsapp,
  gridView: BsFillGridFill,
  listView: FaListAlt,
  burger_menu: MdMenu,
  profile: TfiUser,
  users: BsPeople,
  dashboard: MdDashboard,
  subscriptions: MdSubscriptions,
  manage: AiFillSetting,
  listings: BsBuilding,
  closeDashboard: AiOutlineMenuFold,
  openDashboard: AiOutlineMenuUnfold,
  notification: HiBell,
  checkIcon: HiCheck,
  arrow_down: HiChevronDown,
  storage: MdOutlineStorage,
  support: MdOutlineSupportAgent,
  business: MdOutlineBusinessCenter,
  star: AiFillStar,
  offers: MdOutlineLocalOffer,
  buy: MdOutlineLibraryAdd,
  sell: MdOutlineLibraryAddCheck,
  rent: MdOutlineLibraryBooks,
  pricing: BsFillTagsFill,
  actions: BsThreeDotsVertical,
  logout: AiOutlineLogout,
  created_date: FaRegCalendarCheck,
  expiring_date: FaRegCalendarTimes,
  elapsed_days: MdOutlineUpdate,
  payment_receipt: BsReceipt,
};

export default icons;
