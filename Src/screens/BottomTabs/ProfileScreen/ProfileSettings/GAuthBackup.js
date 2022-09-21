import React, {useState} from 'react';
import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import QRCode from 'react-native-qrcode-svg';
import {
  Container,
  ResponsiveText,
  Header,
  GradientButton,
} from '../../../../components';
import styles from './styles';

const GAuthBackup = props => {
  const [backupkey, setBackupKey] = useState('0xD47B9DDC6DF64C36...');

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        title={'Backup Key'}
        leftIcon={'chevron-left'}
        textColor={'#000'}
      />
      <View style={[styles.mainContainer]}>
        <View
          style={{
            marginTop: hp(6),
            paddingHorizontal: 20,
          }}>
          <ResponsiveText
            style={
              styles.securityInfoText
            }>{`Account security Backup lorem5 Account security Backup Account security BackupAccount security BackupAccount security Backup `}</ResponsiveText>
          <View style={{alignItems: 'center', marginVertical: hp(3)}}>
            <QRCode value={backupkey} size={170} />
          </View>
          <View style={styles.backUpkeyCopyCard}>
            <ResponsiveText
              style={styles.backUpkeyText}>{`XFS3CSDFS88FS`}</ResponsiveText>
            <ResponsiveText
              style={[
                styles.backUpkeyText,
                {color: '#4674c3'},
              ]}>{`Copy`}</ResponsiveText>
          </View>
          <GradientButton
            onPress={() => {}}
            title={'Set Up'}
            titleStyle={{fontSize: 3.5}}
            btnContainer={{
              borderRadius: 15,
              marginTop: hp(24),
            }}
            gradientColor={['#163272', '#4674c3']}
            shadowColor="#BCC9E4"
          />
        </View>
      </View>
    </Container>
  );
};

export default GAuthBackup;
