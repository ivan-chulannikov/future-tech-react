import LoginForm from '@/features/auth/ui/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <section className="auth section">
            <div className="auth__inner container">
                <div className="auth__preview">
                    <div className="auth__badge">FutureTech Account</div>

                    <div className="auth__preview-body">
                        <h1 className="auth__title">Welcome back to the future of technology</h1>

                        <p className="auth__description">
                            Sign in to save articles, personalize your feed, and continue exploring
                            the latest AI and technology insights.
                        </p>
                    </div>

                    <ul className="auth__features">
                        <li className="auth__feature">Save your favorite posts</li>
                        <li className="auth__feature">Access personalized resources</li>
                        <li className="auth__feature">Continue reading from any device</li>
                    </ul>
                </div>

                <div className="auth__card">
                    <div className="auth__card-header">
                        <p className="auth__eyebrow">Login</p>
                        <h2 className="auth__card-title">Sign in to your account</h2>
                        <p className="auth__card-description">
                            Enter your details below to access your FutureTech profile.
                        </p>
                    </div>

                    <LoginForm />

                    <p className="auth__footer">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="auth__link">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
