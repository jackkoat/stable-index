'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen stable-gradient">
        <Navigation />
        
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-stable-navy-800 mb-4">
                Tentang Stable Index
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Platform penilaian risiko global yang menyediakan analisis real-time untuk stabilitas negara dengan data komprehensif dan visualisasi interaktif.
              </p>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="stable-card p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-stable-navy-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-stable-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-stable-navy-800">Misi Kami</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menyediakan penilaian risiko negara yang akurat dan real-time untuk membantu pengambilan keputusan yang lebih baik dalam dunia yang terus berubah. Kami percaya bahwa informasi yang transparan dan mudah dipahami adalah kunci untuk menciptakan dunia yang lebih stabil.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="stable-card p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-stable-navy-800">Visi Kami</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform terdepan dalam penilaian risiko global yang dipercaya oleh pemerintah, organisasi internasional, dan individu untuk membuat keputusan strategis yang berdampak positif bagi stabilitas dunia.
                </p>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold text-stable-navy-800 mb-8 text-center">
                Fitur Utama Platform
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stable-card p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-stable-navy-800 mb-2">
                    Analisis Data Real-time
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor perubahan stabilitas negara secara langsung dengan pembaruan data yang berkelanjutan.
                  </p>
                </div>

                <div className="stable-card p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-stable-navy-800 mb-2">
                    Visualisasi Interaktif
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Jelajahi data melalui peta dunia interaktif dan grafik yang mudah dipahami.
                  </p>
                </div>

                <div className="stable-card p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-stable-navy-800 mb-2">
                    Prediksi dan Analisis
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Dapatkan insight mendalam dan prediksi berdasarkan pola data historis dan tren global.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="stable-card p-8">
                <h2 className="text-2xl font-semibold text-stable-navy-800 mb-4">
                  Hubungi Kami
                </h2>
                <p className="text-gray-600 mb-6">
                  Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar dari Anda.
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="mailto:contact@stableindex.com" 
                    className="stable-button-primary"
                  >
                    Kirim Email
                  </a>
                  <a 
                    href="#" 
                    className="stable-button-secondary"
                  >
                    Lihat Dokumentasi
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}