import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { sendVerificationCode, register } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

const registerSchema = z.object({
  name: z.string().min(2, '名字至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6位'),
  verificationCode: z.string().length(6, '验证码必须为6位数字'),
});

export default function Register() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleSendCode = async (email) => {
    if (!email) {
      toast.error('请输入邮箱地址');
      return;
    }
    
    try {
      setCodeSent(true);
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      await sendVerificationCode(email);
    } catch (error) {
      console.error('发送验证码失败:', error);
      setCodeSent(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const success = await register(data);
      if (success) {
        setIsAuthenticated(true);
        toast.success('注册成功');
        navigate('/');
      }
    } catch (error) {
      console.error('注册失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#6e48aa] to-[#9d50bb]">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 flex h-[calc(100vh-80px)] w-full items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-xl border border-[#c0c0c0] bg-black bg-opacity-50 p-8 backdrop-blur-sm"
        >
          <h1 className="mb-8 text-center font-orbitron text-3xl text-white">用户注册</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block font-orbitron text-white">
                名字
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className={`w-full rounded-lg border-2 bg-black bg-opacity-50 p-3 font-orbitron text-white transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                  errors.name ? 'border-red-500' : 'border-[#c0c0c0]'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="mb-2 block font-orbitron text-white">
                电子邮箱
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full rounded-lg border-2 bg-black bg-opacity-50 p-3 font-orbitron text-white transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                  errors.email ? 'border-red-500' : 'border-[#c0c0c0]'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="mb-2 block font-orbitron text-white">
                密码
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className={`w-full rounded-lg border-2 bg-black bg-opacity-50 p-3 font-orbitron text-white transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                  errors.password ? 'border-red-500' : 'border-[#c0c0c0]'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="verificationCode" className="mb-2 block font-orbitron text-white">
                验证码
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="verificationCode"
                  {...register('verificationCode')}
                  className={`flex-1 rounded-lg border-2 bg-black bg-opacity-50 p-3 font-orbitron text-white transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                    errors.verificationCode ? 'border-red-500' : 'border-[#c0c0c0]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleSendCode(document.getElementById('email')?.value)}
                  disabled={codeSent && countdown > 0}
                  className={`rounded-lg px-4 font-orbitron text-white transition-all ${
                    codeSent && countdown > 0
                      ? 'bg-gray-600'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {codeSent && countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
              {errors.verificationCode && (
                <p className="mt-1 text-sm text-red-400">{errors.verificationCode.message}</p>
              )}
            </div>
            
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-orbitron text-white shadow-lg transition-all hover:shadow-[0_0_15px_rgba(157,80,187,0.6)]"
            >
              {isLoading ? '注册中...' : '注册'}
            </motion.button>
            
            <div className="text-center text-gray-300">
              已有账号？{' '}
              <Link to="/login" className="text-purple-400 hover:underline">
                立即登录
              </Link>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}