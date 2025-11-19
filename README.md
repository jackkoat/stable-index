# Stable Index - Next.js 15 Platform

Platform penilaian risiko global yang telah dikonversi dari Vite+React ke Next.js 15 dengan App Router.

## 🚀 Fitur Utama

- **Next.js 15** dengan App Router untuk performa optimal
- **Real-time Dashboard** analisis risiko negara
- **Peta Interaktif Dunia** dengan visualisasi data real-time
- **React Components** yang telah dimigrasi dengan preserve styling
- **Tailwind CSS** dengan white-navy color scheme
- **Supabase Integration** untuk autentikasi dan database
- **Google Maps API** untuk visualisasi geografis
- **PWA Support** dengan manifest.json

## 🛠️ Teknologi Stack

- **Framework:** Next.js 15
- **Routing:** App Router (file-based routing)
- **UI Framework:** React 18.3.1
- **Styling:** Tailwind CSS v3.4.16
- **Backend:** Supabase (Database, Auth, Storage)
- **Charts:** ECharts, Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Maps:** Google Maps API

## 📱 Halaman

- **Home (/)** - Landing page dengan hero section dan stats overview
- **Dashboard (/dashboard)** - Dashboard utama dengan peta interaktif dan data real-time
- **About (/about)** - Informasi tentang platform dan fitur
- **Login (/login)** - Halaman autentikasi dengan Supabase

## 🚀 Deployment

Project siap untuk deployment di **Vercel** dengan konfigurasi otomatis:

1. Repository sudah ter-push ke GitHub
2. `next.config.js` dikonfigurasi untuk production optimization
3. Environment variables tersedia di `.env.local.example`
4. Dependencies dikonfigurasi di `package.json`

### Setup Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi dengan nilai yang sesuai:

```bash
cp .env.local.example .env.local
```

## 📦 Struktur Project

```
stable-index-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── dashboard/page.tsx # Dashboard page
│   ├── login/page.tsx     # Login page
│   ├── components/        # Reusable components
│   └── globals.css        # Global styles
├── lib/                   # Utilities dan konfigurasi
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
├── data/                  # Data management
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🎨 Styling

- **Color Scheme:** White & Navy theme
- **Tailwind Classes:** Kustom utility classes di `globals.css`
- **Component Classes:** `stable-card`, `stable-button-primary`, dll.

## 📊 Database Schema

Menggunakan Supabase dengan:
- Autentikasi user
- Storage untuk file uploads
- Edge functions untuk server-side logic
- Real-time subscriptions

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

Private repository for Stable Index Platform

---

**Stable Index Team** - Platform Penilaian Risiko Global