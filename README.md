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

        