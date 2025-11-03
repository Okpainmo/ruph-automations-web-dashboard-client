"use client";

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { closeRegisterOverlay } from '@/app/rtk-base/slices/uiSlice';

export default function RegisterControllerOverlay() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.isRegisterOverlayOpen);

  const [controllerId, setControllerId] = useState('');
  const [relay1, setRelay1] = useState('');
  const [relay2, setRelay2] = useState('');
  const [relay3, setRelay3] = useState('');
  const [relay4, setRelay4] = useState('');

  if (!isOpen) return null;

  function onClose() {
    dispatch(closeRegisterOverlay());
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: hook to API register endpoint when available
    console.log({ controllerId, relay1, relay2, relay3, relay4 });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Glassmorphic dark backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Form card */}
      <div className="relative w-[92%] max-w-xl rounded-2xl border border-white/10 bg-neutral-100/90 dark:bg-neutral-900/80 shadow-2xl">
        <div className="px-5 sm:px-6 py-4 border-b border-black/10/5 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold">Register New Controller</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm bg-neutral-800 text-white hover:bg-black/80"
          >
            Close
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-5 sm:p-6 grid gap-4">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Controller ID</label>
            <input
              className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={controllerId}
              onChange={(e) => setControllerId(e.target.value)}
              placeholder="e.g. CTRL-0007"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Relay 1 Endpoint</label>
              <input
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={relay1}
                onChange={(e) => setRelay1(e.target.value)}
                placeholder="relay_channel_1"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Relay 2 Endpoint</label>
              <input
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={relay2}
                onChange={(e) => setRelay2(e.target.value)}
                placeholder="relay_channel_2"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Relay 3 Endpoint</label>
              <input
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={relay3}
                onChange={(e) => setRelay3(e.target.value)}
                placeholder="relay_channel_3"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Relay 4 Endpoint</label>
              <input
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={relay4}
                onChange={(e) => setRelay4(e.target.value)}
                placeholder="relay_channel_4"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

