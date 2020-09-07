[npm-badge]: https://img.shields.io/npm/v/react-native-better-buttons.svg?colorB=ff6d00
[rn-ripple]: https://github.com/n4kz/react-native-material-ripple
[npm-url]: https://www.npmjs.com/package/react-native-better-buttons
[license-badge]: https://img.shields.io/npm/l/react-native-better-buttons.svg?colorB=448afe
[license-url]: https://github.com/jordanwilking/react-native-better-buttons/blob/master/LICENSE

# react-native-better-buttons

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Base components for move-to-cancel and long-press-to-cancel views

## Features

- LongPressButton: Cancels actions after longPressTimout elapses
- MoveAwayButton: Cancels actions when user's finger moves outside button
- useLongPress: Hook for changing from `pressed` to `longPressed` state
- useMeasurement: Hook for determining the View's dimensions relative to the page (minX, maxX, minY, maxY)
- Ripple: Click effect for buttons. Derived from [react-native-material-ripple][rn-ripple]

![LongPressButton](https://user-images.githubusercontent.com/22667297/92424002-eecb0800-f137-11ea-8d47-92c45f000dd7.gif)<br/>
![MoveAwayButton](https://user-images.githubusercontent.com/22667297/92424003-ef639e80-f137-11ea-815f-ac3d77940e08.gif)<br/>
![Ripple](https://user-images.githubusercontent.com/22667297/92424004-ef639e80-f137-11ea-836a-8593dc8cb98a.gif)<br/>

## Installation

```bash
npm install --save react-native-better-buttons
```

## Usage

#### LongPressButton

```javascript
<LongPressButton
  style={theme.button}
  pressedStyle={theme.buttonPressed}
  onPressOut={() => {}}>
  <Text>LongPressButton</Text>
</LongPressButton>
```

#### MoveAwayButton

```js
const { pressed, setPressed } = useLongPress()

const handleClick = () => {
  if (pressed) {
    onClick()
  }
  setPressed(false)
}

return (
  <MoveAwayButton
    style={[styles.card, pressed && styles.cardPressed]}
    pressed={pressed}
    setPressed={setPressed}
    onPressOut={handleClick}>
    <Text style={[styles.text, pressed && styles.textPressed]}>
      MoveAwayButton
    </Text>
  </MoveAwayButton>
)
```

## Properties

| name                        | description                                          | type     | default      |
| :-------------------------- | :--------------------------------------------------- | :------- | :----------- |
| rippleColor                 | Ripple color                                         | String   | rgb(0, 0, 0) |
| rippleOpacity               | Ripple opacity                                       | Number   | 0.3          |
| rippleDuration              | Ripple duration in ms                                | Number   | 400          |
| rippleReset                 | Ripples before resetting. Prevents animation issues. | Number   | 10           |
| rippleSize                  | Ripple size restriction                              | Number   | 0            |
| rippleContainerBorderRadius | Ripple container border radius                       | Number   | 0            |
| rippleCentered              | Ripple always starts from center                     | Boolean  | false        |
| disableRippleFade           | Ripple does not fade out                             | Boolean  | false        |
| disableRipple               | View is used instead of Ripple                       | Boolean  | false        |
| disableRippleOnPressIn      | onPressIn ripple is disabled                         | Boolean  | false        |
| rippleOnPress               | Ripples onPress                                      | Boolean  | false        |
| rippleOnPressOut            | Ripples onPressOut                                   | Boolean  | false        |
| onPressIn                   | Touch moved in or started callback                   | Function | -            |
| onRippleAnimation           | Animation start callback                             | Function | -            |
| longPressTimout             | Time in ms before action is cancelled                | Number   | 800          |
| moveCancelBuffer            | Extra buffer before move away cancels action         | Number   | 10           |

Other View properties will also work

## Copyright and License

MIT License

Copyright 2020 Jordan Wilking. All rights reserved.
