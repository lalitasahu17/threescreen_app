import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from '@react-native-vector-icons/material-icons';


type RootStackParamList = {
  BasicDetails: undefined;
  HeightWeight: undefined;
};

const years = Array.from({ length: 30 }, (_, i) => 1995 + i);
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const BasicDetailsScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedDate, setSelectedDate] = useState({
    year: 2000,
    month: 'Oct',
    day: 16,
  });

  const onSubmit = (data: any) => {
    navigation.navigate('HeightWeight');
  };

  const renderPicker = (data: any[], selected: any, setSelected: (val: any) => void) => (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelected(item)}
          style={[
            styles.dateBox,
            selected === item && styles.selectedBox,
          ]}
        >
          <Text style={[
            styles.dateText,
            selected === item && styles.selectedDateText,
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15, marginBottom:15 }}>
      <Text style={styles.step}>step 1/3</Text>
      <View style={styles.stepBar}>
        <View style={[styles.bar, styles.active]} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </View>
</View>
      <Text style={styles.heading}>Basic{'\n'}Details</Text>

      <Text style={styles.label}>Select Your Gender</Text>
      <Controller
        control={control}
        name="gender"
        defaultValue="Male"
        render={({ field: { onChange, value } }) => (
          <View style={styles.genderRow}>
            <TouchableOpacity
              onPress={() => onChange('Male')}
              style={[
                styles.genderBox,
                value === 'Male' && styles.genderSelected,
              ]}
            >
              <Text style={value === 'Male' ? styles.genderSelectedText : styles.genderText}>
                Male   <Icon name="male" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onChange('Female')}
              style={[
                styles.genderBox,
                value === 'Female' && styles.genderSelected,
              ]}
            >
              <Text style={value === 'Female' ? styles.genderSelectedText : styles.genderText}>
                Female  <Icon name="female" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.label}>What Is Your Date Of Birth?</Text>
      <View>
        {renderPicker(years, selectedDate.year, (val) => setSelectedDate({ ...selectedDate, year: val }))}
        {renderPicker(months, selectedDate.month, (val) => setSelectedDate({ ...selectedDate, month: val }))}
        {renderPicker(days, selectedDate.day, (val) => setSelectedDate({ ...selectedDate, day: val }))}
      </View>

      <Text style={styles.selectedDob}>
        {selectedDate.day} {selectedDate.month} {selectedDate.year}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#efefef',
    position:'relative',
   
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1f1f1f',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderBox: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderSelected: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  genderSelectedText: {
    fontSize: 16,
    color: '#d60000',
    fontWeight: 'bold',
  },
  dateBox: {
    padding: 10,
    marginBottom:10,
    marginRight:10,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 60,
    alignItems: 'center',
  },
  selectedBox: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  dateText: {
    color: '#888',
  },
  selectedDateText: {
    color: '#d60000',
    fontWeight: 'bold',
  },
  selectedDob: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '600',
  },
  button: {
    width:'100%',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    position:'absolute',
    bottom:20,
    marginLeft:20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  step: {
    fontSize: 14,
    marginBottom: 5,
  },
  stepBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  active: {
    backgroundColor: '#000',
  },
});
