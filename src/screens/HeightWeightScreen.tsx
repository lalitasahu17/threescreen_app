import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native';

const HEIGHT_FEET = Array.from({ length: 21 }, (_, i) => i + 3); // 3 to 23 feet
const HEIGHT_CM = Array.from({ length: 101 }, (_, i) => i + 100); // 100cm to 200cm
const WEIGHT_KG = Array.from({ length: 101 }, (_, i) => i + 30); // 30 to 130kg
const WEIGHT_LBS = Array.from({ length: 121 }, (_, i) => i + 66); // 66 to 186 lbs

const HeightWeightScreen = () => {
  const [isHeight, setIsHeight] = useState(true);
  const [heightUnit, setHeightUnit] = useState('Feet');
  const [weightUnit, setWeightUnit] = useState('Kg');
  const [selectedHeight, setSelectedHeight] = useState(5);
  const [selectedWeight, setSelectedWeight] = useState(60);

  const getHeightData = () => (heightUnit === 'Feet' ? HEIGHT_FEET : HEIGHT_CM);
  const getWeightData = () => (weightUnit === 'Kg' ? WEIGHT_KG : WEIGHT_LBS);

  const renderRuler = (data, selected, setSelected) => (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.rulerContainer}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelected(item)}>
          <Text style={[styles.rulerText, selected === item && styles.selectedText]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      
      

     <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15, marginBottom:15 }}>
      <Text style={styles.stepText}>step {isHeight ? '2' : '3'}/3</Text>
      <View style={styles.stepBar}>
        <View style={[styles.bar, styles.active]} />
        <View style={[styles.bar, isHeight ? null : styles.active]} />
        <View style={[styles.bar, !isHeight && styles.active]} />
      </View>
      </View>

      
      <Text style={styles.title}>What Is Your{'\n'}Height & Weight?</Text>

      <View style={{justifyContent:'center', alignItems:'center'}}>
      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, isHeight && styles.activeToggle]}
          onPress={() => setIsHeight(true)}
        >
          <Text style={isHeight ? styles.activeToggleText : styles.toggleText}>Height</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, !isHeight && styles.activeToggle]}
          onPress={() => setIsHeight(false)}
        >
          <Text style={!isHeight ? styles.activeToggleText : styles.toggleText}>Weight</Text>
        </TouchableOpacity>
      </View>
</View>

  
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'70%',backgroundColor:'whitesmoke', borderWidth:1, borderRadius:20, padding:10}}>
      <View style={styles.rulerBox}>
        <Text style={styles.rulerValue}>
          {isHeight ? selectedHeight : selectedWeight}
        </Text>
        <Text style={styles.rulerUnit}>
          {isHeight ? heightUnit : weightUnit}
        </Text>
      </View>

     
      {isHeight
        ? renderRuler(getHeightData(), selectedHeight, setSelectedHeight)
        : renderRuler(getWeightData(), selectedWeight, setSelectedWeight)}
        </View>
</View>
      
      <View style={styles.unitToggle}>
        {isHeight ? (
          <>
            <TouchableOpacity onPress={() => setHeightUnit('Cm')}>
              <Text style={heightUnit === 'Cm' ? styles.unitSelected : styles.unitNormal}>Cm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setHeightUnit('Feet')}>
              <Text style={heightUnit === 'Feet' ? styles.unitSelected : styles.unitNormal}>Feet</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setWeightUnit('Lbs')}>
              <Text style={weightUnit === 'Lbs' ? styles.unitSelected : styles.unitNormal}>Lbs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setWeightUnit('Kg')}>
              <Text style={weightUnit === 'Kg' ? styles.unitSelected : styles.unitNormal}>Kg</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>{isHeight ? 'Next' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
};  

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    padding: 20,
    // alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
  },
  stepBar: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  bar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  active: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1f1f1f',
  },
  toggle: {
    width:'45%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 30,
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  toggleText: {
    color: '#444',
    fontWeight: '500',
  },
  activeToggle: {
    backgroundColor: '#000',
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: '600',
  },
  rulerBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  rulerValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  rulerUnit: {
    fontSize: 16,
    color: '#888',
  },
  rulerContainer: {
    // paddingHorizontal: width * 0.2,
    // paddingVertical: 10,
  },
  rulerText: {
    fontSize: 22,
    marginHorizontal: 10,
    color: '#888',
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  unitToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  unitNormal: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 10,
  },
  unitSelected: {
    fontSize: 16,
    color: '#d60000',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  submitBtn: {
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
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HeightWeightScreen;
