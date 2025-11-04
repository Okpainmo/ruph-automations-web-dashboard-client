"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { handleLogin } from '@/app/rtk-base/slices/authSlice';

export default function LogInScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector((s) => s.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await dispatch(handleLogin({ email, password })).unwrap();
      router.push('/');
    } catch (_) {
      // error toast handled in thunk
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 pt-[150px] md:pt-[200px] px-3'>
      <div className='w-full sm:w-[400px] rounded-2xl border border-gray-200 bg-white shadow-xl mx-auto'>
        <div className='px-6 py-5 border-b border-gray-200'>
          <div className='flex flex-col font-bold text-[18px] leading-tight'>
            <span>Ruph</span>
            <span>Automations</span>
          </div>{' '}
          <p className='text-sm text-gray-500 mt-1'>Admin Sign-in</p>
        </div>

        <form onSubmit={onSubmit} className='p-6 grid gap-4'>
          <div className='grid gap-1.5'>
            <label className='text-sm font-medium'>Email</label>
            <input
              type='email'
              className='w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              required
            />
          </div>
          <div className='grid gap-1.5'>
            <label className='text-sm font-medium'>Password</label>
            <input
              type='password'
              className='w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              required
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='cursor-pointer mt-2 w-full rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
