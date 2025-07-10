import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#6e48aa] to-[#9d50bb]">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 flex h-[calc(100vh-80px)] w-full items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl rounded-xl border border-[#c0c0c0] bg-black bg-opacity-50 p-8 backdrop-blur-sm"
        >
          <h1 className="mb-8 font-orbitron text-3xl text-white">主页</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="rounded-lg border-2 border-[#c0c0c0] p-6"
            >
              <h2 className="mb-4 font-orbitron text-2xl text-white">查看脚本</h2>
              <div className="mt-4">
               <Link 
                 to="/products" 
                 className="inline-block rounded bg-purple-600 px-4 py-2 font-orbitron text-white hover:bg-purple-700"
               >
                 查看支持的脚本
               </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border-2 border-[#c0c0c0] p-6"
            >
              <h2 className="mb-4 font-orbitron text-2xl text-white">公告</h2>
              <ul className="space-y-2 text-gray-300">
                <li>纯手工制作</li>
                <li>Q群: 996155023</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="/specs" 
                  className="inline-block rounded bg-purple-600 px-4 py-2 font-orbitron text-white hover:bg-purple-700"
                >
                  点击加入dc群组
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}