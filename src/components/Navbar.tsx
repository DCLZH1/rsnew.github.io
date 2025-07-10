import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatar, setAvatar] = useState('');

  const navItems = [
    { name: '主页', path: '/', alwaysVisible: true },
    { name: '产品', path: '/products', alwaysVisible: true },
    { name: '关于我们', path: '/about', alwaysVisible: true },
    { name: '登录', path: '/login', alwaysVisible: !isAuthenticated },
    { name: '注册', path: '/register', alwaysVisible: !isAuthenticated },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
          toast.success('头像更新成功');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          灵构
        </div>
        
        <div className="flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navItems.filter(item => item.alwaysVisible).map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-lg text-gray-600 hover:text-blue-500"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative">
            <motion.div 
              className="flex cursor-pointer items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-purple-400 bg-gray-700">
                {avatar ? (
                  <img src={avatar} alt="用户头像" className="h-full w-full object-cover" />
                ) : (
                  <i className="fa-solid fa-user h-full w-full flex items-center justify-center text-xl text-purple-300"></i>
                )}
              </div>
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-orbitron text-transparent">
                {isAuthenticated ? (user?.name || 'QQ用户') : '游客'}
              </span>
            </motion.div>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 rounded-lg border border-[#c0c0c0] bg-black bg-opacity-80 p-2 shadow-lg backdrop-blur-sm"
                >
                  {isAuthenticated && (
                    <>
                      <label className="block cursor-pointer rounded px-4 py-2 font-orbitron text-white hover:bg-purple-900">
                        更换头像
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                      <Link
                        to="/logout"
                        className="block rounded px-4 py-2 font-orbitron text-white hover:bg-purple-900"
                      >
                        退出登录
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}