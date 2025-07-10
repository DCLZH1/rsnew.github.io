import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

export default function About() {
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
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 font-orbitron text-3xl text-white"
          >
            关于我们
          </motion.h1>
          
          <div className="space-y-6 text-white">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert"
            >
              <h2 className="font-orbitron text-2xl">公司简介</h2>
              <p>
                灵构科技是一个刚创立的一个脚本
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="prose prose-invert"
            >
              <h2 className="font-orbitron text-2xl">发展历程</h2>
              <ul className="space-y-2">
                <motion.li 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >2025 5 10开始制作脚本</motion.li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="prose prose-invert"
            >
              <h2 className="font-orbitron text-2xl">团队介绍</h2>
              <p>
                团队仅仅只有一人
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}