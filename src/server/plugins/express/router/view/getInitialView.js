import { RoutingContext } from 'react-router';
import { Provider } from 'react-redux';

export default function getInitialView(store, renderProps) {
  return (
    <Provider store={store}>
      {() =>
        <RoutingContext {...renderProps} />
      }
    </Provider>
  );
}
