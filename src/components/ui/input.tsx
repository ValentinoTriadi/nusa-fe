import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

function Input({ className, type, label, error, ...props }: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Initialize hasValue based on initial value or defaultValue
  React.useEffect(() => {
    const initialValue = props.value || props.defaultValue || '';
    setHasValue(String(initialValue).length > 0);
  }, [props.value, props.defaultValue]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input blurred:', e.target.value);
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  const isActive = isFocused || hasValue || Boolean(props.value);

  if (!label) {
    return (
      <div>
        <input
          type={type}
          data-slot="input"
          className={cn(
            'flex h-12 w-full rounded-sm bg-white px-4 py-3 text-base text-gray-900 shadow-xs transition-colors placeholder:text-gray-500',
            'focus:ring-2 focus:ring-orange-500/20 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-orange-500',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          data-slot="input"
          className={cn(
            'peer flex h-16 w-full rounded-sm bg-white px-4 text-base text-gray-900 shadow-xs transition-all duration-200',
            'focus:ring-2 focus:ring-orange-500/20 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder-transparent',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-orange-500',
            isActive ? 'pt-6 pb-2' : 'py-4',
            className,
          )}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <label
          className={cn(
            'pointer-events-none absolute left-4 transition-all duration-200',
            error ? 'text-red-500' : 'text-gray-500',
            isActive
              ? 'top-2 text-xs font-medium'
              : `top-1/2 -translate-y-1/2 text-base ${error ? 'text-red-500' : 'text-gray-500'}`,
          )}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export { Input };
