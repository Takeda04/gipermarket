import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import StepOne from './step-one';
import ValidateNumber from './validate-number';
import StepTwo from './step-two';
import VerfyCardNumber from './verfy-cardNumber';
import StepFour from './step-four';
import AddGuarand from './add-guarand';
import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';



interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
  setUserIdefy: React.Dispatch<React.SetStateAction<boolean>>;
  stepActive?: number;
  close: () => void;

}

const SwitchInstalments: React.FC<Props> = ({ setStepActive, stepActive, close, setUserIdefy }) => {

  const { step } = useAppSelector((state) => state.paymart);

  if (step === 1 && stepActive === 0) {
    setStepActive(2);
  }
  if (step === 2) {
    setStepActive(0);
    return <Stack>
      <Typography textTransform='uppercase' textAlign='center' paddingY='40px' variant='h2'>страница ожидания</Typography>
      <Button onClick={() => setUserIdefy(false)} variant='contained'>Далее</Button>
    </Stack>
  }
  if (step === 5 && stepActive === 0) {
    setStepActive(4)
  }
  if (stepActive === 0 && step === 12) {
    setStepActive(5)
  }
  //check number
  if (stepActive === 0 && step === 0) {
    return <StepOne setStepActive={setStepActive} />
  }

  // validate number
  if (stepActive === 1 && step === 0) {
    return <ValidateNumber setStepActive={setStepActive} />
  }
  // addcard
  if (stepActive === 2 && step === 0 || step === 1) {
    return <StepFour setStepActive={setStepActive} />
  }
  if (stepActive === 3) {
    return <VerfyCardNumber setStepActive={setStepActive} />///////
  }
  if (stepActive === 4 || step === 5) {
    return <StepTwo setStepActive={setStepActive} />
  }

  if (stepActive === 5 || step === 12) {
    return <AddGuarand close={close} setUserIdefy={setUserIdefy} setStepActive={setStepActive} />/////
  }

  return null;
}

export default SwitchInstalments;