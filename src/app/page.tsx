'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { HomepageData } from '@/types';

export default function Home() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="text-center py-10">No data available.</div>;
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'News', href: '#news' },
    { name: 'Publications', href: '#publications' },
    { name: 'Research', href: '#research' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <div className="fixed font-sans text-gray-800" >
    {/* Left Navigation Sidebar */}
    <div className="w-48 fixed top-0 left-0 h-screen bg-gray-100 p-4 border-r" style={{ position: 'fixed',top: '0',left: '0',width: '200px',height: '100vh',backgroundColor: 'white',zIndex: '1000' }}>

      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link.name}>
              <a href={link.href} className="block py-1 text-blue-600 hover:underline">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="container" style={{ width: '1200px', margin: '0 auto' }}>

        {/* Main Content */}
        <main className="ml-48 p-8 w-full max-w-5xl mx-auto px-8">
          {/* Home/Bio Section */}
          <section id="home" className="mb-12">
            <div className="items-start" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,gap: '16px'}}>
              <Image src={data.avatarUrl} alt={data.name} width={128} height={128} className="rounded-md mr-8" />
              <div>
                <h2 className="text-3xl font-bold">{data.name}</h2>
                <p className="text-xl text-gray-600">{data.title}</p>
                <p className="mt-4">{data.bio}</p>
                <div className="mt-4 space-x-4">
                  {data.socialLinks.map(link => (
                    <a href={link.url} key={link.name} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" style={{ marginRight: '8px' }}>
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section id="news" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Biography</h2>
            <p>{data.bio}</p>
          </section>

          {/* Publications Section */}
          <section id="publications" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Publications</h2>
            <ul className="space-y-4">
              {data.publications.map((pub, index) => (
                <li key={index}>
                  <p className="font-semibold">{pub.title} {pub.pdf && <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[PDF]</a>} {pub.url && <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[Link]</a>}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Research Interests Section */}
          <section id="research" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Research Interests</h2>
            <div className="flex flex-wrap gap-2">
              {data.researchInterests.map(interest => (
                <span key={interest} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                  {interest}/
                </span>
              ))}
            </div>
          </section>
          
          {/* Projects Section */}
          <section id="projects" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">{project.title}</a>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-500 mt-12 pt-6 border-t">
            <p>© {new Date().getFullYear()} {data.name}. All Rights Reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
