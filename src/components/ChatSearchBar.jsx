// components/ChatSearchBar.jsx
import {Controller, useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {View, TextInput, Pressable, Text} from 'react-native';
import debounce from 'lodash.debounce';

const ChatSearchBar = ({onSearch}) => {
  const {control, handleSubmit, watch} = useForm();
  const watchName = watch('name');

  // Debounce input changes
  const debouncedSearch = debounce((name) => {
    onSearch(name);
  }, 500);

  useEffect(() => {
    if (watchName !== undefined) {
      debouncedSearch(watchName);
    }
  }, [watchName]);

  const onSubmit = ({name}) => {
    onSearch(name); // Manual trigger
  };

  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <TextInput
            value={value}
            onChangeText={text => {
              onChange(text);
            }}
            placeholder="Search by name"
            style={{
              flex: 1,
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#ccc',
            }}
          />
        )}
      />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
        }}>
        <Text style={{color: 'white'}}>Search</Text>
      </Pressable>
    </View>
  );
};

export default ChatSearchBar;
