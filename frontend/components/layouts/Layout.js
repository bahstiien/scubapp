import AppFooter from '../ui/AppFooter.js';
import AppHeader from '../ui/AppHeader.js';

import React from 'react';

const Layout = () => {
  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="generator" content={Astro.generator} />
      <meta
        name="description"
        content="Template built with tailwindcss using Tailus blocks v2"
      />
      <title>Tailus astro theme</title>

      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <body className="bg-white dark:bg-gray-900">
        <AppHeader />
        <slot />
        <AppFooter />
      </body>
    </div>
  );
};

export default Layout;
