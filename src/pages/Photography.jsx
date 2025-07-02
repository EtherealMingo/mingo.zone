import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ScrollLinked from "@/components/ui/ScrollLinked";
const Photography = () => {
  // 为每个图片创建独立的加载状态
  const [loadingStates, setLoadingStates] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // 防止背景滚动
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // 恢复背景滚动
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  // 监听ESC键关闭模态框
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeImageModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, closeImageModal]);

  // 设置图片加载状态
  const setImageLoading = (id, isLoading) => {
    setLoadingStates((prev) => ({ ...prev, [id]: isLoading }));
  };

  // 模拟摄影作品数据
  const photos = [
    {
      category: "风景",
      images: [
        {
          id: 1,
          title: "",
          url: "",
          description: "",
          time: "",
        },
      ],
      description: "大自然的壮丽景色",
    },
    {
      category: "城市",
      images: [
        {
          id: 2,
          title: "",
          url: "",
          description: "",
          time: "",
        },
      ],
      description: "现代都市的魅力",
    },
    {
      category: "人像",
      images: [
        {
          id: 3,
          title: "",
          url: "",
          description: "",
          time: "",
        },
      ],
      description: "捕捉人物瞬间",
    },
    {
      category: "街拍",
      images: [
        {
          id: 4,
          title: "",
          url: "",
          description: "",
          time: "",
        },
      ],
      description: "城市生活剪影",
    },
    {
      category: "旅行",
      images: [
        {
          id: 5,
          title: "景德镇",
          url: "https://wx3.sinaimg.cn/mw690/6c4b5debgy1i2qjgvjyekj21281ez4e1.jpg",
          description: "景德镇",
          time: "",
        },
        {
          id: 6,
          title: "大理苍山",
          url: "https://wx1.sinaimg.cn/mw690/6c4b5debgy1i1fe2ra3qxj232r43ox6s.jpg",
          description: "",
          time: "",
        },
      ],
      description: "探索世界各地",
    },
    {
      category: "美食",
      images: [
        {
          id: 7,
          title: "",
          url: "",
          description: "",
          time: "",
        },
        {
          id: 8,
          title: "",
          url: "",
          description: "",
          time: "",
        },
      ],
      description: "美食摄影作品",
    },
  ];

  // 确保public/images目录下存在占位图
  useEffect(() => {
    const checkPlaceholder = async () => {
      try {
        const response = await fetch("/images/placeholder.jpg");
        if (!response.ok) throw new Error("占位图不存在");
      } catch (error) {
        console.warn(
          "占位图未找到，请在public/images目录下添加placeholder.jpg",
          error
        );
      }
    };
    checkPlaceholder();
  }, []);

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
          技术之外，我仍在观察这个世界。
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
            {category.images.map((image, photoIndex) => (
              <motion.div
                key={photoIndex}
                className="aspect-square overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  {/* 图片加载状态指示器 */}
                  {loadingStates[image.id] !== false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 max-w-xs p-2 bg-black/80 text-white text-right z-10">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {image.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {image.time}
                    </p>
                  </div>
                  {/* 图片元素 */}
                  <img
                    src={image.url}
                    alt={image.title || "摄影作品"}
                    className="mx-auto object-cover w-full h-full transition-opacity duration-300 cursor-pointer transition-transform hover:scale-105"
                    style={{
                      opacity: loadingStates[image.id] === false ? 1 : 0,
                    }}
                    onClick={() => openImageModal(image)}
                    onLoad={() => setImageLoading(image.id, false)}
                    onError={(e) => {
                      console.error(
                        "图片加载失败:",
                        image.url,
                        "错误:",
                        e.message
                      );
                      console.error(
                        "请检查: 1.URL是否正确 2.文件是否存在于public目录 3.路径是否以/开头"
                      );
                      setImageLoading(image.id, false);
                      // e.target.src = "/images/placeholder.jpg"; // 请确保此占位图存在
                    }}
                    // 初始设置为加载中
                    onLoadStart={() => setImageLoading(image.id, true)}
                  />

                  {/* 调试信息 */}
                  {process.env.NODE_ENV === "development" && (
                    <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded max-w-[200px] truncate">
                      {image.url}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
      + {/* 图片查看模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={handleBackgroundClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* 关闭按钮 */}
              <button
                onClick={closeImageModal}
                className="absolute -top-6 -right-12 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="关闭"
              >
                <X size={24} strokeWidth="2" />
              </button>

              {/* 大图显示 */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title || "大图预览"}
                className="max-w-4/5 max-h-[60vh] object-contain"
              />

              {/* 图片信息 */}
              {selectedImage.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-10">
                  <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-sm opacity-90">
                      {selectedImage.description}
                    </p>
                  )}
                  {selectedImage.time && (
                    <p className="text-sm opacity-90">{selectedImage.time}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Photography;
