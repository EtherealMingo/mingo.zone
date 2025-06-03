import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ScrollLinked from "@/components/ui/ScrollLinked";
const Photography = () => {
  // 模拟摄影作品数据
  const photos = [
    {
      category: "风景",
      keyword: "landscape,nature",
      description: "大自然的壮丽景色",
    },
    {
      category: "城市",
      keyword: "city,architecture",
      description: "现代都市的魅力",
    },
    {
      category: "人像",
      keyword: "portrait,people",
      description: "捕捉人物瞬间",
    },
    {
      category: "街拍",
      keyword: "street,urban",
      description: "城市生活剪影",
    },
    {
      category: "旅行",
      keyword: "travel,adventure",
      description: "探索世界各地",
    },
    {
      category: "美食",
      keyword: "food,cuisine",
      description: "美食摄影作品",
    },
  ];

  return (
    <Layout>
      <ScrollLinked />
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">摄影作品</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          通过镜头记录生活中的美好瞬间，分享我对世界的独特视角。
        </p>
      </motion.div>

      {photos.map((category, index) => (
        <motion.section
          key={index}
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {category.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, photoIndex) => (
              <motion.div
                key={photoIndex}
                className="aspect-square overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`https://nocode.meituan.com/photo/search?keyword=${category.keyword}&width=600&height=600`}
                  alt={`${category.category} ${photoIndex + 1}`}
                  className="mx-auto object-cover w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </Layout>
  );
};

export default Photography;
