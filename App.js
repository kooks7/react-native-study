import React from 'react';
import axios from 'axios';

import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

import Weather from './Weather';

const API_KEY = 'e8acac7caa8bfbad109ecc92a742b13c';

export default class App extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      temp: temp,
      condition: weather[0].main
    });
  };

  getLocation = async () => {
    try {
      // 1. user에게 위치 정보 동의 여부 물어보기
      await Location.requestPermissionsAsync();
      // 2. ok 하면 가져오기
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();

      // 3. 날씨 가져오기
      this.getWeather(latitude, longitude);

      // 4. Loading 완료
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
      Alert.alert('위치를 찾을 수 없습니다...', '슬퍼용 ㅠㅠ');
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}
