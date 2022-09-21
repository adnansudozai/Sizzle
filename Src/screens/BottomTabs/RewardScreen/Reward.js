import {Dimensions, StyleSheet, TouchableOpacity, View,FlatList,Image,ScrollView} from 'react-native';
import React, {useCallback, useEffect, useImperativeHandle} from 'react';
import {Container, ResponsiveText, Header,Images} from '../../../components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const {height: SCREEN_HEIGHT} = Dimensions.get('window');

let Data=[
  {
  id:1,
  type:'Play Store Review',
  task:'Leave a genuine review and rate the app!',
  image:Images.Playstoreicon
},
{
  id:2,
  type:'App Store Review',
  task:'Leave a genuine review and rate the app!',
  image:Images.appstore

},
{
  id:3,
  type:'Instagram #1',
  task:'Like, Comment and Share this post on your Instagram story',
  image:Images.Instagram

},
{
  id:3,
  type:'Instagram #2',
  task:'Like, Comment and Share this post!',
  image:Images.Instagram

},
{
  id:4,
  type:'Twitter',
  task:'Like, Comment Retweet and Share this tweet',
  image:Images.twitter

}
,{
  id:5,
  type:'Linkedin',
  task:'Like, Comment and Share this post!',
  image:Images.linkdin
}

]
let data = [
  {
    id: 1,
    image:
      'https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296__340.jpg',
  },
  {
    id: 2,
    image:
      'https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296__340.jpg',
  },
  {
    id: 3,
    image:
      'https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631293__340.jpg',
  },
];
const BottomSheet = (props) => {

  const renderoffer = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.slide}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.topImage}
        />
      </TouchableOpacity>
    );
  };

  const renderItem=({item,index})=>{
    return(
       
            <TouchableOpacity style={styles.mainbtn}>
                <Image source={item.image} style={styles.imageview} resizeMode='contain'/>
                <View style={styles.textview}>
                <ResponsiveText style={styles.texttype}>
            {item.type}
          </ResponsiveText>

          <ResponsiveText style={styles.tasktext}>
            {item.task}
          </ResponsiveText>
                </View>

                <TouchableOpacity hitSlop={{left:10,top:10,right:10,bottom:10}} style={{borderWidth:0,justifyContent:'center',width:wp(10)}}>
            <Icon name="dots-vertical" size={35} color="#000" style={{marginRight:10,}} />

                </TouchableOpacity>
            </TouchableOpacity>
                    
                 
    )
}
  return (
   <Container backgroundColor={'white'}>
 <ScrollView>
      <View style={styles.promotionCard}>
          <FlatList
            contentContainerStyle={{marginLeft: 20}}
            horizontal={true}
            data={data}
            renderItem={renderoffer}
            keyExtractor={item => item.id}
          />
        </View>
    <View style={styles.mainview}>
    <ResponsiveText style={styles.texttodo}>
            {'Tasks to do:'}
          </ResponsiveText>
          <TouchableOpacity>
          <ResponsiveText style={styles.texttodo}>
            {'Rule:'}
          </ResponsiveText>
          
          </TouchableOpacity>
    </View>
<View style={{ marginBottom:hp(2)}}>
    <FlatList
                    data={Data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                   
                
                />
</View>
</ScrollView>
   </Container>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
    
  },
  mainview:{
    borderWidth:0,
    marginTop:hp(2),
    marginHorizontal:wp(6),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingRight:5,
  
    
  },
  promotionCard: {
    marginTop:hp(5),

  },
  slide: {
    width: wp(100),
    height: hp(15),
  },
  topImage: {
    width: '90%',
    resizeMode: 'cover',
    borderRadius: 10,
    height: 100,
  },
  texttodo:{
    borderWidth:0,
    fontWeight:'bold',
    fontSize:6,
    color:'black'
  },
  texttype:{
    borderWidth:0,
    fontWeight:'bold',
    fontSize:4,
    color:'black'
  },
  tasktext:{
    borderWidth:0,
    fontWeight:'bold',
    fontSize:3,
    color:'gray'
  },
  mainbtn:{
    borderWidth:2,
    flexDirection:'row',
    marginHorizontal:wp(6),
    borderRadius:10,
    marginTop:10,
    padding:10,
    borderColor:'gray',
   
 
  },
  imageview:{
    width:wp(15),
    height:hp(8)
  },
  textview:{
borderWidth:0,
width:wp(56),
marginLeft:10,
justifyContent:'center'
  }
});

export default BottomSheet;
