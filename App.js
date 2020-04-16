import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

export default class App extends React.Component {
  state = {
    isLoading: true
  };
  getLocation = async () => {
    try {
      // 1. user에게 위치 정보 동의 여부 물어보기
      await Location.requestPermissionsAsync();
      // 2. ok 하면 가져오기
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      // 3. Loading 완료
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert('위치를 찾을 수 없습니다...', '슬퍼용 ㅠㅠ');
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
