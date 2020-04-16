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
   * Gitbash에서는 interactive 모드가 지원 안된다.
3. 프로젝트 폴더에서 `npm start`
   * expo와 안드로이드 시뮬레이터 연동
     https://docs.expo.io/versions/latest/workflow/android-studio-emulator/

#### 기본

* React Native는 브릿지라는 것을 사용해서 React Native 코드를 Native 코드로 변환해준다

* 브릿지는 일반 HTML 태그랑 다르다.

  ```javascript
  export default function App() {
    return (
      <View style={styles.container}>
        <Text>Hi!!</Text>
      </View>
    );
  ```

  `View` 태그와 `Text`태그를 사용한다.

* `View` = `div`

* `Text`= `span`

* 부모에게 css 요소를 상속받지 않는다.

#### Layout 규칙

* flex의 flex box의 기본 방향은 **column**이다. (웹사이트는 row)

* **flex** : 화면을 차지하는 정도로 나타냄
  flex를 사용하면 화면의 크기에 상관없이 content를 꽉 채울수 있다.

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