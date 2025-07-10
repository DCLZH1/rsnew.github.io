import { z } from 'zod';
import type { BodyInit } from 'vite-env.d';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// 基础响应结构验证
const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string().optional(),
  data: z.unknown().optional(),
});

// 请求配置类型
type RequestConfig = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: BodyInit;
  authToken?: string;
};

// 统一请求处理
export async function request<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  config?: RequestConfig
): Promise<T> {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(config?.authToken && { Authorization: `Bearer ${config.authToken}` }),
      ...config?.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...config,
    });

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`);
    }

    const json = await response.json();
    const parsedResponse = BaseResponseSchema.parse(json);

    if (parsedResponse.code !== 200) {
      throw new Error(parsedResponse.message || '请求处理失败');
    }

    return schema.parse(parsedResponse.data);
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
}

// 模拟请求延迟
export function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}