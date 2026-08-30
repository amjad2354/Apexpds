/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <FeaturedProperties />
      <CallToAction />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
