'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { closeRegisterOverlay } from '@/app/rtk-base/slices/uiSlice';
import { updateController } from '@/app/rtk-base/slices/systemCoreSlice';
import { HiOutlineXMark } from 'react-icons/hi2';
import { closeUpdateOverlay } from '@/app/rtk-base/slices/uiSlice';

export default function UpdateControllerOverlay() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.isUpdateOverlayOpen);
  const isLoading = useAppSelector((s) => s.systemCore.isLoading);
  const selectedController = useAppSelector(
    (s) => s.systemCore.selectedController
  );

  // 🔹 Single form state object
  const [formData, setFormData] = useState(() => ({
    controllerId: selectedController?.controllerId || '',
    circuitEndPoint_1: selectedController?.circuitEndPoint_1 || '',
    circuitEndPoint_2: selectedController?.circuitEndPoint_2 || '',
    circuitEndPoint_3: selectedController?.circuitEndPoint_3 || '',
    circuitEndPoint_4: selectedController?.circuitEndPoint_4 || '',
  }));

  // Prefill form with selected controller data
  // Intentional: sync state with selectedController on change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedController) {
      setFormData({
        controllerId: selectedController.controllerId || '',
        circuitEndPoint_1: selectedController.circuitEndPoint_1 || '',
        circuitEndPoint_2: selectedController.circuitEndPoint_2 || '',
        circuitEndPoint_3: selectedController.circuitEndPoint_3 || '',
        circuitEndPoint_4: selectedController.circuitEndPoint_4 || '',
      });
    }
  }, [selectedController]);

  if (!isOpen || !selectedController) return null;

  function onClose() {
    setFormData({
      controllerId: '',
      circuitEndPoint_1: '',
      circuitEndPoint_2: '',
      circuitEndPoint_3: '',
      circuitEndPoint_4: '',
    });
    dispatch(closeUpdateOverlay());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await dispatch(
        updateController({
          controllerId: selectedController?.id as number,
          updates: formData,
        })
      ).unwrap();
      onClose();
    } catch (_) {
      // handled in thunk
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            Update Controller
          </h3>
          <button onClick={onClose} className='rounded-full cursor-pointer'>
            <HiOutlineXMark className='text-[20px]' />
          </button>
        </div>

        <form onSubmit={onSubmit} className='px-3 py-5 sm:p-6 grid gap-4'>
          <div className='grid gap-1.5'>
            <label className='text-sm font-medium'>Controller ID</label>
            <input
              className='w-full rounded-lg border border-gray-300 bg-gray-100 text-gray-700 px-3 py-2 outline-none cursor-not-allowed'
              value={formData.controllerId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  controllerId: e.target.value,
                }))
              }
              placeholder='controller id'
            />
          </div>

          <div className='grid sm:grid-cols-2 gap-4'>
            {['1', '2', '3', '4'].map((num) => (
              <div key={num} className='grid gap-1.5'>
                <label className='text-sm font-medium'>
                  Relay {num} Endpoint
                </label>
                <input
                  name={`circuitEndPoint_${num}`}
                  className='w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                  value={
                    formData[`circuitEndPoint_${num}` as keyof typeof formData]
                  }
                  onChange={handleChange}
                  placeholder='relay channel end-point'
                  required
                />
              </div>
            ))}
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
              disabled={isLoading}
              className='font-medium cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
