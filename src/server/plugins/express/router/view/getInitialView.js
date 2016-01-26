export default function getInitialView(store, renderProps) {
  return (
    <Provider store={store}>
      {() =>
        <RoutingContext {...renderProps} />
      }
    </Provider>
  );
}
