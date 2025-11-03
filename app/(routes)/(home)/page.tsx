'use client';

import React from 'react';
import { HiPlus } from 'react-icons/hi2';
import { useAppDispatch } from '@/app/rtk-base/store';
import { openRegisterOverlay } from '@/app/rtk-base/slices/uiSlice';
import RegisterControllerOverlay from '@/app/components/RegisterControllerOverlay';
import RouteProtector from '@/app/components/RouteProtector';

const MOCK_ADMIN = {
  name: 'Administrator  ',
  email: 'okpainmoandrew@gmail.com',
};

const MOCK_SYSTEMS = [
  {
    id: 2,
    controllerId: 'CTRL-0002',
    ownerEmail: 'user@example.com',
    circuitEndPoint_1: 'relay_channel_1',
    circuitEndPoint_2: 'relay_channel_2',
    circuitEndPoint_3: 'relay_channel_3',
    circuitEndPoint_4: 'relay_channel_4',
    controllerName: 'Main Living Room Controller',
    createdAt: '2025-11-03T13:33:32.655Z',
  },
  {
    id: 1,
    controllerId: 'CTRL-0001',
    ownerEmail: 'okpainmoandrew@gmail.com',
    circuitEndPoint_1: 'relay_channel_1',
    circuitEndPoint_2: 'relay_channel_2',
    circuitEndPoint_3: 'relay_channel_3',
    circuitEndPoint_4: 'relay_channel_4',
    controllerName: 'Outdoor Garden Controller',
    createdAt: '2025-11-03T13:15:28.616Z',
  },
  {
    id: 3,
    controllerId: 'CTRL-0002',
    ownerEmail: 'user@example.com',
    circuitEndPoint_1: 'relay_channel_1',
    circuitEndPoint_2: 'relay_channel_2',
    circuitEndPoint_3: 'relay_channel_3',
    circuitEndPoint_4: 'relay_channel_4',
    controllerName: 'Main Living Room Controller',
    createdAt: '2025-11-03T13:33:32.655Z',
  },
  {
    id: 4,
    controllerId: 'CTRL-0001',
    ownerEmail: 'okpainmoandrew@gmail.com',
    circuitEndPoint_1: 'relay_channel_1',
    circuitEndPoint_2: 'relay_channel_2',
    circuitEndPoint_3: 'relay_channel_3',
    circuitEndPoint_4: 'relay_channel_4',
    controllerName: 'Outdoor Garden Controller',
    createdAt: '2025-11-03T13:15:28.616Z',
  },
  {
    id: 5,
    controllerId: 'CTRL-0002',
    ownerEmail: 'user@example.com',
    circuitEndPoint_1: 'relay_channel_1',
    circuitEndPoint_2: 'relay_channel_2',
    circuitEndPoint_3: 'relay_channel_3',
    circuitEndPoint_4: 'relay_channel_4',
    controllerName: 'Main Living Room Controller',
    createdAt: '2025-11-03T13:33:32.655Z',
  },
  {
    id: 6,
    controllerId: 'CTRL-0001',
    ownerEmail: 'okpainmoandrew@gmail.com',
    circuitEndPoint_1: 'relay_channel_1',
    circuitEndPoint_2: 'relay_channel_2',
    circuitEndPoint_3: 'relay_channel_3',
    circuitEndPoint_4: 'relay_channel_4',
    controllerName: 'Outdoor Garden Controller',
    createdAt: '2025-11-03T13:15:28.616Z',
  },
];

export default function DashboardHome() {
  const dispatch = useAppDispatch();
  const initials = MOCK_ADMIN.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <RouteProtector>
      <div className='min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex flex-col'>
        {/* Top Navbar */}
        <nav className='flex items-center justify-between bg-white/80 backdrop-blur border-b border-gray-200 px-3 sm:px-6 py-2 sticky top-0 z-10'>
          {/* Brand */}
          <div className='flex flex-col font-bold text-[18px] leading-tight'>
            <span>Ruph</span>
            <span>Automations</span>
          </div>

          {/* Admin Info */}
          <div className='flex items-center gap-2'>
            <div className='flex flex-col text-right text-sm leading-tight'>
              <span className='font-semibold'>{MOCK_ADMIN.name}</span>
              <span className='text-gray-500 text-xs sm:text-[14px]'>
                {MOCK_ADMIN.email.slice(0, 15)}...
              </span>
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-lg'>
              {initials}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className='flex-1 px-3 sm:px-6 pt-3 sm:pt-5 pb-24'>
          <h1 className='text-xl font-bold mb-4'>Controllers</h1>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {MOCK_SYSTEMS.map((sys) => (
              <div
                key={sys.id}
                className='bg-white shadow-sm border border-gray-200 rounded-xl p-5 hover:shadow-md transition group'
              >
                <h2 className='text-lg font-bold mb-1'>{sys.controllerName}</h2>
                <p className='text-sm text-gray-600 mb-1'>
                  <span className='font-medium'>ID:</span> {sys.controllerId}
                </p>
                <p className='text-sm text-gray-600 mb-2'>
                  <span className='font-medium'>Owner:</span> {sys.ownerEmail}
                </p>

                <div className='text-xs text-gray-700'>
                  <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-blue-500 before:to-blue-700 before:ring-2 before:ring-blue-200 rounded'>
                    <span className='font-semibold mr-1'>Relay 1:</span>
                    <span className='text-gray-600'>
                      {sys.circuitEndPoint_1}
                    </span>
                  </div>
                  <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-emerald-500 before:to-emerald-700 before:ring-2 before:ring-emerald-200 rounded'>
                    <span className='font-semibold mr-1'>Relay 2:</span>
                    <span className='text-gray-600'>
                      {sys.circuitEndPoint_2}
                    </span>
                  </div>
                  <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-amber-500 before:to-amber-700 before:ring-2 before:ring-amber-200 rounded'>
                    <span className='font-semibold mr-1'>Relay 3:</span>
                    <span className='text-gray-600'>
                      {sys.circuitEndPoint_3}
                    </span>
                  </div>
                  <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-fuchsia-500 before:to-fuchsia-700 before:ring-2 before:ring-fuchsia-200 rounded'>
                    <span className='font-semibold mr-1'>Relay 4:</span>
                    <span className='text-gray-600'>
                      {sys.circuitEndPoint_4}
                    </span>
                  </div>
                </div>

                <p className='text-[11px] text-gray-400 mt-2'>
                  Created at: {new Date(sys.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </main>
        {/* Floating action button */}
        <button
          onClick={() => dispatch(openRegisterOverlay())}
          className='fixed bottom-6 right-6 z-20 p-4 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition'
          aria-label='Register Controller'
          title='Register Controller'
        >
          <HiPlus className='w-6 h-6' />
        </button>

        {/* Overlay mount */}
        <RegisterControllerOverlay />
      </div>
    </RouteProtector>
  );
}
