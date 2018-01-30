import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import ComingSoon from './ComingSoon';
import LightBox from './LightBox';
import DocumentView from './DocumentView';
import MessageView from './MessageView';

//import AuthLogin from './auth/Login';
//import AuthRegister from './auth/Register';

import Landing from './Landing';
import SignUp from './SignUp';

import ContextMenu from './ContextMenu';
import InvitesView from './Invites';
import Profile from './Profile';
import Feedback from './Feedback';
//import TermsAndConditions from './TermsAndConditions';

import Places from './Places';
import PlacesDetails from './PlacesDetails';

import Passes from './Passes';
import PassesDetails from './PassesDetails';

import Tabs from './Tabs';
//import TabsNew from './TabsNew';

import CameraView from './CameraView';

import OfferAvailView from './OfferAvail';

export function registerScreens() {

  //COMMONS
  Navigation.registerComponent('x.Message.Error', () => ComingSoon);
  Navigation.registerComponent('x.Message.Success', () => ComingSoon);
  Navigation.registerComponent('x.Notification', () => MessageView);
  Navigation.registerComponent('x.Modal.Confirm', () => ComingSoon);
  Navigation.registerComponent('x.Modal.Inform', () => ComingSoon);
  Navigation.registerComponent('x.LightBox', () => LightBox);
  Navigation.registerComponent('x.DocumentView', () => DocumentView);
  //Navigation.registerComponent('x.WebView', () => WebView);


  // LANDING
  Navigation.registerComponent('x.Landing', () => Landing);
  Navigation.registerComponent('x.SignUp', () => SignUp);  

  //Later
  Navigation.registerComponent('x.PrivacyPolicy', () => ComingSoon);
  Navigation.registerComponent('x.TermsOfUse', () => ComingSoon);

  // CONTEXT
  Navigation.registerComponent('x.ContextMenu', () => ContextMenu);
  // CONTEXT MENU OPTIONS
  Navigation.registerComponent('x.Profile', () => Profile);
  Navigation.registerComponent('x.Feedback', () => Feedback);
  Navigation.registerComponent('x.Notifications', () => ComingSoon);
  Navigation.registerComponent('x.Auth.Logout', () => ComingSoon);

  Navigation.registerComponent('x.Places', () => Places);
  Navigation.registerComponent('x.Places.Details', () => PlacesDetails);
  Navigation.registerComponent('x.Places.TermsAndConditions', () => LightBox);
  Navigation.registerComponent('x.Passes', () => Passes);
  Navigation.registerComponent('x.Passes.Details', () => PassesDetails);
  Navigation.registerComponent('x.Passes.OfferAvail', () => OfferAvailView);

  Navigation.registerComponent('x.Tabs', () => ComingSoon);
  Navigation.registerComponent('x.Tabs.NewTab', () => TabsNew);

  Navigation.registerComponent('x.CameraView', () => CameraView);
  Navigation.registerComponent('x.Invites', () => InvitesView);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
