import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
  Thunderstorm: {
    iconName: 'weather-lightning-rainy',
    kor: '천둥번개',
    gradient: ['#283048', '#859398']
  },
  Drizzle: {
    iconName: 'grain',
    kor: '이슬비',
    gradient: ['#757F9A', '#D7DDE8']
  },
  Rain: {
    iconName: 'weather-rainy',
    kor: '비',
    gradient: ['##085078', '#85D8CE']
  },
  Snow: {
    iconName: 'weather-snowy',
    kor: '눈',
    gradient: ['#D3CCE3', '#E9E4F0']
  },
  Haze: {
    iconName: 'blackberry',
    kor: '미세먼지',
    gradient: ['#f12711', '#f5af19']
  },
  Clear: {
    iconName: 'white-balance-sunny',
    kor: '맑음',
    gradient: ['#457fca', '#5691c8']
  },
  Clouds: {
    iconName: 'weather-partlycloudy',
    kor: '구름',
    gradient: ['#0B486B', '#BCA9F5']
  }
};

export default function Weather({ temp, condition }) {
  return (
    <LinearGradient
      style={styles.container}
      colors={weatherOptions[condition].gradient}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          name={weatherOptions[condition].iconName}
          size={96}
          color="white"
        />
        <Text style={styles.temp}>{temp}°C</Text>
      </View>
      <View style={styles.halfContainer} />
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    'Thunderstorm',
    'Drizzle',
    'Rain',
    'Snow',
    'Haze',
    'Clear',
    'Clouds'
  ]).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  temp: {
    fontSize: 34,
    color: 'white'
  }
});
