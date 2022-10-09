import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineEdit,
  AiOutlineSave,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiImageEditFill } from 'react-icons/ri';
import { MdOutlineAddBusiness } from 'react-icons/md';

import { LogoIcon } from './svgIcons';

const icons = {
  default: LogoIcon,
  showPassword: AiFillEye,
  hidePassword: AiFillEyeInvisible,
  google: FcGoogle,
  edit: AiOutlineEdit,
  save: AiOutlineSave,
  image_edit: RiImageEditFill,
  add_property: MdOutlineAddBusiness,
};

export default icons;
