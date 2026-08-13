import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import AuthLayout from '../components/auth/AuthLayout';
import RoleToggle from '../components/auth/RoleToggle';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  authService,
  buyerRegisterSchema,
  vendorRegisterSchema,
  type BuyerRegisterInput,
  type VendorRegisterInput,
} from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'buyer' | 'vendor'>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Buyer form
  const buyerForm = useForm<BuyerRegisterInput>({
    resolver: zodResolver(buyerRegisterSchema),
    defaultValues: {
      organizationType: 'GOVERNMENT',
    },
  });

  // Vendor form
  const vendorForm = useForm<VendorRegisterInput>({
    resolver: zodResolver(vendorRegisterSchema),
  });

  const handleBuyerSubmit = async (data: BuyerRegisterInput) => {
    setIsLoading(true);
    const result = await authService.registerBuyer(data);
    setIsLoading(false);

    if (result.success) {
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } else {
      toast.error(result.message || 'Registration failed');
    }
  };

  const handleVendorSubmit = async (data: VendorRegisterInput) => {
    setIsLoading(true);
    const result = await authService.registerVendor(data);
    setIsLoading(false);

    if (result.success) {
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } else {
      toast.error(result.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join BidBridge to start your procurement journey"
    >
      <RoleToggle role={role} onRoleChange={setRole} />

      {role === 'buyer' ? (
        <form onSubmit={buyerForm.handleSubmit(handleBuyerSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buyer-name">Full Name</Label>
              <Input
                id="buyer-name"
                placeholder="John Doe"
                className="auth-input h-11"
                {...buyerForm.register('name')}
              />
              {buyerForm.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {buyerForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyer-email">Email</Label>
              <Input
                id="buyer-email"
                type="email"
                placeholder="name@gov.in"
                className="auth-input h-11"
                {...buyerForm.register('email')}
              />
              {buyerForm.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {buyerForm.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyer-password">Password</Label>
            <div className="relative">
              <Input
                id="buyer-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className="auth-input h-11 pr-12"
                {...buyerForm.register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {buyerForm.formState.errors.password && (
              <p className="text-xs text-destructive">
                {buyerForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buyer-org">Organization Name</Label>
              <Input
                id="buyer-org"
                placeholder="Ministry of..."
                className="auth-input h-11"
                {...buyerForm.register('organizationName')}
              />
              {buyerForm.formState.errors.organizationName && (
                <p className="text-xs text-destructive">
                  {buyerForm.formState.errors.organizationName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyer-dept">Department</Label>
              <Input
                id="buyer-dept"
                placeholder="IT Department"
                className="auth-input h-11"
                {...buyerForm.register('department')}
              />
              {buyerForm.formState.errors.department && (
                <p className="text-xs text-destructive">
                  {buyerForm.formState.errors.department.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Organization Type</Label>
              <Select
                defaultValue="GOVERNMENT"
                onValueChange={(value) =>
                  buyerForm.setValue('organizationType', value as 'GOVERNMENT' | 'PRIVATE' | 'PSU')
                }
              >
                <SelectTrigger className="auth-input h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GOVERNMENT">Government</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                  <SelectItem value="PSU">PSU</SelectItem>
                </SelectContent>
              </Select>
              {buyerForm.formState.errors.organizationType && (
                <p className="text-xs text-destructive">
                  {buyerForm.formState.errors.organizationType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyer-phone">Contact Phone</Label>
              <Input
                id="buyer-phone"
                placeholder="10-digit number"
                className="auth-input h-11"
                {...buyerForm.register('contactPhone')}
              />
              {buyerForm.formState.errors.contactPhone && (
                <p className="text-xs text-destructive">
                  {buyerForm.formState.errors.contactPhone.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold mt-6" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Register as Buyer'
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={vendorForm.handleSubmit(handleVendorSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Full Name</Label>
              <Input
                id="vendor-name"
                placeholder="Rahul Sharma"
                className="auth-input h-11"
                {...vendorForm.register('name')}
              />
              {vendorForm.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {vendorForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendor-email">Email</Label>
              <Input
                id="vendor-email"
                type="email"
                placeholder="name@company.com"
                className="auth-input h-11"
                {...vendorForm.register('email')}
              />
              {vendorForm.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {vendorForm.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor-password">Password</Label>
            <div className="relative">
              <Input
                id="vendor-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className="auth-input h-11 pr-12"
                {...vendorForm.register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {vendorForm.formState.errors.password && (
              <p className="text-xs text-destructive">
                {vendorForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor-company">Company Name</Label>
            <Input
              id="vendor-company"
              placeholder="TechNova Solutions Pvt Ltd"
              className="auth-input h-11"
              {...vendorForm.register('companyName')}
            />
            {vendorForm.formState.errors.companyName && (
              <p className="text-xs text-destructive">
                {vendorForm.formState.errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor-gst">GST Number</Label>
            <Input
              id="vendor-gst"
              placeholder="27ABCDE1234F5Z7"
              className="auth-input h-11 uppercase"
              {...vendorForm.register('gstNumber')}
            />
            {vendorForm.formState.errors.gstNumber && (
              <p className="text-xs text-destructive">
                {vendorForm.formState.errors.gstNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor-address">Business Address</Label>
            <Input
              id="vendor-address"
              placeholder="Full address including city and state"
              className="auth-input h-11"
              {...vendorForm.register('address')}
            />
            {vendorForm.formState.errors.address && (
              <p className="text-xs text-destructive">
                {vendorForm.formState.errors.address.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold mt-6" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Register as Vendor'
            )}
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
          Sign in
        </Link>
      </p>

      {/* <p className="text-center text-xs text-muted-foreground mt-4">
        By registering, you agree to our{' '}
        <Link to="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p> */}
    </AuthLayout>
  );
};

export default Register;
