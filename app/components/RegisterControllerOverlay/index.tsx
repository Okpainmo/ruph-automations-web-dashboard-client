"use client";

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { closeRegisterOverlay } from '@/app/rtk-base/slices/uiSlice';
import { registerController } from '@/app/rtk-base/slices/systemCoreSlice';
import { HiOutlineXMark } from 'react-icons/hi2';

export default function RegisterControllerOverlay() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.isRegisterOverlayOpen);
  const isRegistering = useAppSelector((s) => s.systemCore.isRegistering);

  const [controllerId, setControllerId] = useState('');
  const [relay1, setRelay1] = useState('');
  const [relay2, setRelay2] = useState('');
  const [relay3, setRelay3] = useState('');
  const [relay4, setRelay4] = useState('');

  if (!isOpen) return null;

  function onClose() {
    // Reset form on close
    setControllerId('');
    setRelay1('');
    setRelay2('');
    setRelay3('');
    setRelay4('');
    dispatch(closeRegisterOverlay());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await dispatch(
        registerController({
          controllerId,
          circuitEndPoint_1: relay1,
          circuitEndPoint_2: relay2,
          circuitEndPoint_3: relay3,
          circuitEndPoint_4: relay4,
        })
      ).unwrap();
      onClose();
    } catch (_) {
      // Error toast handled in thunk
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-3'>
      {/* Glassmorphic dark backdrop */}
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Form card */}
      <div className='relative w-full sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-2xl border border-white/10 bg-gray-100 shadow-2xl'>
        <div className='px-3 py-5 sm:px-6 border-b border-gray-300 flex items-center justify-between'>
          <h3 className='text-base sm:text-lg font-semibold'>
            Register New Controller
          </h3>
          <button onClick={onClose} className='rounded-full cursor-pointer'>
            <HiOutlineXMark className='text-[20px]' />
          </button>
        </div>
        <form onSubmit={onSubmit} className='px-3 py-5 sm:p-6 grid gap-4'>
          <div className='grid gap-1.5'>
            <label className='text-sm font-medium'>Controller ID</label>
            <input
              className='w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
              value={controllerId}
              onChange={(e) => setControllerId(e.target.value)}
              placeholder='e.g. CTRL-0007'
              required
            />
          </div>

          <div className='grid sm:grid-cols-2 gap-4'>
            <div className='grid gap-1.5'>
              <label className='text-sm font-medium'>Relay 1 Endpoint</label>
              <input
                className='w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                value={relay1}
                onChange={(e) => setRelay1(e.target.value)}
                placeholder='relay_channel_1'
                required
              />
            </div>
            <div className='grid gap-1.5'>
              <label className='text-sm font-medium'>Relay 2 Endpoint</label>
              <input
                className='w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                value={relay2}
                onChange={(e) => setRelay2(e.target.value)}
                placeholder='relay_channel_2'
                required
              />
            </div>
            <div className='grid gap-1.5'>
              <label className='text-sm font-medium'>Relay 3 Endpoint</label>
              <input
                className='w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                value={relay3}
                onChange={(e) => setRelay3(e.target.value)}
                placeholder='relay_channel_3'
                required
              />
            </div>
            <div className='grid gap-1.5'>
              <label className='text-sm font-medium'>Relay 4 Endpoint</label>
              <input
                className='w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                value={relay4}
                onChange={(e) => setRelay4(e.target.value)}
                placeholder='relay_channel_4'
                required
              />
            </div>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='font-medium cursor-pointer px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isRegistering}
              className='font-medium cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

