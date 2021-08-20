import './ToggleButton.css';
import { ToggleButton as BootstrapToggleButton, Image } from 'react-bootstrap';
import { ToggleButtonProps } from '../../../Type';
import { useState } from 'react';

export const ToggleButton = (props: ToggleButtonProps) => {
  const [isChecked, setChecked] = useState<boolean>(props.active);
  
  return (
    <BootstrapToggleButton
      className="cstm-toggle"
      value=""
      type="checkbox"
      checked={isChecked}
      onChange={e => {
        setChecked(e.currentTarget.checked);
        props.onClick && props.onClick(e.currentTarget.checked);
      }}
    >
      {isChecked ? <Image src={props.activeImg} /> : <Image src={props.defaultImg} />}
    </BootstrapToggleButton>
  );
};
