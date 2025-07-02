import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ScrollLinked from "@/components/ui/ScrollLinked";
import { photos } from "@/data/photosData";

const Photography = () => {
  // 为每个图片创建独立的加载状态
  const [loadingStates, setLoadingStates] = useState({});
  const [imageColors, setImageColors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // 防止背景滚动
  };

  /**
   * 使用Canvas API提取图片主色调
   * @param {string} id - 图片ID
   * @param {HTMLImageElement} imgElement - 图片元素
   */
  const extractImageColor = (id, imgElement) => {
    // 创建临时canvas元素
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 设置canvas尺寸为图片尺寸的1/10以提高性能
    const scale = 0.1;
    canvas.width = imgElement.naturalWidth * scale;
    canvas.height = imgElement.naturalHeight * scale;

    // 绘制图片到canvas
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    try {
      // 获取像素数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const colorCounts = {};
      let maxCount = 0;
      let dominantColor = [240, 240, 240]; // 默认灰色

      // 每10个像素采样一次以提高性能
      for (let i = 0; i < data.length; i += 40) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // 跳过透明像素
        if (a < 255) continue;

        const colorKey = `${r},${g},${b}`;
        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;

        // 记录出现次数最多的颜色
        if (colorCounts[colorKey] > maxCount) {
          maxCount = colorCounts[colorKey];
          dominantColor = [r, g, b];
        }
      }

      // 设置主色调
      const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
      setImageColors((prev) => ({ ...prev, [id]: rgbColor }));
    } catch (error) {
      console.error("提取图片颜色失败:", error);
      // 设置默认背景色
      setImageColors((prev) => ({ ...prev, [id]: "#f0f0f0" }));
    }
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
                <div
                  className="relative group flex items-center justify-center"
                  style={{
                    backgroundColor: imageColors[image.id] || "#f0f0f0",
                  }}
                >
                  {/* 图片加载状态指示器 */}
                  {loadingStates[image.id] !== false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  {image.title ? (
                    <div className="absolute top-0 right-0 max-w-xs p-1 bg-black/90  rounded-lg text-right z-10">
                      <p className=" text-gray-200 text-sm">{image.title}</p>
                    </div>
                  ) : null}

                  {/* 图片元素 */}
                  <img
                    src={image.url}
                    alt={image.title || "摄影作品"}
                    className="mx-auto object-cover w-full h-full transition-opacity duration-300 cursor-pointer transition-transform hover:scale-105"
                    style={{
                      opacity: loadingStates[image.id] === false ? 1 : 0,
                    }}
                    onClick={() => openImageModal(image)}
                    onLoad={() => {
                      setImageLoading(image.id, false);
                      extractImageColor(image.id, e.target);
                    }}
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
