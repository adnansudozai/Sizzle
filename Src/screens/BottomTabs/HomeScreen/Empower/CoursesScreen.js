import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Text,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  ResponsiveText,
  Header,
  BottomPopup,
  Images,
} from '../../../../components';
import styles from './styles';
import {courseListDATA, allfiltersHARDCoded} from './dummyArray';
import CheckBox from 'react-native-check-box';

const CourseCard = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardText}>
        <ResponsiveText style={styles.coursetitle}>{item.name}</ResponsiveText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ResponsiveText style={styles.courseSubtitle}>
            {`${item.Videos} Videos`}
          </ResponsiveText>
          <Icon name={'circle-medium'} size={15} color={'#fff'} />
          <ResponsiveText style={styles.courseSubtitle}>
            {`${item.Watched} Watched`}
          </ResponsiveText>
        </View>
      </View>
    </View>
  );
};

const CourseScreen = props => {
  const fitlerRef = useRef(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(
    new Array(allfiltersHARDCoded.length).fill(false),
  );

  const showPopup = () => {
    fitlerRef.current.open();
  };
  const closePopup = () => {
    fitlerRef.current.close();
  };

  const handleFilterChange = position => {
    const updatedCheckedState = selectedFilters.map((item, index) =>
      index === position ? !item : item,
    );
    setSelectedFilters(updatedCheckedState);
  };

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'Empower'}
        textColor={'#000'}
        rightIcon={'tune-vertical'}
        righIconOnPress={showPopup}
      />
      <View style={styles.mainContainer}>
        <View style={styles.courseList}>
          <FlatList
            data={courseListDATA}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('CourseVideosScreen')}
                activeOpacity={0.8}>
                <CourseCard item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
        <BottomPopup ref={fitlerRef} PopupHeight={65}>
          <View style={{flex: 1, paddingHorizontal: 25}}>
            <ResponsiveText
              style={styles.popuptitle}>{`Courses`}</ResponsiveText>
            <View style={styles.popupCourseListContainer}>
              {allfiltersHARDCoded.map((item, i) => {
                return (
                  <View key={item} style={styles.popupCourseListItem}>
                    <CheckBox
                      uncheckedCheckBoxColor="#95969D"
                      checkedCheckBoxColor="#0F33AD"
                      style={{
                        marginBottom: 15,
                      }}
                      onClick={() => handleFilterChange(i)}
                      isChecked={selectedFilters[i]}
                      rightText={item}
                      rightTextStyle={styles.popupCoursetitle}
                      checkedImage={
                        <Image
                          source={Images.isCheckedCustom}
                          style={{height: 18, width: 18}}
                        />
                      }
                      unCheckedImage={
                        <Image
                          source={Images.isUnCheckedCustom}
                          style={{height: 18, width: 18}}
                        />
                      }
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </BottomPopup>
      </View>
    </Container>
  );
};

export default CourseScreen;
