import { z } from 'zod';
import { request, simulateDelay } from './api';
import { toast } from 'sonner';

// 用户验证模式
const UserSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6位'),
  verificationCode: z.string().length(6, '验证码必须为6位数字'),
  name: z.string().min(2, '名字至少需要2个字符').optional(),
});

export type User = z.infer<typeof UserSchema>;

// 用户响应模式
const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    email: z.string(),
    name: z.string().optional(),
  }),
});

// 发送验证码
export async function sendVerificationCode(email: string): Promise<boolean> {
  try {
    await request('/auth/send-code', z.object({ success: z.boolean() }), {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    toast.success('验证码已发送');
    return true;
  } catch (error) {
    console.error('发送验证码失败:', error);
    toast.error('发送验证码失败');
    return false;
  }
}

// 登录
export async function login(email: string, password: string): Promise<boolean> {
  try {
    const response = await request('/auth/login', AuthResponseSchema, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    localStorage.setItem('authToken', response.token);
    return true;
  } catch (error) {
    console.error('登录失败:', error);
    toast.error('邮箱或密码错误');
    return false;
  }
}

// 注册
export async function register(user: User): Promise<boolean> {
  try {
    const response = await request('/auth/register', AuthResponseSchema, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    
    localStorage.setItem('authToken', response.token);
    toast.success('注册成功');
    return true;
  } catch (error) {
    console.error('注册失败:', error);
    toast.error('注册失败');
    return false;
  }
}