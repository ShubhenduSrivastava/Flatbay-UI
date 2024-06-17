import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import {
  updatePersonalDetails,
  updatePricing,
  updateSchedule,
  updateAmenities,
  updateRoommatePreferences,
} from './redux/formSlice';

import { AntDesign } from '@expo/vector-icons';

import ProgressBar from "../src/components/ProgressBar";

const steps = ["Personal Details", "Pricing & Schedule", "Amenities & Preferences", "Review"];

const amenities = {
  ac: {
    uri: require('../src/assets/ac.png'), // Update the path according to your project structure
    selected: false,
  },
  cylinder: {
    uri: require('../src/assets/cylinder.png'), // Update the path according to your project structure
    selected: false,
  },
  fence: {
    uri: require('../src/assets/fence.png'), // Update the path according to your project structure
    selected: false,
  },
  exercise: {
    uri: require('../src/assets/exercise.png'), // Update the path according to your project structure
    selected: false,
  },
  nightlife : {
    uri: require('../src/assets/nightlife.png'), // Update the path according to your project structure
    selected: false,
  },
  security : {
    uri: require('../src/assets/security.png'), // Update the path according to your project structure
    selected: false,
  },
  // Add more amenities as needed
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [localAmenities, setLocalAmenities] = useState(amenities);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (section, key, value) => {
    switch (section) {
      case 'personalDetails':
        dispatch(updatePersonalDetails({ [key]: value }));
        break;
      case 'pricing':
        dispatch(updatePricing({ [key]: value }));
        break;
      case 'schedule':
        dispatch(updateSchedule({ [key]: value }));
        break;
      case 'amenities':
        dispatch(updateAmenities({ [key]: value }));
        break;
      case 'roommatePreferences':
        dispatch(updateRoommatePreferences({ [key]: value }));
        break;
      default:
        break;
    }
  };

  const handleAmenityChange = (key) => {
    const updatedAmenities = { ...localAmenities };
    updatedAmenities[key].selected = !updatedAmenities[key].selected;
    setLocalAmenities(updatedAmenities);
    dispatch(updateAmenities(updatedAmenities));
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar steps={steps} currentStep={currentStep} />
      </View>
      <View style={styles.contentContainer}>
        {currentStep === 0 && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom:20 }}>
              Information Form
            </Text>
            <Text style={styles.firstText}>First Name</Text>
            <TextInput
              style={styles.firstInput}
              placeholder="Enter your first name"
              keyboardType="default"
              value={formData.personalDetails.firstName}
              onChangeText={(value) => handleInputChange('personalDetails', 'firstName', value)}
            />

            <Text style={styles.firstText}>Last Name</Text>
            <TextInput
              style={styles.firstInput}
              placeholder="Enter your last name"
              keyboardType="default"
              value={formData.personalDetails.lastName}
              onChangeText={(value) => handleInputChange('personalDetails', 'lastName', value)}
            />

            <Text style={styles.firstText}>Email</Text>
            <TextInput
              style={styles.firstInput}
              placeholder="Enter your Email id"
              keyboardType="default"
              value={formData.personalDetails.email}
              onChangeText={(value) => handleInputChange('personalDetails', 'email', value)}
            />

            <Text style={styles.firstText}>Contact Number</Text>
            <TextInput
              style={styles.firstInput}
              placeholder="Enter your Mobile no."
              keyboardType="numeric"
              value={formData.personalDetails.contactNumber}
              onChangeText={(value) => handleInputChange('personalDetails', 'contactNumber', value)}
            />
          </View>
        )}
        {currentStep === 1 && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Pricing -------------------------------------------------
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text>Deposit</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={formData.pricing.deposit}
                onChangeText={(value) => handleInputChange('pricing', 'deposit', value)}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <Text>Rent per month</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={formData.pricing.rentPerMonth}
                onChangeText={(value) => handleInputChange('pricing', 'rentPerMonth', value)}
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 5 }}>
              Schedule -----------------------------------------------
            </Text>
            <Text style={{ margin: 15 }}>Availability</Text>
            <View style={styles.availabilityContainer}>
              {["Everyday", "Weekday", "Weekend"].map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.availabilityButton,
                    formData.schedule.availability === option && styles.selectedButton,
                  ]}
                  onPress={() => handleInputChange('schedule', 'availability', option)}
                >
                  <Text style={styles.buttonText}>{option}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={{ margin: 15 }}>Schedule Time</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TextInput
                style={styles.input}
                placeholder="From"
                value={formData.schedule.scheduleFrom}
                onChangeText={(value) => handleInputChange('schedule', 'scheduleFrom', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="To"
                value={formData.schedule.scheduleTo}
                onChangeText={(value) => handleInputChange('schedule', 'scheduleTo', value)}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Available All Day</Text>
              <AntDesign
                name={formData.schedule.availableAllDay ? 'checksquare' : 'checksquareo'}
                size={24}
                color="black"
                onPress={() => handleInputChange('schedule', 'availableAllDay', !formData.schedule.availableAllDay)}
              />
            </View>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Amenities ----------------------------------------------
              </Text>
              <View style={styles.amenitiesContainer}>
                {Object.keys(localAmenities).map((key) => (
                  <Pressable
                    key={key}
                    style={[
                      styles.amenityButton,
                      localAmenities[key].selected && styles.selectedAmenity,
                    ]}
                    onPress={() => handleAmenityChange(key)}
                  >
                    <View style={styles.amenityContent}>
                      <Image
                        source={localAmenities[key].uri}
                        style={styles.amenityImage} // Adjust size as needed
                      />
                      <Text style={styles.buttonText}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}
        {currentStep === 2 && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Your roommate preferences
            </Text>
            {[
              {
                label: "Who are you looking for?",
                key: "gender",
                options: ["Female", "Male", "Other"],
              },
              {
                label: "Your roommate should be?",
                key: "maritalStatus",
                options: ["Married", "Unmarried", "Any"],
              },
              {
                label: "Your roommate’s occupation should be?",
                key: "occupation",
                options: ["Student", "Working", "Any"],
              },
              {
                label: "What is your food preference?",
                key: "food",
                options: ["Veg", "Non Veg", "Any"],
              },
              {
                label: "Are you okay with pets?",
                key: "pets",
                options: ["Yes", "No", "Don't mind"],
              },
              {
                label: "Are you okay with smoking?",
                key: "smoking",
                options: ["Yes", "No", "Don't mind"],
              },
              {
                label: "Are you okay with drinking?",
                key: "drinking",
                options: ["Yes", "No", "Don't mind"],
              },
              {
                label: "Are you okay with partying?",
                key: "partying",
                options: ["Yes", "No", "Don't mind"],
              },
            ].map((preference) => (
              <View key={preference.key}>
                <Text>{preference.label}</Text>
                <View style={styles.availabilityContainer}>
                  {preference.options.map((option) => (
                    <Pressable
                      key={option}
                      style={[
                        styles.availabilityButton,
                        formData.roommatePreferences[preference.key] === option && styles.selectedButton2,
                      ]}
                      onPress={() =>
                        handleInputChange('roommatePreferences', preference.key, option)
                      }
                    >
                      <Text style={styles.buttonText}>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
        {currentStep === 3 && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom:20 }}>
              You’re almost there!
            </Text>
            <View style={styles.summaryContainer}>
              <Image source={{uri: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2022/Jul/05/Photo_h400_w540/GR2-301427-1421701_400_540.jpeg"}} style={styles.image} />
              <Text style={styles.name}>{`${formData.personalDetails.firstName} ${formData.personalDetails.lastName}`}</Text>
              <Text style={styles.details}>Flat | 2 BHK | Fully Furnished</Text>
              <Text style={styles.details}>
                ₹{formData.pricing.rentPerMonth}/Month   ₹{formData.pricing.deposit} downpayment
              </Text>
            </View>
            <Pressable style={styles.publishButton}>
              <Text style={styles.buttonText}>Publish</Text>
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, currentStep === 0 && styles.disabledButton]}
          onPress={handleBack}
          disabled={currentStep === 0}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            currentStep === steps.length - 1 && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button: {
    width: 150,
    padding: 10,
    backgroundColor: "#574B7B",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  input: {
    width:"40%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    marginVertical: 5,
    marginLeft: 15,
    alignText:"center"
  },
  availabilityContainer: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  
  availabilityButton: {
    flexBasis: "30%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#574B7B",
  },
  selectedButton2: {
    borderColor:"#574B7B",
    borderWidth:2,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 8,
  },
  firstInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    marginTop: 5,
    width: 325,
    marginBottom: 20,
  },
  firstText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryContainer: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 2,
  },
  publishButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#574B7B",
    borderRadius: 5,
    alignItems: "center",
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  amenityButton: {
    flexBasis: "30%",
    padding: 10,
    borderWidth: 2,
    borderColor: "#cccccc",
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  selectedAmenity: {
    
    borderColor:"#574B7B"
  },
  amenityContent: {
    alignItems: "center",
  },
  amenityImage: {
    width: 30,
    height: 30,
    marginBottom: 3,
  },
});

export default MultiStepForm;
