import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import AuthLayout from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { authService, loginSchema, type LoginInput } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // const onSubmit = async (data: LoginInput) => {
  //   setIsLoading(true);
    
  //   const result = await authService.login(data);
    
  //   setIsLoading(false);
    
  //   if (result.success) {
  //     toast.success('Login successful! Redirecting...');
  //     navigate('/');
  //   } else {
  //     toast.error(result.message || 'Login failed');
  //   }
  // };
const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    
    const result = await authService.login(data);
    
    setIsLoading(false);
    
    if (result.success) {
      toast.success('Login successful! Redirecting...')
      
      // Get the role from localStorage (set by authService)
      const role = localStorage.getItem('userRole');

      // Redirect based on role
      switch (role) {
        case 'ROLE_ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'ROLE_BUYER':
          navigate('/buyer/dashboard');
          break;
        case 'ROLE_VENDOR':
          navigate('/vendor/dashboard');
          break;
        default:
          navigate('/'); // Fallback to home
      }
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="auth-input h-12"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            {/* <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link> */}
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="auth-input h-12 pr-12"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              New to BidBridge?
            </span>
          </div>
        </div>

        <Link to="/register">
          <Button
            type="button"
            className="w-full h-12 text-base font-medium border-border hover:bg-muted"
          >
            Create an Account
          </Button>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Login;
