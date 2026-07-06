import './styles/styles.scss';

import { AppRouter } from './router/AppRouter';
import { AuthInitializer } from '@/features/auth/ui/AuthInitializer';
function App() {
    return (
        <AuthInitializer>
             <AppRouter/>
        </AuthInitializer>
       
    )
    
}

export default App;
