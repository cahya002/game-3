/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { GameContainer } from './components/GameContainer';

export default function App() {
  // Register Service Worker for PWA offline caching if supported
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Fallback if SW registration fails in iframe/sandbox
        });
      });
    }
  }, []);

  return <GameContainer />;
}
