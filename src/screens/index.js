import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import ComingSoon from './ComingSoon';

import LightBox from './LightBox';

import AuthLogin from './auth/Login';
//import AuthRegister from './auth/Register';

import Landing from './Landing';
import SignUp from './SignUp';


import ContextMenu from './ContextMenu';
//import TermsAndConditions from './TermsAndConditions';

import Places from './Places';
import PlacesDetails from './PlacesDetails';

import Passes from './Passes';
import PassesDetails from './PassesDetails';

import Tabs from './Tabs';
import TabsNew from './TabsNew';

import CameraView from './CameraView';

import InvitesView from './Invites';

export function registerScreens() {

  //COMMONS
  Navigation.registerComponent('x.Error', () => ComingSoon);
  Navigation.registerComponent('x.Success', () => ComingSoon);
  Navigation.registerComponent('x.Modal.Confirm', () => ComingSoon);
  Navigation.registerComponent('x.Modal.Inform', () => ComingSoon);

  // LANDING
  Navigation.registerComponent('x.Landing', () => Landing);
  Navigation.registerComponent('x.SignUp', () => SignUp);  

  //Later
  Navigation.registerComponent('x.PrivacyPolicy', () => ComingSoon);
  Navigation.registerComponent('x.TermsOfUse', () => ComingSoon);

  // CONTEXT
  Navigation.registerComponent('x.ContextMenu', () => ContextMenu);
  // CONTEXT MENU OPTIONS
  Navigation.registerComponent('x.Profile', () => ComingSoon);
  Navigation.registerComponent('x.Preferences', () => ComingSoon);
  Navigation.registerComponent('x.CustomerCare', () => ComingSoon);
  Navigation.registerComponent('x.Notifications', () => ComingSoon);
  Navigation.registerComponent('x.Auth.Logout', () => ComingSoon);

  Navigation.registerComponent('x.Places', () => Places);
  Navigation.registerComponent('x.Places.Details', () => PlacesDetails);
  Navigation.registerComponent('x.Places.TermsAndConditions', () => LightBox);
  Navigation.registerComponent('x.Passes', () => Passes);
  Navigation.registerComponent('x.Passes.Details', () => PassesDetails);
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
