import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

const contactSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  message: z.string().min(10, '消息内容至少需要10个字符'),
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = contactSchema.parse(formData);
      setIsSubmitting(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowParticles(true);
      toast.success('提交成功！我们会尽快回复您');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setShowParticles(false), 2000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach(error => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
        toast.error('请检查表单填写是否正确');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapPrompt = encodeURIComponent('高科技企业总部大楼，现代建筑，夜景，霓虹灯光，等距视角');
  const mapImageUrl = `https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%24%7BmapPrompt%7D&sign=7906dbcda56790b5741d38c21b6122b5`;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#6e48aa] to-[#9d50bb]">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 flex h-[calc(100vh-80px)] w-full items-center justify-center p-8">
        <div className="w-full max-w-6xl rounded-xl border border-[#c0c0c0] bg-black bg-opacity-50 p-8 backdrop-blur-sm">
          <h1 className="mb-8 font-orbitron text-3xl text-white">联系我们</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* 左侧 - 地图和联系信息 */}
            <div>
              <div className="mb-6 overflow-hidden rounded-lg border-2 border-[#c0c0c0]">
                <img 
                  src={mapImageUrl}
                  alt="公司位置地图"
                  className="h-auto w-full object-cover"
                />
              </div>
              
              <div className="space-y-4 text-white">
                <h2 className="font-orbitron text-xl">联系信息</h2>
                <div className="flex items-start">
                  <i className="fa-solid fa-location-dot mr-3 mt-1 text-purple-400"></i>
                  <p>北京市海淀区科技园路88号创新大厦15层</p>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-phone mr-3 text-purple-400"></i>
                  <p>+86 10 8888 6666</p>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-envelope mr-3 text-purple-400"></i>
                  <p>contact@techcorp.com</p>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-clock mr-3 text-purple-400"></i>
                  <p>周一至周五: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
            
            {/* 右侧 - 表单 */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block font-orbitron text-white">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border-2 bg-black bg-opacity-50 p-3 font-orbitron text-white transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                      errors.name ? 'border-red-500' : 'border-[#c0c0c0]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-2 block font-orbitron text-white">
                    电子邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-lg border-2 bg-black bg-opacity-50 p-3 font-orbitron text-white transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                      errors.email ? 'border-red-500' : 'border-[#c0c0c0]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="mb-2 block font-orbitron text-white">
                    留言内容
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full rounded-lg border-2 bg-black bg-opacity-50 p-3 font-orbitron text-white transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                      errors.message ? 'border-red-500' : 'border-[#c0c0c0]'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-orbitron text-white shadow-lg transition-all hover:shadow-[0_0_15px_rgba(157,80,187,0.6)]"
                >
                  {isSubmitting ? '提交中...' : '发送消息'}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* 提交成功粒子效果 */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: window.innerWidth / 2 + Math.random() * 400 - 200,
                  y: window.innerHeight / 2 + Math.random() * 400 - 200,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                }}
                className="absolute h-2 w-2 rounded-full bg-purple-400"
                style={{
                  boxShadow: '0 0 10px 2px rgba(157, 80, 187, 0.8)',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
