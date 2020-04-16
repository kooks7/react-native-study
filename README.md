# React Native!

* 시작하게 된 계기
  날씨 앱을 만들기 위해 프론트 페이지가 필요했습니다. React로 구성해서 웹 애플리케이션을 만들던 중 차라리 모바일에서 동작 하는게 낫다고 판단하여 가볍게 사용해보고 넘어가려고 합니다.
* 필요 패키지
  * Android Studio
  * expo CLI

## Setting

#### 세팅

1. `npm i -g expo-cli`
   expo 설치
2. `expo init abcd`
   * blank로 만들기
   * Gitbash에서는 interactive 모드가 지원 안됨.
3. 프로젝트 폴더에서 `npm start`
   * expo와 안드로이드 시뮬레이터 연동
     https://docs.expo.io/versions/latest/workflow/android-studio-emulator/

#### 기본

* React Native는 브릿지라는 것을 사용해서 React Native 코드를 Native 코드로 변환해줍니다.

* 브릿지는 일반 HTML 태그랑 다릅니다.

  ```javascript
  export default function App() {
    return (
      <View style={styles.container}>
        <Text>Hi!!</Text>
      </View>
    );
  ```

  `View` 태그와 `Text`태그를 사용합니다.

* `View` = `div`

* `Text`= `span`

* 부모에게 css 요소를 상속받지 않습니다.

#### Layout 규칙

* flex의 flex box의 기본 방향은 **column**입니다. (웹사이트는 row)

* **flex** : 화면을 차지하는 정도로 나타냄
  flex를 사용하면 화면의 크기에 상관없이 content를 꽉 채울수 있습니다.

  ```react
  export default function App() {
    return (
      <View style={styles.container}>
        <View style={styles.yellowView}></View>
        <View style={styles.blueView}></View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
      // 부모 View가 화면을 얼마나 사용할 것인지 정하기
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    yellowView: {
      flex: 2,
      backgroundColor: 'yellow'
    },
    blueView: {
      flex: 1,
      backgroundColor: 'green'
    }
  });
  ```

#### 로딩 스크린 만들기

1. **Loding.js**

   * 기본 로딩 화면 만들기

     ```react
     import React from 'react';
     import { StyleSheet, Text, View } from 'react-native';
     
     export default function Loading() {
       return (
         <View style={styles.container}>
           <Text style={styles.text}>날씨 정보를 가져오는 중입니다.</Text>
         </View>
       );
     }
     
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         justifyContent: 'flex-end',
         paddingHorizontal: 30,
         paddingVertical: 100,
         backgroundColor: '#FDf6aa'
       },
       text: {
         color: '#2c2c2c',
         fontSize: 20
       }
     });
     
     ```

