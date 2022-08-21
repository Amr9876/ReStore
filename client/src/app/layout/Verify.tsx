import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../store/configureStore'
import NotLoggedInPage from './NotLoggedInPage'

interface Props {
    component: FunctionComponent;
    roles?: string[];
}

function Verify({ component: Component, roles }: Props) {
  const { user } = useAppSelector(state => state.account)
  const navigate = useNavigate();
     
  if (!user) return <NotLoggedInPage />

  if (roles && !roles?.some(r => user.roles?.includes(r))) {
    toast.error('You are not authorized to access this page')
    navigate('/catalog');
  }

  return <Component />
}

export default Verify