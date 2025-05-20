import React, { useEffect, useState } from 'react';

interface User {
  username: string;
}

export default function ProfileSection() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="pt-[51px] md:flex md:items-center md:gap-[50px] md:py-[50px]">
      {/* <div className="w-[150px] h-[150px] m-auto md:m-0 rounded-full bg-white"></div> */}
      <h1 className="pt-[32px] md:pt-0 text-white text-[40px] font-bitter font-[400] leading-[120%] text-center">
        {user?.username}
      </h1>
    </div>
  );
} 