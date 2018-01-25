/**
|--------------------------------------------------
| React Navigation Service
| https://github.com/react-navigation/react-navigation/issues/1439#issuecomment-303661539
|--------------------------------------------------

It is hard to dispatch actions from outside of the
parent Navigator. This is a service to help dispatch
actions from side effects in Redux Sagas, but it could
be used anywhere.

In /src/App.js, we've added a ref in <RoutingStack>.

Usage:
// from some/other/component.js
import NavigatorService from "path/to/this/navigator";
 
// Navigate to a route defined in App.js's RoutingStack:
NavigatorService.navigate("Menu");


// Navigate to a nested route:
 NavigatorService.navigateDeep([
  { routeName: "Menu" },
  { routeName: "Dashboard" }
]);
*/

import { NavigationActions } from "react-navigation";

let _container; // eslint-disable-line

function setContainer(container) {
  _container = container;
}

function reset(routeName, params) {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName,
          params
        })
      ]
    })
  );
}

function navigate(routeName, params) {
  _container.dispatch(
    NavigationActions.navigate({
      type: "Navigation/NAVIGATE",
      routeName,
      params
    })
  );
}

function navigateDeep(actions) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName: action.routeName,
          params: action.params,
          action: prevAction
        }),
      undefined
    )
  );
}

function getCurrentRoute() {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute
};
