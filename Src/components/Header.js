import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import ResponsiveText from './ResponsiveText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = props => {
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth:0,
        marginHorizontal:10
      }}>
      {props.leftIcon ? (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name={props.leftIcon} size={25} color={props.textColor} />
        </TouchableOpacity>
      ) : null}
      {props.titleView ? (
        props.titleView()
      ) : (
        <ResponsiveText
          style={{
            color: props.textColor,
            alignSelf: 'center',
            fontSize: props.titleFontSize ? props.titleFontSize : 5,
          }}>
          {props.title}
        </ResponsiveText>
      )}
      {props.rightIcon ? (
        <TouchableOpacity onPress={props.righIconOnPress}>
          <Icon
            name={props.rightIcon}
            size={props.righIconSize ? props.righIconSize : 25}
            color={props.righIconColor}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;
