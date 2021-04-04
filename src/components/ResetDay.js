import React from 'react';
import Dialog from 'react-native-dialog';

const ResetDay = ({visible, cancel, confirm}) => {
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Reset?</Dialog.Title>
      <Dialog.Description>Do you want to reset the counter?</Dialog.Description>
      <Dialog.Button label="Cancel" onPress={cancel} />
      <Dialog.Button label="Yes, Reset" onPress={confirm} />
    </Dialog.Container>
  );
};

export default ResetDay;
