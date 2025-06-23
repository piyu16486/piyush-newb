import {authSelector} from '@store/auth';
import {useSelector} from 'react-redux';

export function useLoggedInCheck() {
  const isLoggedInState = useSelector(authSelector.getLoggedInState);
  return isLoggedInState;
}
