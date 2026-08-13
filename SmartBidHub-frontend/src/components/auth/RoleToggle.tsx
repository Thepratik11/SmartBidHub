import { cn } from '../lib/utils';

interface RoleToggleProps {
  role: 'buyer' | 'vendor';
  onRoleChange: (role: 'buyer' | 'vendor') => void;
}

const RoleToggle = ({ role, onRoleChange }: RoleToggleProps) => {
  return (
    <div className="flex p-1 bg-muted rounded-lg mb-6">
      <button
        type="button"
        onClick={() => onRoleChange('buyer')}
        className={cn(
          "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200",
          role === 'buyer'
            ? "bg-primary text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Buyer
      </button>
      <button
        type="button"
        onClick={() => onRoleChange('vendor')}
        className={cn(
          "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200",
          role === 'vendor'
            ? "bg-primary text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Vendor
      </button>
    </div>
  );
};

export default RoleToggle;
