#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试数据生成脚本
用于生成5000条产品数据，专门测试网站性能指标
包括页面加载速度、资源加载时间和交互响应时间等
"""

import csv
import random
import os
from typing import List, Dict

class PerformanceTestDataGenerator:
    """性能测试数据生成器"""
    
    def __init__(self):
        # 汽车零件类别
        self.categories = [
            'engineSystem', 'brakeSystem', 'coolingSystem',
            'electricalSystem', 'exhaustSystem', 'transmissionSystem',
            'exteriorAccessories', 'tireSystem', 'durability', 'otherAccessories'
        ]
        
        # 品牌列表（包含各种长度的品牌名，测试渲染性能）
        self.brands = [
            'Brembo', 'Mann', 'K&N', 'NGK', 'Bilstein', 'Michelin', 'Osram', 'Bosch',
            'Continental', 'Denso', 'Delphi', 'Valeo', 'Mahle', 'Pierburg', 'Sachs',
            'ZF', 'TRW', 'Febi', 'Lemförder', 'Corteco', 'Elring', 'Victor Reinz',
            'INA', 'FAG', 'SKF', 'Timken', 'Gates', 'Dayco', 'ContiTech', 'Hutchinson',
            'A', 'AB', 'ABC', 'ABCD', 'ABCDE', 'ABCDEF', 'ABCDEFG', 'ABCDEFGH'  # 测试不同长度
        ]
        
        # 产品描述模板（包含不同长度的描述，测试文本渲染性能）
        self.description_templates = [
            "Premium {adjective} {product_type} for enhanced {benefit}",
            "High-quality {product_type} for {benefit}",
            "Advanced {adjective} {product_type} improved {benefit}",
            "Professional grade {product_type} with {adjective} technology",
            "Ultra-premium {adjective} {product_type} designed for maximum {benefit}",
            "State {product_type} cutting-edge {adjective}  {benefit}",
            "A", "AB", "ABC", "ABCD", "ABCDE",  # 短描述测试
            "This is an the product experience.",  # 长描述测试
        ]
        
        self.adjectives = [
            'ceramic', 'synthetic', 'high-performance', 'premium', 'professional',
            'advanced', 'ultra-premium', 'heavy-duty', 'lightweight', 'durable',
            'efficient', 'reliable', 'innovative', 'precision'
        ]
        
        self.product_types = [
            'brake pads', 'oil filter', 'air filter', 'spark plugs', 'shock absorber',
            'tire', 'headlight', 'wiper blades', 'battery', 'alternator', 'starter',
            'radiator', 'thermostat', 'fuel pump', 'exhaust pipe', 'muffler'
        ]
        
        self.benefits = [
            'stopping power', 'engine protection', 'fuel economy', 'ride comfort',
            'visibility', 'performance', 'durability', 'efficiency', 'reliability',
            'safety', 'comfort', 'handling', 'acceleration', 'braking'
        ]
    
    def generate_weight(self) -> str:
        """生成重量数据（包含各种范围测试排序性能）"""
        # 生成不同范围的重量来测试排序和过滤性能
        weight_ranges = [
            (0.1, 1.0),    # 轻量级零件
            (1.0, 5.0),    # 中等重量
            (5.0, 15.0),   # 重型零件
            (15.0, 50.0),  # 超重零件
            (0.01, 0.1),   # 极轻零件
            (50.0, 100.0)  # 极重零件
        ]
        
        weight_range = random.choice(weight_ranges)
        weight = round(random.uniform(weight_range[0], weight_range[1]), 2)
        return f"{weight}kg"
    
    def generate_price(self) -> str:
        """生成价格数据（包含各种价格范围测试排序性能）"""
        # 生成不同价格范围来测试排序和过滤性能
        price_ranges = [
            (10, 100),      # 低价位
            (100, 500),     # 中价位
            (500, 1500),    # 高价位
            (1500, 5000),   # 超高价位
            (1, 10),        # 极低价位
            (5000, 10000)   # 奢侈价位
        ]
        
        price_range = random.choice(price_ranges)
        price = round(random.uniform(price_range[0], price_range[1]), 2)
        return f"{price:.2f}"
    
    def generate_description(self) -> str:
        """生成产品描述"""
        template = random.choice(self.description_templates)
        
        # 如果是简单的测试字符串，直接返回
        if template in ["A", "AB", "ABC", "ABCD", "ABCDE"]:
            return template
        
        # 如果是长描述测试，直接返回
        if "This is an extremely long" in template:
            return template
        
        # 否则使用模板生成
        return template.format(
            adjective=random.choice(self.adjectives),
            product_type=random.choice(self.product_types),
            benefit=random.choice(self.benefits)
        )
    
    def generate_part_number(self, index: int) -> str:
        """生成零件编号（确保唯一性）"""
        # 生成不同格式的零件编号来测试搜索和过滤性能
        formats = [
            f"BP-{index:03d}",           # 标准格式
            f"{random.choice(['A', 'B', 'C'])}{index:04d}",  # 字母+数字
            f"{random.choice(['XX', 'YY', 'ZZ'])}-{index:05d}",  # 双字母-数字
            f"P{index:06d}",             # P+6位数字
            f"{index:08d}",              # 纯数字
            f"PART-{index:03d}-{random.choice(['A', 'B', 'C'])}"  # 复杂格式
        ]
        return random.choice(formats)
    
    def generate_single_product(self, index: int) -> Dict[str, str]:
        """生成单个产品数据"""
        return {
            'weight': self.generate_weight(),
            'price': self.generate_price(),
            'description': self.generate_description(),
            'category': random.choice(self.categories),
            'brand': random.choice(self.brands),
            'partNumber': self.generate_part_number(index)
        }
    
    def generate_test_data(self, count: int = 100000) -> List[Dict[str, str]]:
        """生成测试数据"""
        print(f"正在生成 {count} 条测试数据...")
        
        products = []
        for i in range(1, count + 1):
            product = self.generate_single_product(i)
            products.append(product)
            
            # 每生成5000条数据显示进度
            if i % 5000 == 0:
                print(f"已生成 {i} 条数据...")
        
        print(f"数据生成完成！总计 {len(products)} 条记录")
        return products
    
    def save_to_csv(self, products: List[Dict[str, str]], file_path: str):
        """保存数据到CSV文件"""
        print(f"正在保存数据到 {file_path}...")
        
        # 确保目录存在
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        # 写入CSV文件
        with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['weight', 'price', 'description', 'category', 'brand', 'partNumber']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            # 写入表头
            writer.writeheader()
            
            # 写入数据
            for product in products:
                writer.writerow(product)
        
        print(f"数据保存完成！文件大小: {os.path.getsize(file_path)} 字节")
    
    def generate_performance_report(self, products: List[Dict[str, str]]):
        """生成性能测试报告"""
        print("\n=== 性能测试数据统计报告 ===")
        
        # 统计各类别数量
        category_counts = {}
        brand_counts = {}
        price_ranges = {'低价位(0-100)': 0, '中价位(100-500)': 0, '高价位(500-1500)': 0, '超高价位(1500+)': 0}
        description_lengths = []
        
        for product in products:
            # 类别统计
            category = product['category']
            category_counts[category] = category_counts.get(category, 0) + 1
            
            # 品牌统计
            brand = product['brand']
            brand_counts[brand] = brand_counts.get(brand, 0) + 1
            
            # 价格范围统计
            price = float(product['price'])
            if price < 100:
                price_ranges['低价位(0-100)'] += 1
            elif price < 500:
                price_ranges['中价位(100-500)'] += 1
            elif price < 1500:
                price_ranges['高价位(500-1500)'] += 1
            else:
                price_ranges['超高价位(1500+)'] += 1
            
            # 描述长度统计
            description_lengths.append(len(product['description']))
        
        print(f"总记录数: {len(products)}")
        print(f"类别数量: {len(category_counts)}")
        print(f"品牌数量: {len(brand_counts)}")
        print(f"描述长度范围: {min(description_lengths)} - {max(description_lengths)} 字符")
        print(f"平均描述长度: {sum(description_lengths) / len(description_lengths):.1f} 字符")
        
        print("\n价格分布:")
        for range_name, count in price_ranges.items():
            percentage = (count / len(products)) * 100
            print(f"  {range_name}: {count} 条 ({percentage:.1f}%)")
        
        print("\n前5个最常见类别:")
        sorted_categories = sorted(category_counts.items(), key=lambda x: x[1], reverse=True)
        for category, count in sorted_categories[:5]:
            percentage = (count / len(products)) * 100
            print(f"  {category}: {count} 条 ({percentage:.1f}%)")


def main():
    """主函数"""
    print("=== TMT博客性能测试数据生成器 ===")
    print("专门用于测试Vercel部署后的客户端性能表现")
    print("包括页面加载速度、资源加载时间和交互响应时间等指标\n")
    
    # 创建生成器实例
    generator = PerformanceTestDataGenerator()
    
    # 生成测试数据
    products = generator.generate_test_data(100000)
    
    # 保存到指定路径
    output_path = "/Users/cxxvc/Documents/myCoding/tmt-blog/public/data/products.csv"
    generator.save_to_csv(products, output_path)
    
    # 生成性能报告
    generator.generate_performance_report(products)
    
    print(f"\n✅ 测试数据生成完成！")
    print(f"📁 文件路径: {output_path}")
    print(f"📊 数据条数: {len(products)}")
    print(f"🚀 现在可以部署到Vercel进行性能测试了！")


if __name__ == "__main__":
    main()