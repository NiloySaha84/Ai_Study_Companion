# 🎓 EduFlow - AI-Powered Learning Platform

EduFlow is a modern, interactive learning platform that combines artificial intelligence with voice technology to create personalized educational companions. Students can engage in real-time voice conversations with AI tutors across various subjects, making learning more engaging and accessible.

## ✨ Features

### 🎤 **Real-Time Voice Learning**
- **Interactive Voice Sessions**: Engage in natural voice conversations with AI tutors
- **Multiple Voice Options**: Choose from male and female voices with different teaching styles
- **Voice Activity Detection**: Smart microphone handling with real-time status indicators
- **Voice Troubleshooting**: Built-in diagnostics and testing tools

### 📚 **Subject Coverage**
- **Mathematics**: From basic arithmetic to advanced calculus
- **Science**: Physics, chemistry, biology, and earth sciences
- **Language Arts**: Literature, grammar, and creative writing
- **History**: World history, historical events, and cultural studies
- **Coding**: Programming fundamentals and advanced concepts
- **Economics**: Market principles, financial literacy, and business concepts

### 🎯 **Personalized Learning**
- **Custom Companions**: Create AI tutors tailored to specific topics and subjects
- **Teaching Styles**: Choose from casual, formal, enthusiastic, or patient approaches
- **Session Duration**: Flexible session lengths (15-60 minutes)
- **Progress Tracking**: Monitor learning journey and session history

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glass Morphism UI**: Modern, clean interface with smooth animations
- **Dark/Light Theme**: Adaptive design that works in any environment
- **Intuitive Navigation**: Easy-to-use interface for all age groups

### 🔐 **User Management**
- **Secure Authentication**: Powered by Clerk for safe user accounts
- **Profile Management**: Track learning progress and companion history
- **Session History**: Review past learning sessions and achievements
- **Bookmark System**: Save favorite companions for quick access

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.5.3**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Framer Motion**: Smooth animations and transitions

### **Authentication & Database**
- **Clerk**: User authentication and management
- **Supabase**: PostgreSQL database for data persistence
- **Server Actions**: Secure server-side data operations

### **AI & Voice Technology**
- **VAPI.ai**: Real-time voice AI integration
- **ElevenLabs**: High-quality text-to-speech voices
- **Deepgram**: Advanced speech-to-text transcription
- **OpenAI GPT-4**: Intelligent conversation and tutoring

### **Development Tools**
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Turbopack**: Fast development builds
- **pnpm**: Efficient package management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account
- Clerk account
- VAPI.ai account
- ElevenLabs account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-study-companion
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   # Supabase Database
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # VAPI Voice AI
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Creating Your First Companion
1. **Sign up** for an account using the authentication system
2. **Navigate** to the "Create New Companion" page
3. **Fill in** the companion details:
   - Name your AI tutor
   - Select a subject (Math, Science, Language, etc.)
   - Choose a specific topic
   - Pick a voice type (Male/Female)
   - Select a teaching style
   - Set session duration
4. **Save** your companion and start learning!

### Starting a Voice Session
1. **Select** a companion from your library
2. **Click** "Start Voice Session"
3. **Allow** microphone access when prompted
4. **Begin** your interactive learning conversation
5. **Use** the mute/unmute controls as needed
6. **End** the session when complete

### Voice Troubleshooting
If you encounter voice issues:
1. **Visit** `/voice-test` for comprehensive diagnostics
2. **Test** your microphone and audio levels
3. **Check** browser compatibility
4. **Follow** the troubleshooting guide provided

## 🎯 Key Features Explained

### **AI Companions**
Each companion is a specialized AI tutor focused on a specific subject and topic. They adapt their teaching style based on your preferences and provide personalized learning experiences.

### **Voice Technology**
The platform uses cutting-edge voice AI to enable natural conversations. The system handles:
- Speech-to-text conversion
- Natural language processing
- Text-to-speech synthesis
- Voice activity detection
- Real-time conversation flow

### **Learning Analytics**
Track your progress with:
- Session duration and frequency
- Topics covered
- Learning streaks
- Companion usage statistics
- Achievement milestones

## 🔧 Configuration

### Voice Settings
The platform supports multiple voice configurations:
- **Male Voices**: Adam (casual/patient), Bella (formal), Josh (enthusiastic)
- **Female Voices**: Bella (casual/patient), Sarah (formal), Josh (enthusiastic)
- **Voice Parameters**: Stability, similarity boost, speed, and style optimization

### Teaching Styles
- **Casual**: Friendly and approachable
- **Formal**: Professional and structured
- **Enthusiastic**: Energetic and motivating
- **Patient**: Supportive and encouraging

## 📊 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── companions/         # Companion management
│   ├── my-journey/        # User profile and progress
│   ├── sign-in/           # Authentication pages
│   └── voice-test/        # Voice diagnostics
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── *.tsx             # Feature components
├── lib/                  # Utility functions and configurations
│   ├── actions/          # Server actions
│   ├── supabase.ts      # Database client
│   └── utils.ts         # Helper functions
├── constants/            # App constants and configurations
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect** your GitHub repository to Vercel
2. **Set** environment variables in Vercel dashboard
3. **Deploy** automatically on every push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style and standards
- Pull request process
- Issue reporting
- Feature requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/voice-test` page for troubleshooting
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join our community discussions
- **Email**: Contact us for enterprise support

## 🙏 Acknowledgments

- **VAPI.ai** for voice AI technology
- **ElevenLabs** for high-quality voice synthesis
- **Clerk** for authentication services
- **Supabase** for database infrastructure
- **Next.js** team for the amazing framework

---

**EduFlow** - Making learning interactive, engaging, and accessible through AI-powered voice technology. 🎓✨