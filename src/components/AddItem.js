import React, {useState} from 'react';
import Dialog from 'react-native-dialog';

const AddItem = ({visible, cancel, confirm}) => {
  const [value, setValue] = useState(null);

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Add</Dialog.Title>
      <Dialog.Input
        label="Calories"
        value={value}
        onChangeText={input => setValue(input)}
        keyboardType="number-pad"
        autoFocus={true}
      />
      <Dialog.Button label="Cancel" onPress={cancel} />
      <Dialog.Button label="Add" onPress={() => confirm(value)} />
    </Dialog.Container>
  );
};

export default AddItem;
