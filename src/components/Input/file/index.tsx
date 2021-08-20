import InfoText from 'components/Text';
import { any, string } from 'prop-types';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { FileInputProps } from 'Type';
import './index.scss';

const FileInput = ({ info, label, dispalyImage, defaultImage, onChange }: FileInputProps) => {
  const [fileImg, setFileImg] = useState<string>();

  useEffect(() => {
    setFileImg(defaultImage);
  }, [defaultImage]);

  const onChangeFile = (e: any) => {
    onChange && onChange(e);
    e.target.files.length > 0 && setFileImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="file-box">
      <div className="file-overlay">
        {info && !fileImg && <InfoText variant="secondary">{info}</InfoText>}
        <label className="file-buttton" htmlFor="file-input">
          {label} <img className="img" src="/img/file.svg" />
          <input type="file" id="file-input" onChange={onChangeFile} />
        </label>
      </div>
      {fileImg && dispalyImage && <Image className="file-bg" src={fileImg} />}
    </div>
  );
};

export default FileInput;
