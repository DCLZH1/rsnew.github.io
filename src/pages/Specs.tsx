import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

type TechSpec = {
  id: number;
  name: string;
  value: string | number;
  unit: string;
  description: string;
};

const techSpecs: TechSpec[] = [
  {
    id: 1,
    name: '量子计算核心',
    value: '128',
    unit: '位',
    description: '基于超导量子比特技术'
  },
  {
    id: 2,
    name: '内存容量',
    value: '128',
    unit: 'TB',
    description: '全息存储技术'
  },
  {
    id: 3,
    name: '处理速度',
    value: '1.2',
    unit: 'PHz',
    description: '峰值计算性能'
  },
  {
    id: 4,
    name: '能耗比',
    value: '95',
    unit: 'TOPS/W',
    description: '每瓦特算力'
  },
  {
    id: 5,
    name: '接口带宽',
    value: '800',
    unit: 'Gbps',
    description: '多维度连接端口'
  }
];

type SortConfig = {
  key: keyof TechSpec;
  direction: 'asc' | 'desc';
};

export default function Specs() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    direction: 'asc'
  });

  const sortedSpecs = [...techSpecs].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof TechSpec) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof TechSpec) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <i className="fa-solid fa-arrow-up ml-2"></i>
    ) : (
      <i className="fa-solid fa-arrow-down ml-2"></i>
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#6e48aa] to-[#9d50bb]">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 flex h-[calc(100vh-80px)] w-full items-center justify-center p-8">
        <div className="w-full max-w-6xl rounded-xl border border-[#c0c0c0] bg-black bg-opacity-50 p-8 backdrop-blur-sm">
          <h1 className="mb-8 font-orbitron text-3xl text-white">wait</h1>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#9d50bb]">
                  {['name', 'value', 'unit', 'description'].map((key) => (
                    <th
                      key={key}
                      className="cursor-pointer px-4 py-3 text-left font-orbitron text-white transition-all hover:bg-purple-900 hover:text-purple-300"
                      onClick={() => requestSort(key as keyof TechSpec)}
                    >
                      <div className="flex items-center">
                        {key === 'name' && '参数名称'}
                        {key === 'value' && '参数值'}
                        {key === 'unit' && '单位'}
                        {key === 'description' && '备注说明'}
                        {getSortIndicator(key as keyof TechSpec)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sortedSpecs.map((spec) => (
                    <motion.tr
                      key={spec.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-[#6e48aa] text-gray-300 hover:bg-purple-900 hover:bg-opacity-30"
                    >
                      <td className="px-4 py-3">{spec.name}</td>
                      <td className="px-4 py-3">{spec.value}</td>
                      <td className="px-4 py-3">{spec.unit}</td>
                      <td className="px-4 py-3">{spec.description}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
