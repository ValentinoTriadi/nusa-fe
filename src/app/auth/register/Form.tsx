'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { RegisterFormType, registerFormSchema } from '@/type/form/register';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      address: '',
      storeName: '',
      businessId: '',
      businessType: 'produsen_bahan_baku',
      city: '',
      province: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: RegisterFormType) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make an API call to authenticate
      console.log('Register attempt:', values);

      // Redirect to dashboard or home page
      // router.push('/dashboard')
    } catch (error) {
      console.error('Register failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    label="Alamat"
                    error={form.formState.errors.address?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Store Name Field */}
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    label="Nama Toko"
                    error={form.formState.errors.storeName?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    label="Email"
                    error={form.formState.errors.email?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Business ID Field */}
          <FormField
            control={form.control}
            name="businessId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    label="Nomor Induk Berusaha (NIB)"
                    error={form.formState.errors.businessId?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Business Type Field */}
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-3 rounded-sm bg-white p-4 shadow-xs">
                    <label className="text-sm font-medium text-gray-500">
                      Jenis Usaha
                    </label>
                    <div className="space-y-2">
                      <label className="flex cursor-pointer items-center space-x-3">
                        <div className="relative">
                          <input
                            type="radio"
                            value="produsen_bahan_baku"
                            checked={field.value === 'produsen_bahan_baku'}
                            onChange={field.onChange}
                            className="sr-only"
                          />
                          <div
                            className={`h-5 w-5 rounded-full border-2 transition-colors ${
                              field.value === 'produsen_bahan_baku'
                                ? 'border-gray-700 bg-white'
                                : 'border-gray-300 bg-gray-200'
                            }`}
                          >
                            {field.value === 'produsen_bahan_baku' && (
                              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black" />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-900">
                          Produsen Bahan Baku
                        </span>
                      </label>
                      <label className="flex cursor-pointer items-center space-x-3">
                        <div className="relative">
                          <input
                            type="radio"
                            value="produsen_barang_jadi"
                            checked={field.value === 'produsen_barang_jadi'}
                            onChange={field.onChange}
                            className="sr-only"
                          />
                          <div
                            className={`h-5 w-5 rounded-full border-2 transition-colors ${
                              field.value === 'produsen_barang_jadi'
                                ? 'border-gray-700 bg-white'
                                : 'border-gray-300 bg-gray-200'
                            }`}
                          >
                            {field.value === 'produsen_barang_jadi' && (
                              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black" />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-900">
                          Produsen Barang Jadi
                        </span>
                      </label>
                      <label className="flex cursor-pointer items-center space-x-3">
                        <div className="relative">
                          <input
                            type="radio"
                            value="distributor"
                            checked={field.value === 'distributor'}
                            onChange={field.onChange}
                            className="sr-only"
                          />
                          <div
                            className={`h-5 w-5 rounded-full border-2 transition-colors ${
                              field.value === 'distributor'
                                ? 'border-gray-700 bg-white'
                                : 'border-gray-300 bg-gray-200'
                            }`}
                          >
                            {field.value === 'distributor' && (
                              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black" />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-900">Distributor</span>
                      </label>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* City Field */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    label="Kota"
                    error={form.formState.errors.city?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Province Field */}
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    label="Provinsi"
                    error={form.formState.errors.province?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    label="No. Telp"
                    error={form.formState.errors.phoneNumber?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      error={form.formState.errors.password?.message}
                      className="pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 z-10 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6" />
                      ) : (
                        <Eye className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showKonfirmasiPassword ? 'text' : 'password'}
                      label="Konfirmasi Password"
                      error={form.formState.errors.confirmPassword?.message}
                      className="pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowKonfirmasiPassword(!showKonfirmasiPassword)
                      }
                      className="absolute top-1/2 right-3 z-10 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    >
                      {showKonfirmasiPassword ? (
                        <EyeOff className="h-6 w-6" />
                      ) : (
                        <Eye className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Login Link */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Masuk sekarang
              </Link>
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-base font-medium text-white"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                Mendaftar...
              </div>
            ) : (
              'Daftar'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
