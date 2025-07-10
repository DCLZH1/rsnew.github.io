import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id: 'products',
    label: '产品介绍',
    content: (
      <div className="p-4 text-white">
        <h2 className="mb-4 font-orbitron text-2xl">我们的创新产品</h2>
        <p className="text-gray-300">
          采用最新技术研发的高性能产品系列，专为未来科技需求设计。
        </p>
      </div>
    ),
  },
  {
    id: 'specs',
    label: '技术参数',
    content: (
      <div className="p-4 text-white">
        <h2 className="mb-4 font-orbitron text-2xl">技术规格</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• 处理器: 量子计算核心</li>
          <li>• 内存: 128TB 全息存储</li>
          <li>• 接口: 多维度连接端口</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'contact',
    label: '联系方式',
    content: (
      <div className="p-4 text-white">
        <h2 className="mb-4 font-orbitron text-2xl">联系我们</h2>
        <p className="text-gray-300">
          邮箱: info@techcorp.com<br />
          电话: +1 (555) 123-4567
        </p>
      </div>
    ),
  },
];

const animationVariants = {
  flip: {
    rotateY: 90,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  fade: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  slide: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const animationEnter = {
  flip: {
    rotateY: -90,
    opacity: 0,
  },
  fade: {
    opacity: 0,
  },
  slide: {
    x: -100,
    opacity: 0,
  },
};

const animationAnimate = {
  flip: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  fade: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  slide: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function VerticalTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [animationType, setAnimationType] = useState<'flip' | 'fade' | 'slide'>('flip');

  return (
    <div className="flex h-full w-full">
      <div className="flex w-48 flex-col space-y-2 border-r border-[#c0c0c0] pr-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-left font-orbitron transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-purple-900 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <div className="mt-8 space-y-2">
          <p className="font-orbitron text-sm text-gray-400">动画效果:</p>
          {(['flip', 'fade', 'slide'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setAnimationType(type)}
              className={`rounded px-3 py-1 text-sm ${
                animationType === type
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-purple-900'
              }`}
            >
              {type === 'flip' ? '3D翻转' : type === 'fade' ? '渐隐渐显' : '滑动'}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden pl-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={animationEnter[animationType]}
            animate={animationAnimate[animationType]}
            exit={animationVariants[animationType]}
            className="h-full"
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}