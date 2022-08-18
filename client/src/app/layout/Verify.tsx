import { FunctionComponent } from 'react'
import { useAppSelector } from '../store/configureStore'
import NotLoggedInPage from './NotLoggedInPage'

interface Props {
    component: FunctionComponent
}

function Verify({ component: Component }: Props) {
  const { user } = useAppSelector(state => state.account)
     
  return user ? <Component /> : <NotLoggedInPage />
}

export default Verify