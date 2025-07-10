import { z } from 'zod';
import { request } from './api';
import { toast } from 'sonner';
import { title } from 'process';
import { DESTRUCTION } from 'dns';

// 产品数据结构验证
const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  description: z.string(),
  specs: z.array(z.string()),
});

export type Product = z.infer<typeof ProductSchema>;

// 默认产品数据
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Forsaken',
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=automation%20script%20icon&sign=a8289b7480ceef4ff194b6832ad899dd',
    description: '更新日期5/10',
    specs: ['运行状态🟢', '执行日志记录']
  },
  {
    id: '2',
    title: 'Pressure',
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=data%20scraping%20tool%20icon&sign=9af90ccab9a314111c85a25816d59061',
    description: '更新日期7/5',
    specs: ['运行状态🟣', '完全安全', '执行日志记录']
  },
  {
    id: '3',
    title:"天堂站立",
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=automation%20script%20icon&sign=a8289b7480ceef4ff194b6832ad899dd',
    description: '更新日期7/1',
    specs: ['运行状态🟢', '完全安全', '执行日志记录']
  },
  {
    id: "4",
    title: "巨魔起源",
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=automation%20script%20icon&sign=a8289b7480ceef4ff194b6832ad899dd',
    description: '更新日期7/1',
    specs: ['运行状态🟢', '完全安全', '执行日志记录']
  },
  {
    id:'5',
    title:"黑暗欺骗",
    image:"https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=automation%20script%20icon&sign=a8289b7480ceef4ff194b6832ad899dd",
    description:"更新日期5/30",
    specs: ['运行状态🟢', '完全安全', '执行日志记录']
  }
];

// 获取产品列表
export async function getProducts(): Promise<Product[]> {
  try {
    const token = localStorage.getItem('authToken');
    const products = await request('/products', z.array(ProductSchema), {
      method: 'GET',
      authToken: token || undefined,
    });
    return products;
  } catch (error) {
    console.error('获取产品失败:', error);
    toast.error('获取产品数据失败，使用默认数据');
    return DEFAULT_PRODUCTS;
  }
}