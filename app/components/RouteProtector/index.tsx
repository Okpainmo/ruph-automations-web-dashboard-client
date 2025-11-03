'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

type RouteProtectorProps = {
  children: ReactNode;
};

const RouteProtector = ({ children }: RouteProtectorProps) => {
  const router = useRouter();

  useEffect(() => {
    console.log('RouteProtector useEffect executed');
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenSetTime = localStorage.getItem('accessTokenSetTime');

    if (!accessToken) {
      toast.dismiss();
      toast.error('please log in!', { duration: 4000 });
      localStorage.clear();
      router.push('/log-in');
      return;
    }

    if (accessTokenSetTime) {
      const fiftyFiveMinutesInMilliseconds = 3300000;
      const currentTimeInMilliseconds = Date.now();
      const durationSinceTokenWasSet =
        currentTimeInMilliseconds - Number(accessTokenSetTime);

      if (durationSinceTokenWasSet > fiftyFiveMinutesInMilliseconds) {
        toast.dismiss();
        toast.error('please log in!', { duration: 4000 });
        localStorage.clear();
        router.push('/log-in');
      }
    } else {
      localStorage.clear();
      router.push('/log-in');
      toast.error('please log in!', { duration: 4000 });
      console.log('accessTokenSetTime is likely missing from local storage');
    }
  }, [router]);

  return <>{children}</>;
};

export default RouteProtector;
