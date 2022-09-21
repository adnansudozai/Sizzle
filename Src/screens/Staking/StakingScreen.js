import React, {useState} from 'react';
import {View, Dimensions, Image, ScrollView} from 'react-native';
import styles from './styles';
import {stakingArray} from './dummyArray';
import Carousel from 'react-native-snap-carousel';
import {Container, ResponsiveText, Header, Button} from '../../components';

const windowWidth = Dimensions.get('window').width;

const StakingScreen = props => {
  const _renderItem = ({item, index}) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.slide}>
        <View style={styles.render}>
          <Image source={item.image} style={styles.image} />
          <View style={{alignSelf: 'center'}}>
            <ResponsiveText style={styles.name}>{item.name}</ResponsiveText>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <ResponsiveText style={styles.price}>{item.price}</ResponsiveText>
              <ResponsiveText style={styles.tokenName}>
                {item.tokenName}
              </ResponsiveText>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <Image source={item.image} style={styles.listImage} />
          <ResponsiveText style={styles.textView}>{item.apy}</ResponsiveText>
        </View>
        <View style={styles.listView}>
          <Image source={item.image} style={styles.listImage} />
          <ResponsiveText style={styles.textView}>
            {item.arcadia}
          </ResponsiveText>
        </View>
        <View
          style={
            item.name == 'SILVER' ? styles.listViewBullur : styles.listView
          }>
          <Image source={item.image} style={styles.listImage} />
          <ResponsiveText style={styles.textView}>{item.bizpad}</ResponsiveText>
        </View>
        <View
          style={
            item.name == 'SILVER' ? styles.listViewBullur : styles.listView
          }>
          <Image source={item.image} style={styles.listImage} />
          <ResponsiveText style={styles.textView}>
            {item.Launchpad}
          </ResponsiveText>
        </View>
        <View
          style={
            item.name == 'PLATINUM' ||
            item.name == 'GOLD' ||
            item.name == 'SILVER'
              ? styles.listViewBullur
              : styles.listView
          }>
          <Image source={item.image} style={styles.listImage} />
          <ResponsiveText style={styles.textView}>
            {item.Bluemoon}
          </ResponsiveText>
        </View>
        <View
          style={
            item.name == 'PLATINUM' ||
            item.name == 'GOLD' ||
            item.name == 'SILVER'
              ? styles.listViewBullur
              : styles.listView
          }>
          <Image source={item.image} style={styles.listImage} />
          <ResponsiveText style={styles.textView}>
            {item.Rewards}
          </ResponsiveText>
        </View>

        <View
          style={
            item.name == 'DIAMOND' ||
            item.name == 'PLATINUM' ||
            item.name == 'GOLD' ||
            item.name == 'SILVER'
              ? styles.listViewBullur
              : styles.listView
          }>
          <Image source={item.image} style={styles.listImage} />
          <ResponsiveText style={styles.textView}>{item.vip}</ResponsiveText>
        </View>
        <Button
          title={'Stack'}
          onPress={() => console.log('call stacking')}
          btnContainer={{backgroundColor: '#fff', marginTop: 15}}
          titleStyle={{color: '#000'}}
        />
      </ScrollView>
    );
  };

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'Stake'}
        textColor={'#000'}
      />
      <View style={styles.mainContainer}>
        <Carousel
          layout={'stack'}
          data={stakingArray}
          renderItem={_renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 20}
        />
      </View>
    </Container>
  );
};

export default StakingScreen;
