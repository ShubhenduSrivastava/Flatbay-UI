import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ steps, currentStep, progressColor }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.step,
              { backgroundColor: index <= currentStep ? '#FED807' : '#e0e0e0' },
            ]}
          >
            <Text style={styles.stepText}>{index + 1}</Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.connector,
                { backgroundColor: index < currentStep ? '#FED807' : '#e0e0e0' },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  step: {
    width: 30, // Increased size to fit the text
    height: 30, // Increased size to fit the text
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: 'black',
    fontWeight: 'bold',
  },
  connector: {
    
    width: 40,
    height: 5,
    marginHorizontal: 10,
  },
});

export default ProgressBar;