2. **App.js**

   * `Loding.js` import 하기

     ```react
     import React from 'react';
     import Loading from './Loding';
     
     export default function App() {
       return <Loading />;
     }
     
     ```

   #### 위치정보 가져오기

   * expo에서 제공하는 모듈을 사용해봅시다.
     https://docs.expo.io/versions/latest/

   1. `expo install expo-location`

   2. **App.js**

      * import하기

        ```react
        import * as Location from 'expo-location';
        ```

      * class component 만들기

        ```react
        export default class App extends React.Component {
          getLocation = async () => {
            const location = await Location.getCurrentPositionAsync()
            console.log(location)
          }
          componentDidMount() {
            this.getLocation()
          }
          render() {
            return <Loading />;
          }
        }
        ```

      * 사용자에게 위치 정보 동의 얻기

        ```react
        
          getLocation = async () => {
            try {
              // 1. user에게 위치 정보 동의 여부 물어보기
              const response = await Location.requestPermissionsAsync();
              console.log(response);
              // ok 하면 가져오기
              const location = await Location.getCurrentPositionAsync();
              console.log(location);
            } catch (error) {}
          };
        ```

      * 에러 alert로 띄우기

        ```react
        import { Alert } from 'react-native';
        
        	...
            
            export default class App extends React.Component {
          getLocation = async () => {
            try {
              // 1. user에게 위치 정보 동의 여부 물어보기
              await Location.requestPermissionsAsync();
              // ok 하면 가져오기
              const location = await Location.getCurrentPositionAsync();
              console.log(location);
            } catch (error) {}
          };
        	...
        ```

      * 위치 정보 가져오기

        ```react
            try {
              // 1. user에게 위치 정보 동의 여부 물어보기
              await Location.requestPermissionsAsync();
              // ok 하면 가져오기
              const {
                coords: { latitude, longitude }
              } = await Location.getCurrentPositionAsync();
              console.log(latitude, longitude);
            } catch (error) {
              Alert.alert('위치를 찾을 수 없습니다...', '슬퍼용 ㅠㅠ');
            }
        ```

      * state 만들기

        ```react
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
              console.log(latitude, longitude);
              // 3. Loading 완료
                this.setState({isLoading : false})
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
        ```

      #### 날씨 API 가져오기

      * Open Weather 사이트 이용하기

      1. `npm i --save axios`

      2. **App.js** 

         * API 데이터 가져오는 메소드 생성

           ```react
             getWeather = async (latitude, longitude) => {
               const { data } = await axios.get(
                 `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
               );
             };
           ```

      3. **Weather.js**

         * `npm i prop-types`

         * 컴포넌트 만들기

           ```react
           import React from 'react';
           import { StyleSheet, Text, View } from 'react-native';
           import PropTypes from 'prop-types';
           
           export default function Weather({ temp }) {
             return (
               <View style={styles.container}>
                 <Text>{temp}</Text>
               </View>
             );
           }
           
           Weather.PropTypes = {
             temp: propTypes.number.isRequired
           };
           
           const styles = StyleSheet.create({
             container: {
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center'
             }
           });
           
           ```

      4. **App.js**

         * 렌더링하기

           ```react
             render() {
               const { isLoading, temp } = this.state;
               return isLoading ? <Loading /> : <Weather temp={temp} />;
             }
           ```

      #### condition 가져오기

      1. **Weather.js**

         * condition `PropTypes`추가해주기

           ```react
           Weather.propTypes = {
             temp: PropTypes.number.isRequired,
             condition: PropTypes.oneOf([
               'Thunderstorm',
               'Drizzle',
               'Rain',
               'Snow',
               'Atmosphere',
               'Clear',
               'Clouds'
             ]).isRequired
           };
           
           ```

      2. **App.js**

         * API 데이터 es6문법 이용해서 다시 담기

           ```react
           getWeather = async (latitude, longitude) => {
               const {
                 data: {
                   main: { temp },
                   weather
                 }
               } = await axios.get(
                 `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
               );
           ```

      우선 목록이 너무 많으므로 뛰어넘도록 합시다.

#### expo/vector-icons 사용하기

* icon 찾아보기
  https://expo.github.io/vector-icons/

1. **Weather.js**

   * `import { MaterialCommunityIcons} from '@expo/vector-icons';` 가져오기

     위 아이콘 디렉토리에서 icon famliy를 가져와서 임포트해줍니다.

   * 전체 코드를 다시보자면

     ```react
     import React from 'react';
     import { StyleSheet, Text, View } from 'react-native';
     import PropTypes from 'prop-types';
     // 1. icon import 해주고
     import { MaterialCommunityIcons } from '@expo/vector-icons';
     
     export default function Weather({ temp }) {
       return (
           // 2. View 하나 더 만들고 이미지 넣고
         <View style={styles.container}>
           <View style={styles.halfContainer}>
             <MaterialCommunityIcons name="weather-lightning-rainy" size={96} />
             <Text style={styles.temp}>{temp}°C</Text>
           </View>
           <View style={styles.halfContainer} />
         </View>
       );
     }
     
     Weather.propTypes = {
       temp: PropTypes.number.isRequired,
       condition: PropTypes.oneOf([
         'Thunderstorm',
         'Drizzle',
         'Rain',
         'Snow',
         'Atmosphere',
         'Clear',
         'Clouds'
       ]).isRequired
     };
     
     // 3. styling 해주기
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
         fontSize: 34
       }
     });
     
     ```

#### Background Gradient - 배경에 그라데이션 주는방법

1. `expo install expo-linear-gradient`

2. **Weather.js**

   * 가져오고 설정하기 + StatusBar

     ```react
     import { StyleSheet, Text, View, StatusBar } from 'react-native';
     
     import {LinearGradient} from 'expo-linear-gradient'
     
     export default function Weather({ temp }) {
       return (
         <LinearGradient
           style={styles.container}
           colors={['#4c669f', '#3b5998', '#192f6a']}
         >
           <StatusBar barStyle="light-content" />
           <View style={styles.halfContainer}>
             <MaterialCommunityIcons
               name="weather-lightning-rainy"
               size={96}
               color="white"
             />
             <Text style={styles.temp}>{temp}°C</Text>
           </View>
           <View style={styles.halfContainer} />
         </LinearGradient>
       );
     }
     ```

   * StatusBar 설정

     ```react
     export default function Weather({ temp }) {
       return (
         <LinearGradient
           style={styles.container}
           colors={['#4c669f', '#3b5998', '#192f6a']}
         >
           <StatusBar barStyle="light-content" />
           <View style={styles.halfContainer}>
             <MaterialCommunityIcons
               name="weather-lightning-rainy"
               size={96}
               color="white"
             />
             <Text style={styles.temp}>{temp}°C</Text>
           </View>
           <View style={styles.halfContainer} />
         </LinearGradient>
       );
     }
     ```

3. 동적으로 UI 바꾸기

   * 객체를 만들어서 날씨에 따라 UI 변하게 하기

     ```react
     
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
     
     
     ```

     