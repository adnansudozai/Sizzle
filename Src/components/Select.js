import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Select = props => {
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  function renderOption(item, childView) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onChangeSelect(item);
          setModalVisible(false);
          setSelected(item);
        }}>
        {childView}
      </TouchableOpacity>
    );
  }

  return (
    <>
      <Pressable
        style={[
          styles.textInputStyle,
          props.shadow ? null : null,
          {
            marginTop: props.marginTop ? props.marginTop : wp(6),
            height: 50,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            backgroundColor: '#F1F1F5',
          },
        ]}
        onPress={() => setModalVisible(true)}>
        {selected ? (
          props.selectedItemView(selected)
        ) : (
          <Text>{props.placeholder}</Text>
        )}
        <Icon name={'menu-down'} size={25} />
      </Pressable>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.headerModal}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Icon name={'chevron-left'} size={25} />
          </TouchableOpacity>
          <Text>{props.placeholder}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setSelected(null);
            }}>
            <Text>{'Cancel'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={props.options}
            renderItem={({item}) =>
              renderOption(item, props.optionItemView(item, selected))
            }
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  headerModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
    paddingBottom: 12,
    marginTop:'20%'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    padding: 10,
  },
  symbolTxt: {
    color: '#222',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  nameTxt: {
    color: '#666',
    fontSize: 14,
  },
  listImage: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 20,
  },
});

export default Select;
