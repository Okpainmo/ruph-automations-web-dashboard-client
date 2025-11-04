'use client';

import React, { useEffect } from 'react';
import { HiPlus } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import {
  openRegisterOverlay,
  openUpdateOverlay,
} from '@/app/rtk-base/slices/uiSlice';
import { fetchAllControllers } from '@/app/rtk-base/slices/systemCoreSlice';
import RegisterControllerOverlay from '@/app/components/RegisterControllerOverlay';
import RouteProtector from '@/app/components/RouteProtector';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { getController } from '@/app/rtk-base/slices/systemCoreSlice';
import UpdateControllerOverlay from '@/app/components/UpdateControllerOverlay';

export default function DashboardHome() {
  const dispatch = useAppDispatch();
  const controllers = useAppSelector((s) => s.systemCore.controllers);
  const isLoading = useAppSelector((s) => s.systemCore.isLoading);
  const userData = useAppSelector((s) => s.auth.localStorageUserData);

  useEffect(() => {
    dispatch(fetchAllControllers());
  }, [dispatch]);

  const initials = userData?.name
    ? userData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'A';

  return (
    <RouteProtector>
      <div className='min-h-screen bg-gray-100 flex flex-col pb-[100px]'>
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
              <span className='font-semibold'>{userData?.name || 'Admin'}</span>
              <span className='text-gray-500 text-xs sm:text-[14px]'>
                {userData?.email
                  ? userData.email.length > 15
                    ? `${userData.email.slice(0, 15)}...`
                    : userData.email
                  : 'admin@example.com'}
              </span>
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-lg'>
              {initials}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className='flex-1 px-3 sm:px-6 pt-3 pb-24'>
          <h1 className='text-xl font-bold mb-4'>Controllers</h1>

          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <p className='text-gray-500'>Loading controllers...</p>
            </div>
          ) : controllers.length === 0 ? (
            <div className='flex items-center justify-center py-12'>
              <p className='text-gray-500'>No controllers found.</p>
            </div>
          ) : (
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {controllers.map((sys) => (
                <div
                  key={sys.id}
                  className='bg-white shadow-sm border border-gray-200 rounded-xl p-5 hover:shadow-md transition group'
                >
                  <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-bold mb-1'>
                      {sys.controllerName.slice(0, 15)}...
                    </h2>
                    <HiOutlinePencilSquare
                      onClick={() => {
                        dispatch(getController(sys.id));
                        dispatch(openUpdateOverlay());
                      }}
                      className='text-[20px]'
                    />
                  </div>
                  <p className='text-sm text-gray-600 mb-1'>
                    <span className='font-medium'>ID:</span> {sys.controllerId}
                  </p>
                  <p className='text-sm text-gray-600 mb-1'>
                    <span className='font-medium'>Batch ID:</span> {sys.id}
                  </p>
                  <p className='text-sm text-gray-600 mb-2'>
                    <span className='font-medium'>Owner:</span> {sys.ownerEmail}
                  </p>

                  <div className='text-xs text-gray-700'>
                    <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-blue-500 before:to-blue-700 before:ring-2 before:ring-blue-200 rounded'>
                      <span className='font-semibold mr-1'>Relay 1:</span>
                      <span className='text-gray-600'>
                        {sys.circuitEndPoint_1.slice(0, 25)}...
                      </span>
                    </div>
                    <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-emerald-500 before:to-emerald-700 before:ring-2 before:ring-emerald-200 rounded'>
                      <span className='font-semibold mr-1'>Relay 2:</span>
                      <span className='text-gray-600'>
                        {sys.circuitEndPoint_2.slice(0, 25)}...
                      </span>
                    </div>
                    <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-amber-500 before:to-amber-700 before:ring-2 before:ring-amber-200 rounded'>
                      <span className='font-semibold mr-1'>Relay 3:</span>
                      <span className='text-gray-600'>
                        {sys.circuitEndPoint_3.slice(0, 25)}...
                      </span>
                    </div>
                    <div className='relative pl-6 py-1 before:content-[""] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:rounded-md before:bg-linear-to-br before:from-fuchsia-500 before:to-fuchsia-700 before:ring-2 before:ring-fuchsia-200 rounded'>
                      <span className='font-semibold mr-1'>Relay 4:</span>
                      <span className='text-gray-600'>
                        {sys.circuitEndPoint_4.slice(0, 25)}...
                      </span>
                    </div>
                  </div>

                  <p className='text-[11px] text-gray-400 mt-2'>
                    Created at: {new Date(sys.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
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
        <UpdateControllerOverlay />
      </div>
    </RouteProtector>
  );
}
