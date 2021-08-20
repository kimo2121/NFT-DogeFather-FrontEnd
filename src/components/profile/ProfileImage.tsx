import { Image } from 'react-bootstrap';
import './ProfileImage.scss';
import { ProfileImageProps } from '../../Type';
import { useEffect, useState } from 'react';

const ProfileImage = (props: ProfileImageProps) => {
  const [fileImg, setFileImg] = useState<string>();

  useEffect(() => {
    setFileImg(props.img || '/img/default-profile.png');
  }, [props.img]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e);
    e.target.files.length > 0 && setFileImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={`profile ${props.blurBG && 'blur-bg'}`}>
      <div className={props.homeCardStyle ? 'profile-block homeCardStyle-profile-block' : 'profile-block'}>
        <Image
          className={props.homeCardStyle ? 'profile-img homeCardStyle-profile-img' : 'profile-img'}
          src={fileImg}
          roundedCircle={props.rounded}
        />
        {props.verified === true && <Image className="tick-icon" src="/img/tick.svg" roundedCircle />}

        {props.edit && (
          <div className="profile-file-overlay">
            <label className="profile-file-buttton" htmlFor="profile-file-input">
              Edit
              <input type="file" id="profile-file-input" className="profile-file-input" onChange={onChangeFile} />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileImage;
