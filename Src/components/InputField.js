import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputField = props => {
  return (
    <View
      style={[
        styles.textInputStyle,
        props.shadow ? null : null,
        {
          marginTop: props.marginTop ? props.marginTop : wp(6),
          borderRadius: props.borderRadius ? props.borderRadius : 10,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : 'gray',
        },
      ]}>
      {props.leftIcon && (
        <Image
          source={props.leftIcon}
          style={{width: wp(8), height: wp(8), marginLeft: wp(3)}}
          resizeMode={'contain'}></Image>
      )}

      <TextInput
        {...props}
        placeholder={props.placeholder}
        value={props.value}
        maxLength={props.maxLength}
        onFocus={props.onFocus}
        textAlign={props?.textAlign}
        secureTextEntry={props.secureTextEntry?props.secureTextEntry:false}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : '#94959B'
        }
        style={[
          props.customStyles,
          {
            flex: 1,
            marginTop: 0,
            height: props.height ? props.height : 50,
            borderRadius: props.borderRadius ? props.borderRadius : 10,
            paddingLeft: props.paddingLeft ? props.paddingLeft : 20,
            paddingRight: props.paddingRight ? props.paddingRight : 10,
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : 'gray',
          },
        ]}
      />
      {props.secureText && (
        <TouchableOpacity
          style={{paddingRight: wp(1.8)}}
          onPress={props.onPress}>
          <Ionicons
            size={wp(6)}
            color={props.iconColor}
            name={
              props.iconName
                ? props.iconName
                : props.secureTextEntry
                ? 'md-eye-off-outline'
                : 'md-eye-outline'
            }
          />
        </TouchableOpacity>
      )}
      {props.RightText && (
        <Text
          style={{
            color: props.textColor,
            marginRight: wp(3),
          }}>
          {props.RightTextTitle}
        </Text>
      )}
      {props.rightIconName && (
        <TouchableOpacity
          style={{paddingRight: wp(2.8)}}
          onPress={props.righIconOnPress}>
          <Icon
            name={props.rightIconName}
            size={props.righIconSize ? props.righIconSize : 25}
            color={props.righIconColor ? props.righIconColor : '#929292'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default InputField;
const styles = StyleSheet.create({
  textInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});
