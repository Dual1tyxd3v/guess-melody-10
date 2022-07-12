import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';

type PrivateProps = {
  authStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateProps): JSX.Element {
  const {children , authStatus} = props;
  return (
    authStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}
export default PrivateRoute;
