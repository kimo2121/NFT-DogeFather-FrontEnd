import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/button/Button';

import { useProfile } from 'state/hooks';
import InfoText from '../Text';
import { useWeb3React } from '@web3-react/core';

export default function ConnectButton({ loginStatus, profile }) {
  const { login } = useAuth();
  const history = useHistory();

  function goToUpload() {
    history.push('/upload');
  }
  return (
    <span>
      {!(loginStatus && profile) && <Button label="Connect Wallet" variant="outline-primary" onClick={login} />}
      {loginStatus && profile && <Button label="CREATE" variant="primary" onClick={goToUpload} />}
    </span>
  );
}
