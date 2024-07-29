import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, { position, duration } from './ToastContainer';

const Toast = {
  position,
  duration,
  
  showSuccess(message, options = {}) {
    Toast.show(message, {
      containerStyle: {
        minWidth: 105,
        minHeight: 105,
        backgroundColor: 'rgba(30,30,30,.85)'
      },
      imgStyle: {
        width: 45,
        height: 45
      },
      textStyle: {
        marginTop: 10
      },
      position: Toast.position.CENTER,
      imgSource: require('./icon_success.png'),
      ...options
    });
  },

  showLoading(message, options = {}) {
    Toast.show(message, {
      containerStyle: {
        minWidth: 90,
        minHeight: 80,
        backgroundColor: 'rgba(30,30,30,.85)'
      },
      textStyle: {
        fontSize: 14,
        top: 6
      },
      mask: true,
      duration: 0,
      loading: true,
      position: Toast.position.CENTER,
      ...options
    });
  },

  show(message, options = {}) {
    let onHidden = options.onHidden;
    let toast;

    options.onHidden = function () {
      toast && toast.destroy();
      onHidden && onHidden();
    };

    toast = new RootSiblings(
      <ToastContainer
        {...options}
        visible={true}
        showText={!!message}
      >
        {message}
      </ToastContainer>
    );

    Toast.toast = toast;
    return toast;
  },

  hide(toast) {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else if (Toast.toast instanceof RootSiblings) {
      Toast.toast.destroy();
    }
  }
};


export { RootSiblings as Manager };
export default Toast;
