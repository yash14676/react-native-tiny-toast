"# react-native-custom-tiny-toast" 


## Install

Install the package via npm:

```javascript
    npm i react-native-custom-tiny-toast --save
```


## Configure
    import { RootSiblingParent } from 'react-native-root-siblings'
```jsx
    <RootSiblingParent>
        <App />
    </RootSiblingParent>
```


## Usage

Import the component:

```javascript
    import Toast from 'react-native-custom-tiny-toast'
    
    Toast.show('Default Toast')
    
    Toast.showSuccess('Success Toast')
    
    Toast.show('Custom Toast',{
    position: Toast.position.center,
    containerStyle:{backgroundColor:'#a85032'},
    textStyle: {},
    textColor:'#000'
    imgSource: require('image Path'),
    imgStyle: {},
    ...
    })
 
Toast.showLoading('Loading...')
```


## hide Toast
```javascript
    Toast.hide()
```