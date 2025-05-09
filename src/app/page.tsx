'use client';

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ProjectListItem from "@/components/ProjectListItem";
import FloatingNav from "@/components/FloatingNav";
import LogoTile from "@/components/LogoTile";
import CardStack from "@/components/CardStack";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";
import Hero from "@/components/Hero";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const [visibleImages, setVisibleImages] = useState<{ [key: string]: boolean }>({});

  // Featured project data
  const featuredProjects = [
    {
      title: "Disney+ on Vision Pro",
      categories: "Disney+ • 2024 • Product & Systems",
      imagePaths: [
        "/images/project_visionpro.png",
        "/images/home-marvel.png",
        "/images/home-doordash.png"
      ]
    },
    {
      title: "MyDisney System",
      categories: "Disney • 2023 • Product & Systems",
      imagePaths: [
        "/images/project_mydisney.png",
        "/images/home-doordash.png",
        "/images/home-magicmirror.png"
      ]
    },
    {
      title: "Ordering Experience",
      categories: "Doordash • 2020 • Product Design",
      imagePaths: [
        "/images/project_doordash.png",
        "/images/home-magicmirror.png",
        "/images/home-visionpro.png"
      ]
    },
    {
      title: "Magic Mirror",
      categories: "Disney • 2022 • Design Tooling",
      imagePaths: [
        "/images/project_magicmirror.png",
        "/images/home-visionpro.png",
        "/images/home-marvel.png"
      ]
    }
  ];

  // Project list data
  const projectList = [
    {
      title: "ICON Design System",
      year: "2024",
      role: "Design Systems",
      company: "Disney",
      description: "Launched a design system of systems to work with all products and 26 brands of the Disney, Entertainment and ESPN company."
    },
    {
      title: "Disney+ Rebrand",
      year: "2024",
      role: "Product & Systems",
      company: "Disney+",
      description: "Updated our product to reflect the new brand identity for Disney+ platforms."
    },
    {
      title: "Inspire",
      year: "2023-2024",
      role: "Design Systems",
      company: "Disney+",
      description: "Collaborated with font experts to update our global typeface for all Disney+ platforms to our own font, Inspire."
    },
    {
      title: "Disney+ Wave 3 Launches",
      year: "2022",
      role: "Product Design",
      company: "Disney+",
      description: "Launched Disney+ into new eastern Europe countries. My role was updating all our type ramps and typography to account for new characters like cyrillic."
    },
    {
      title: "Reorder",
      year: "2020",
      role: "Product Design",
      company: "Doordash",
      description: "Developed a set of features to improve customers experience ordering the same items again."
    },
    {
      title: "Menu Navigation",
      year: "2020",
      role: "Product Design",
      company: "Doordash",
      description: "Redesigned our store page menus to make them easier to browse and navigate."
    },
    {
      title: "Cuisine Icon Animations",
      year: "2018",
      role: "Motion Design",
      company: "Doordash",
      description: "As a hackathon project, I animated our cuisine icons, they later launched on all platforms."
    },
  ];

  // Logo data
  const clientLogos = [
    {
      name: "Target",
      logoPath: "/images/logo_Target.svg",
      alt: "Target logo"
    },
    {
      name: "Google",
      logoPath: "/images/logo_Google.svg",
      alt: "Google logo"
    },
    {
      name: "eBay",
      logoPath: "/images/logo_Ebay.svg",
      alt: "eBay logo"
    },
    {
      name: "Facebook",
      logoPath: "/images/logo_Facebook.svg",
      alt: "Facebook logo"
    },
    {
      name: "GoPro",
      logoPath: "/images/logo_GoPro.svg",
      alt: "GoPro logo"
    },
    {
      name: "LG",
      logoPath: "/images/logo_LG.svg",
      alt: "LG logo"
    }
  ];

  // Card stack data
  const cardStackItems = [
    {
      id: 1,
      image: "/images/contact_office.jpg",
      title: "Building Stuff",
      description: "I love building things in my garage, and usually decorating my office."
    },
    {
      id: 2,
      image: "/images/contact_korea.jpg",
      title: "In Korea",
      description: "Visitng my family in Korea is one of my favorite places to be."
    },
    {
      id: 3,
      image: "/images/contact_cards.jpeg",
      title: "Collecting Cards",
      description: "Having recentlly been addicted to pokemon cards, I am always growing my collection."
    },
    {
      id: 4,
      image: "/images/contact_grilling.jpeg",
      title: "Grilling",
      description: "I wouldnt be a new dad if I wasnt out here grilling."
    },
    {
      id: 5,
      image: "/images/contact_yomi.jpg",
      title: "With my family",
      description: "Alwyas having fun exploring and decorating the house with my wife, son and dog."
    },
    {
      id: 6,
      image: "/images/contact-ben.jpg",
      title: "Taking Pictures",
      description: "I love photography, and always have my camera with me when travelling to new places"
    },
    {
      id: 7,
      image: "/images/contact_destiny.jpeg",
      title: "Waiting in Orbit",
      description: "I play a lot of video games, and am a Destiny fan for life."
    },
    {
      id: 8,
      image: "/images/contact_parks.JPG",
      title: "At the Parks",
      description: "I have loved Disney since I was a kid, and love to visit the parks with my family."
    },
  ];
  
  return (
    <div className="min-h-screen text-white bg-black">
      <FloatingNav variant="dark" currentPage="design" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-8 py-8">
        <div className="h-24"></div>
        
        <AnimatedSection title="">
          <Hero title="Ben is a creative minded product and systems designer based in New York." />
        </AnimatedSection>

        <AnimatedSection title="Featured">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredProjects.map((project, index) => (
              <AnimatedItem key={index} index={index} delayFactor={0.15}>
                <ProjectCard 
                  title={project.title}
                  categories={project.categories}
                  imagePaths={project.imagePaths}
                />
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects List */}
        <AnimatedSection title="Projects" delay={0.1} className="mb-16">
          <div className="border-t border-gray-800">
            {projectList.map((project, index) => (
              <AnimatedItem key={index} index={index} delayFactor={0.08}>
                <ProjectListItem
                  title={project.title}
                  year={project.year}
                  role={project.role}
                  company={project.company}
                  description={project.description}
                />
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Clients */}
        <AnimatedSection title="" delay={0.1} className="mb-36">
          <p className="text-sm italic text-gray-400 mb-6 font-body">Companies I've worked with</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clientLogos.map((logo, index) => (
              <AnimatedItem key={index} index={index} delayFactor={0.05}>
                <LogoTile
                  name={logo.name}
                  logoPath={logo.logoPath}
                  alt={logo.alt}
                />
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Footer CTA */}
        <AnimatedSection title="" delay={0.1}>
          <div id="contact" className="relative h-[480px]">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
              <div className="md:max-w-md lg:max-w-lg">
                <div className="mb-4">
                  <div className="uppercase text-xs font-medium font-body bg-white text-black mb-4 py-1 px-3 inline-block rounded">WHERE TO FIND ME</div>
                  <h2 className="font-heading text-2xl md:text-3xl lg:text-[64px] font-semibold leading-[1.1] tracking-tight hero-text">To Infinity and Beyond!</h2>
                </div>
                <p className="text-sm italic text-gray-400 mb-6 font-body">Thanks so much for taking a look at my portfolio! I always enjoy connecting with other designers—whether you're just getting started, figuring things out, or deep in the craft. I'm happy to chat, share experiences, or offer advice if it's helpful. Feel free to shoot me an email, and I'll get back to you soon.</p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium italic font-body transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" onClick={() => window.location.href = 'mailto:hi@benbensorensen.com'}>Contact Me</button>
                  <button className="border border-gray-700 text-white px-6 py-3 rounded-full text-sm font-medium italic font-body transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Resume</button>
                  <a href="https://bsky.app/profile/benbenben.bsky.social" target="_blank" className="border border-gray-700 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-lg hover:scale-110 active:scale-95">
                    <svg width="22" height="20" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.41908 1.56959C8.28527 3.72017 11.3682 8.08066 12.5001 10.4208C13.632 8.08083 16.7148 3.72013 19.5811 1.56959C21.6492 0.0178091 25 -1.18287 25 2.63775C25 3.40078 24.5623 9.04759 24.3056 9.96432C23.4132 13.1515 20.1615 13.9645 17.269 13.4724C22.325 14.3325 23.6112 17.1813 20.8335 20.03C15.5581 25.4404 13.2512 18.6726 12.6598 16.9384C12.5515 16.6205 12.5007 16.4717 12.5 16.5982C12.4992 16.4717 12.4485 16.6205 12.3402 16.9384C11.7491 18.6726 9.44223 25.4406 4.16653 20.03C1.38879 17.1813 2.67494 14.3323 7.73103 13.4724C4.83846 13.9645 1.58667 13.1515 0.694436 9.96432C0.437704 9.0475 0 3.40069 0 2.63775C0 -1.18287 3.35093 0.0178091 5.41893 1.56959H5.41908Z" fill="white"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/benbenben/" target="_blank" className="border border-gray-700 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-lg hover:scale-110 active:scale-95">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17 17H13.507V11.0507C13.507 9.41955 12.8872 8.50802 11.5962 8.50802C10.1917 8.50802 9.45791 9.45661 9.45791 11.0507V17H6.09167V5.66667H9.45791V7.19327C9.45791 7.19327 10.4701 5.32042 12.8751 5.32042C15.279 5.32042 17 6.78838 17 9.82443V17ZM2.07575 4.18266C0.929134 4.18266 0 3.24623 0 2.09133C0 0.936424 0.929134 0 2.07575 0C3.22236 0 4.15094 0.936424 4.15094 2.09133C4.15094 3.24623 3.22236 4.18266 2.07575 4.18266ZM0.337565 17H3.84769V5.66667H0.337565V17Z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Card Stack positioned between where it was and text */}
              <div className="mt-12 md:mt-0 md:ml-20 lg:ml-16">
                <CardStack cards={cardStackItems} />
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Extra space at bottom to account for card stack overflow */}
        <div className="h-[300px]"></div>
      </div>
    </div>
  );
}
