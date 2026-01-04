# 🎵 Smoke Stream v2.0

> A hyper-visual, generative audio experience powered by **Suno AI**, **Three.js**, and **Next.js 14**

![Version](https://img.shields.io/badge/version-2.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green)

## ✨ Features

### 🎨 Visual Experience
- **Reactive 3D Nebula**: 2,000+ particles that respond to real-time audio frequencies
- **Multiple Visualization Modes**: Nebula, Bars, Waveform, Spectrum, and Particles
- **Dynamic Color Themes**: Purple, Cyan, Neon, Dark, and Rainbow themes
- **Audio-Reactive Scaling**: Particles scale and rotate based on audio intensity
- **Smooth Animations**: Framer Motion-powered transitions and interactions

### 🎵 Audio Features
- **Suno AI Integration**: Seamlessly streams high-quality AI-generated music
- **Advanced Audio Analysis**: Real-time frequency analysis with bass, mid, and treble bands
- **Playback Controls**: Play, pause, next, previous, seek, volume control
- **Repeat Modes**: Off, One, All - full playlist control
- **Shuffle Support**: Randomize your listening experience
- **Volume Control**: Precise volume adjustment with mute toggle

### 🎛️ User Interface
- **Glassmorphic Design**: Modern frosted glass UI with backdrop blur
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Controls**: Keyboard shortcuts and touch-friendly buttons
- **Real-time Visualizer**: Canvas-based frequency visualization
- **Playlist Manager**: Browse, search, and filter tracks by genre
- **Settings Panel**: Customize visualizer behavior and appearance
- **Now Playing Card**: Beautiful track information display

### ⚡ Performance
- **Optimized Rendering**: Efficient Three.js particle system
- **Code Splitting**: Automatic Next.js code splitting
- **Image Optimization**: Responsive image loading from CDN
- **Lazy Loading**: Components load on demand
- **Production Build**: Optimized for speed and bundle size

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/smoke-stream.git
cd smoke-stream

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎮 Controls

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `N` | Next Track |
| `P` | Previous Track / Toggle Playlist |
| `S` | Toggle Settings |
| `V` | Toggle Visualizer |
| `M` | Mute/Unmute |

### Mouse Controls
- **Click** on the progress bar to seek
- **Drag** the volume slider to adjust volume
- **Click** track names in the playlist to jump to that track
- **Hover** over buttons for visual feedback

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### 3D & Animation
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for React Three Fiber
- **Framer Motion** - Animation library

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### State Management
- **Zustand** - Lightweight state management
- **React Hooks** - Built-in React state management

### Audio
- **Web Audio API** - Browser audio processing
- **HTML5 Audio** - Audio playback

## 📁 Project Structure

```
smoke-stream/
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── NebulaScene.tsx       # 3D visualization
│   ├── PlayerHUD.tsx         # Player controls
│   ├── NowPlayingCard.tsx    # Track info display
│   ├── VisualizerPanel.tsx   # Audio visualizer
│   ├── SettingsPanel.tsx     # Settings UI
│   └── PlaylistManager.tsx   # Playlist UI
├── hooks/
│   ├── useAudioPlayer.ts     # Audio playback logic
│   ├── useAudioAnalyzer.ts   # Audio analysis
│   ├── usePlaylistManager.ts # Playlist management
│   └── useVisualizerSettings.ts # Visualizer settings
├── lib/
│   ├── playlist.ts           # Playlist data & utilities
│   ├── types.ts              # TypeScript definitions
│   ├── constants.ts          # App constants
│   └── store.ts              # Zustand stores
├── public/                   # Static assets
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── next.config.mjs           # Next.js configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Customization

### Adding New Tracks

Edit `lib/playlist.ts` to add your Suno AI tracks:

```typescript
const TRACK_IDS: string[] = [
  "your_track_id_1",
  "your_track_id_2",
  // ... more track IDs
];

const TRACK_METADATA: Record<string, Partial<SunoTrack>> = {
  "your_track_id_1": {
    title: "Your Track Title",
    genre: "Electronic",
    artist: "Your Name"
  },
  // ... more metadata
};
```

### Changing Colors

Modify theme colors in `lib/constants.ts`:

```typescript
export const THEME_COLORS = {
  purple: {
    primary: '#a855f7',
    secondary: '#d946ef',
    accent: '#ec4899',
    dark: '#1e1b4b',
  },
  // ... more themes
};
```

### Adjusting Particle Count

Change particle count in `lib/constants.ts`:

```typescript
export const VISUALIZER_CONFIG = {
  PARTICLE_COUNT_LOW: 1000,
  PARTICLE_COUNT_MEDIUM: 2000,
  PARTICLE_COUNT_HIGH: 5000,
  // ...
};
```

## 📊 Performance Optimization

### Bundle Size
- Gzip: ~150KB
- Brotli: ~120KB

### Lighthouse Scores
- Performance: 85+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 100

### Optimization Techniques
- Code splitting with Next.js
- Image optimization with next/image
- CSS minification with Tailwind
- JavaScript minification with SWC
- Lazy loading of components
- Efficient particle rendering

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Heroku
- DigitalOcean
- Railway
- Render

## 🔧 Environment Variables

Create a `.env.local` file (optional):

```env
# API Configuration
NEXT_PUBLIC_SUNO_CDN=https://cdn1.suno.ai

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 📚 Documentation

- [Features Documentation](./FEATURES.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **Suno AI** - For the amazing AI-generated music
- **Three.js** - For the powerful 3D graphics library
- **Next.js** - For the excellent React framework
- **Vercel** - For hosting and deployment
- **Community** - For feedback and contributions

## 📞 Support

- 📧 Email: support@smokestream.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/smoke-stream/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/smoke-stream/discussions)

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Spotify integration
- [ ] Custom playlist upload
- [ ] Social sharing features
- [ ] Multiplayer mode
- [ ] VR support
- [ ] Advanced audio effects
- [ ] User accounts and favorites

---

**Made with ❤️ by DJ Smoke Stream**

*A hyper-visual, generative audio experience*
