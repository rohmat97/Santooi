import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import RtmEngine from 'agora-react-native-rtm';
import {TemplateBackground} from '../../Components/TemplateBackground';
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles';
import {Screen} from '../../Transforms/Screen';
import {connect} from 'react-redux';
import Images from '../../Themes/Images';
import RoundedButton from '../../Components/RoundedButton';
import {Fonts, Colors, Metrics} from '../../Themes/';
import {CustomBottomTab2} from '../../Components/CustomBottomTab2';
import {Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Chats } from './CurhatKeTeman/Chats';
import ListContact from './CurhatKeTeman/ListContact';

import TokenRedux from '../../Redux/Authentication/TokenRedux';
import { bindActionCreators } from 'redux';

function CurhatKeTeman(props) {
  const {navigation} = props;
  const {pop} = navigation;
  const [page, SetPage ] =useState('Chats')
  const [conselingCode, setConselingCode] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [visible, setVisible] = useState(false);

  let x = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const InitiatorAgora = async () => {
    this.rtmEngine = new RtmEngine();
    await this.rtmEngine.createClient('4ede35933b9e4e009c0522f13c42f778');
    await this.rtmEngine?.login({uid: 'santooi'});
    await this.rtmEngine?.joinChannel('rd');
  };
  useEffect(() => {
    InitiatorAgora();
  }, []);
  switch (page) {
    case 'Chats':
      return <Chats props={props} page={page} SetPage={SetPage}/>
      break;
    case 'Contacts':
      return <ListContact  props={props} page={page} SetPage={SetPage} />
      break;
    default:
      return  <CustomBottomTab2 page={page} SetPage={SetPage}/>
      break;
  }
  
}
const mapStateToProps = (state) => {
  return {
    token: state.token.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux), dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(CurhatKeTeman);
