import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface UserDropDownProps {
  userName: string;
  userAvatar: any;
  balance: string;
  walletAddress?: string;
}

export interface ButtonProps {
  label?: string;
  img?: string;
  variant: 'primary' | 'outline-primary' | 'dark';
  isLoading?: boolean;
  type?: string;
  loadingMessage?: string;
  className?: string;
  onClick?: () => void;
  homeBuyBtn?: boolean;
}

export interface ToggleButtonProps {
  activeImg?: string;
  defaultImg?: string;
  active: boolean;
  onClick?: (isActive: boolean) => void;
}

export interface ProfileImageProps {
  img?: string;
  verified?: boolean;
  edit?: boolean;
  blurBG?: boolean;
  rounded?: boolean;
  homeCardStyle?: boolean;
  onChange?: Function;
}

export interface FileInputProps {
  info?: string;
  label: string;
  dispalyImage?: boolean;
  defaultImage?: string;
  onChange?: Function;
}

export interface CreatorCard2Props {
  image: string;
  userIcon: string;
  userName: string;
  subTitle: string;
  previewList: [string, string, string];
  onClick?: () => void;
}

export interface CreatorObj {
  image: string;
  userIcon: string;
  userName: string;
  subTitle: string;
  previewList: [string, string, string];
}
export interface CreatorObj2 {
  title: string;
  titleInfo: string;
  userName: string;
  price: string;
  image: string;
  userIcon: string;
}

export interface InputType {
  className?: string;
  name: string;
  label?: string;
  placeholder?: string;
  postfix?: string;
  value?: string;
  type?: 'text' | 'number';
  onChange?: (data: any) => void;
  register?: UseFormRegister<FieldValues> | null;
}
