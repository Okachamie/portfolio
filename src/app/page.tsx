'use client';

import React, { useEffect, useRef } from 'react';

// --- CONFIGURATION ---
// All your personal information, links, and text are here.
// Edit this object to update the page content.
const config = {
  name: 'Paige Laskey',
  username: 'Okachamie',
  title: '3D Modeler & Graphics Designer',
  bio: 'Crafting immersive worlds and stunning visuals from concept to creation. Specializing in high-fidelity 3D assets and captivating brand identities.',
  buttons: [
    { text: 'View My Work', href: '#projects' },
    { text: 'Get In Touch', href: 'mailto:paige.laskey@example.com' },
  ],
  socials: [
    { label: 'ArtStation', href: 'https://www.artstation.com/your-profile', Icon: ArtStationIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-profile', Icon: LinkedInIcon },
    { label: 'Email', href: 'mailto:paige.laskey@example.com', Icon: MailIcon },
  ],
};

// --- SVG ICON COMPONENTS ---
// These are kept separate for clarity. In a larger project, you might move them to their own file.
function ArtStationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.363 3.636L12 9.182h5.182L14.363 3.636zM22 5.455h-5.182l-1.728 4.636H22V5.455zM9.182 12l-1.727 4.636H2.273L4.545 12h4.637zM2 18.364h5.182L9.909 12h-5.364L2 18.364zM12.455 12l2.727 7.364h-5.455L12.455 12z"></path>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.107 10-8.107v11.817h-20z"/>
    </svg>
  );
}

// --- STARFIELD BACKGROUND COMPONENT ---
// This component creates the animated star background.
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: { x: number; y: number; radius: number; alpha: number; velocity: number }[] = [];
    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 2000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          velocity: Math.random() * 0.2 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      stars.forEach(star => {
        star.y -= star.velocity;
        if (star.y < -star.radius) {
          star.y = canvas.height + star.radius;
          star.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      init();
      animate();
    };

    init();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  return (
    <main className="bg-black min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <Starfield />

      {/* Glassmorphism Card */}
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl text-white p-8 md:p-12 transform transition-all duration-500 hover:scale-[1.01]">
        <div className="text-center">
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
            {config.name}
          </h1>

          <p className="mt-1 text-lg font-mono text-cyan-300">
            {`// ${config.username}`}
          </p>

          <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-200">
            {config.title}
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-300 leading-relaxed">
            {config.bio}
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={config.buttons[0].href}
              className="w-full sm:w-auto px-8 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-300 rounded-full font-semibold transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-cyan-500/50 hover:shadow-lg"
            >
              {config.buttons[0].text}
            </a>
            <a
              href={config.buttons[1].href}
              className="w-full sm:w-auto px-8 py-3 bg-white/10 border border-white/20 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black"
            >
              {config.buttons[1].text}
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex items-center justify-center gap-6">
            {config.socials.map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                className="text-gray-400 hover:text-white transition-colors duration-300" 
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.Icon />
              </a>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}