'use client';

import Image from 'next/image';
import type { HomepageData } from '@/types';
import dataJson from '@/data.json'; // 直接导入数据

const data: HomepageData = dataJson;

export default function Home() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Biography', href: '#biography' },
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
            <div className="items-start" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,gap: '30px'}}>
              <Image src={data.avatarUrl} alt={data.name} width={128} height={156}  className="rounded-md mr-20" />
              <div>
                <h2 className="text-3xl font-bold">{data.name}</h2>
                <p className="text-xl text-gray-600">{data.title}</p>
                <p className="mt-4">School of Computer Science and Engineering
                Sun Yat-Sen University</p>
                <p className="mt-4">Room B502, Experimental building, SYSU,
                Guangzhou, Guangdong, China</p>
                <p className="mt-4">Email: zhpj@mail.sysu.edu.cn</p>
                <div className="mt-4 space-x-4">
                  {data.socialLinks.map((link: { name: string; url: string }) => (
                    <a href={link.url} key={link.name} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" style={{ marginRight: '8px' }}>
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Biography Section */}
          <section id="biography" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Biography</h2>
            <div>
              {data.bio.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2 last:mb-0 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Publications Section */}
          <section id="publications" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Publications</h2>
            <ul className="space-y-4">
              {data.publications.map((pub, index) => (
                <li key={index} className="mb-4">
                  <p className="font-semibold text-gray-800">{pub.title}</p>
                  <p className="text-sm text-gray-600">
                    {pub.authors.map((author, i) => (
                      <span key={i}>
                        {author.includes('Peijia Zheng') ? <b>{author}</b> : author}
                        {i < pub.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm text-gray-500">
                    <em>{pub.venue}</em>
                    {pub.pdf && 
                      <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">[PDF]</a>
                    }
                    {pub.url && 
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">[Link]</a>
                    }
                  </p>
                </li>
              ))}
            </ul>
          </section>


          
          {/* Projects Section */}
          <section id="projects" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Projects</h2>
            <ul className="space-y-4">
              {data.projects.map((project, index) => (
                <li key={index} className="border p-4 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold">

                      {project.name}

                  </h4>
                  <p className="text-gray-700 mt-2">{project.description}</p>
                </li>
              ))}
            </ul>
          </section>  

          {/* Research Interests Section */}
          <section id="research" className="mb-12">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Research Interests</h2>
            <div className="flex flex-wrap gap-2">
              {data.researchInterests.map((interest: string) => (
                <span key={interest} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                  {interest} / 
                </span>
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
