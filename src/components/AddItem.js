import React from 'react';
import Dialog from 'react-native-dialog';

const AddItem = ({visible, cancel, confirm}) => {
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Add</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Input label="Name" />
      <Dialog.Input label="Calories" />
      <Dialog.Button label="Cancel" onPress={cancel} />
      <Dialog.Button label="Add" onPress={confirm} />
    </Dialog.Container>
  );
};

export default AddItem;
