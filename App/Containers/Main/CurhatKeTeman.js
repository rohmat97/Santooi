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

import API from '../../Services/Api';

import TokenRedux from '../../Redux/Authentication/TokenRedux';
import { bindActionCreators } from 'redux';
import { RequestFriends } from './CurhatKeTeman/RequestFriends';
import { HistoryCall } from './CurhatKeTeman/HistoryCall';

const api = API.create();
function CurhatKeTeman(props) {
  const {navigation, token} = props;
  const {pop} = navigation;
  const [page, SetPage ] =useState('Chats')
  // const [conselingCode, setConselingCode] = useState(false);
  // const [password, setPassword] = useState('');
  // const [errorPassword, setErrorPassword] = useState();
  // const [secureTextEntry, setSecureTextEntry] = useState(true);
  // const [visible, setVisible] = useState(false);
  const [listHistoryCall, setlistHistoryCall] = useState([])

  const [listRequestFriends, setlistRequestFriends] = useState([])
  let x = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const InitiatorAgora = async () => {
    this.rtmEngine = new RtmEngine();
    await this.rtmEngine.createClient('4ede35933b9e4e009c0522f13c42f778');
    await this.rtmEngine?.login({uid: 'santooi'});
    await this.rtmEngine?.joinChannel('rd');
  };
  
  const GetRequestFriends =() =>{
    api.listContact({
      token: token.data.access_token,
      request: '?&request_follow=1'
    }).then((success) => {
      console.log(`success`, success.data.data.rows)
      setlistRequestFriends(success.data.data.rows)
    })
    .catch((err) => {
      // console.log('err', err);
    });
  }

  const GetHistoryCall =() =>{
    api.getHistoryCall({
      token: token.data.access_token,
      page: '1',
      limit: '50'
    }).then((success) => {
      setlistHistoryCall(success.data.data.rows)
    })
    .catch((err) => {
      // console.log('err', err);
    });
  }

  useEffect(() => {
    InitiatorAgora();
    GetHistoryCall()
    GetRequestFriends()
  }, []);

  switch (page) {
    case 'Chats':
      return <Chats props={props} page={page} SetPage={SetPage} listRequestFriends={listRequestFriends}/>
      break;
    case 'Contacts':
      return <ListContact props={props} page={page} SetPage={SetPage} listHistoryCall={listHistoryCall} listRequestFriends={listRequestFriends}/>
      break;
    case 'HistoryCalls':
      return <HistoryCall props={props} page={page} SetPage={SetPage} token={token} listRequestFriends={listRequestFriends} GetHistoryCall={GetHistoryCall}/>
      break;
    case 'Request':
      return <RequestFriends props={props} page={page} SetPage={SetPage} token={token} listRequestFriends={listRequestFriends} GetRequestFriends={GetRequestFriends}/>
      break;
    default:
      return <CustomBottomTab2 page={page} SetPage={SetPage} />
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
