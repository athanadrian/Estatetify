import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiImageEditFill } from 'react-icons/ri';

import { LogoIcon } from './svgIcons';

const icons = {
  default: LogoIcon,
  showPassword: AiFillEye,
  hidePassword: AiFillEyeInvisible,
  google: FcGoogle,
  image_edit: RiImageEditFill,
};

export default icons;
