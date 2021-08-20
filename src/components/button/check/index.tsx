import InfoText from 'components/Text';
import { useState } from 'react';
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import { Button } from '../../button/Button';
import './index.scss';

interface propsType {
  label?: string;
  id: string;
  checked?: boolean;
  img?: string;
  className?: string;
  onClick?: (category: string, checked: boolean) => void;
}

const CheckButton = (props: propsType) => {
  // const [isChecked, setChecked] = useState<boolean>(props.checked);
  const onChangeHandler = e => {
    // setChecked(e.currentTarget.checked);
    props.onClick && props.onClick(e.target.value, e.currentTarget.checked);
  };

  return (
    <Form.Check type="checkbox" id={props.id} className="check-button" inline>
      <Form.Check.Input type="checkbox" checked={props.checked} value={props.label} onChange={onChangeHandler} />
      <Form.Check.Label className={props.className}>
        {props.img && <Image src={props.img} className="mb-1" />}
        {props.label && <InfoText className="mb-0 ml-2 d-inline-block">{props.label}</InfoText>}
      </Form.Check.Label>
    </Form.Check>
  );
};
export default CheckButton;
