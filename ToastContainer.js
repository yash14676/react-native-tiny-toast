import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  Easing,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

const position = {
  TOP: 40 + (Platform.OS === 'ios' ? getStatusBarHeight() : 0),
  BOTTOM: -40 - (Platform.OS === 'ios' ? getBottomSpace() : 0),
  CENTER: 0
};

const duration = {
  LONG: 3500,
  SHORT: 2000
};

const ToastContainer = ({
  containerStyle,
  duration = 1000,
  delay = 0,
  animationDuration = 200,
  visible = false,
  position = -40,
  animation = true,
  shadow = true,
  shadowColor,
  showText = true,
  textColor,
  textStyle,
  mask = false,
  maskColor,
  maskStyle,
  imgSource,
  imgStyle,
  loading = false,
  indicatorSize = 'large',
  onHidden,
  onMaskPress,
  indicatorColor= '#fff',
  children
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const opacity = useRef(new Animated.Value(0)).current;
  const animating = useRef(false);
  const hideTimeout = useRef(null);
  const showTimeout = useRef(null);

  useEffect(() => {
    if (isVisible) {
      showTimeout.current = setTimeout(() => show(), delay);
    }

    return () => {
      hide();
    };
  }, [isVisible]);

  useEffect(() => {
    if (visible !== isVisible) {
      if (visible) {
        clearTimeout(showTimeout.current);
        clearTimeout(hideTimeout.current);
        showTimeout.current = setTimeout(() => show(), delay);
      } else {
        hide();
      }
      setIsVisible(visible);
    }
  }, [visible]);

  const show = () => {
    clearTimeout(showTimeout.current);
    if (!animating.current) {
      clearTimeout(hideTimeout.current);
      animating.current = true;
      Animated.timing(opacity, {
        toValue: 1,
        duration: animation ? animationDuration : 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          animating.current = !finished;
          if (duration > 0) {
            hideTimeout.current = setTimeout(() => hide(), duration);
          }
        }
      });
    }
  };

  const hide = () => {
    clearTimeout(showTimeout.current);
    clearTimeout(hideTimeout.current);
    if (!animating.current) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: animation ? animationDuration : 0,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          animating.current = false;
          onHidden && onHidden();
        }
      });
    }
  };

  const renderMaskToast = (children) => (
    <TouchableWithoutFeedback onPress={onMaskPress}>
      <View style={[styles.maskStyle, maskStyle, { backgroundColor: maskColor }]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );

  const offset = position;
  const positionStyle = offset !== 0 ? offset > 0 ? { top: offset } : { bottom: -offset } : { height: '100%' };
  const renderToast = (isVisible || animating.current) ? (
    <View style={[styles.defaultStyle, positionStyle]} pointerEvents='box-none'>
      <Animated.View
        style={[
          styles.containerStyle,
          containerStyle,
          { opacity },
          shadow && styles.shadowStyle,
          shadowColor && { shadowColor }
        ]}
        pointerEvents='none'
      >
        {imgSource && <Image resizeMode='contain' style={imgStyle} source={imgSource} />}
        {loading && <ActivityIndicator color={indicatorColor} size={indicatorSize} />}
        {showText && (
          <Text style={[styles.textStyle, textStyle, textColor && { color: textColor }]}>
            {children}
          </Text>
        )}
      </Animated.View>
    </View>
  ) : null;

  return mask ? renderMaskToast(renderToast) : renderToast;
};


const styles = StyleSheet.create({
  defaultStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 5
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
  maskStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
});

export default ToastContainer;
export { position, duration };
