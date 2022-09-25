import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Playground = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  const [isLoading, setIsLoading] = useState(false);
  const [slugy, setSlugy] = useState(null);

  if (typeof slug === 'string') {
    setSlugy(true);
  }

  useEffect(() => {
    // Load some data
    setIsLoading(false);
    sayHello();
  }, []);

  function sayHello() {
    console.log('hello');
    console.log(slug);
  }

  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <p> Hello </p>
    </div>
  );
};

export default Playground;
