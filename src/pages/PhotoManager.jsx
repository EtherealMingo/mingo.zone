import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  Download,
  Upload,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  FolderOpen,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { photos as initialPhotos } from "@/data/photosData";

// 深拷贝初始数据
const getInitialData = () => JSON.parse(JSON.stringify(initialPhotos));

const PhotoManager = () => {
  const [photos, setPhotos] = useState(getInitialData);
  const [hasChanges, setHasChanges] = useState(false);

  // 分类相关状态
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ category: "", description: "" });

  // 图片相关状态
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imageForm, setImageForm] = useState({
    title: "",
    url: "",
    description: "",
    time: "",
  });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  // 导入相关状态
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState("");

  // 展开状态
  const [openCategories, setOpenCategories] = useState({});

  // 数据变更检测
  useEffect(() => {
    const hasAnyChanges = JSON.stringify(photos) !== JSON.stringify(getInitialData());
    setHasChanges(hasAnyChanges);
  }, [photos]);

  // ========== 分类操作 ==========

  const openCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ category: category.category, description: category.description });
    } else {
      setEditingCategory(null);
      setCategoryForm({ category: "", description: "" });
    }
    setIsCategoryModalOpen(true);
  };

  const saveCategory = () => {
    if (!categoryForm.category.trim()) {
      toast.error("分类名称不能为空");
      return;
    }

    if (editingCategory) {
      // 编辑模式
      setPhotos((prev) =>
        prev.map((cat) =>
          cat.category === editingCategory.category
            ? { ...cat, category: categoryForm.category, description: categoryForm.description }
            : cat
        )
      );
      toast.success("分类已更新");
    } else {
      // 新增模式
      if (photos.some((cat) => cat.category === categoryForm.category)) {
        toast.error("分类已存在");
        return;
      }
      setPhotos((prev) => [
        ...prev,
        { category: categoryForm.category, description: categoryForm.description, images: [] },
      ]);
      toast.success("分类已添加");
    }
    setIsCategoryModalOpen(false);
  };

  const deleteCategory = (categoryName) => {
    if (!confirm(`确定删除分类"${categoryName}"吗？该操作不可恢复。`)) return;
    setPhotos((prev) => prev.filter((cat) => cat.category !== categoryName));
    toast.success("分类已删除");
  };

  // ========== 图片操作 ==========

  const openImageModal = (categoryIndex, image = null) => {
    setSelectedCategoryIndex(categoryIndex);
    if (image) {
      setEditingImage(image);
      setImageForm({
        title: image.title || "",
        url: image.url || "",
        description: image.description || "",
        time: image.time || "",
      });
    } else {
      setEditingImage(null);
      setImageForm({ title: "", url: "", description: "", time: "" });
    }
    setIsImageModalOpen(true);
  };

  const saveImage = () => {
    if (!imageForm.url.trim()) {
      toast.error("图片URL不能为空");
      return;
    }

    if (editingImage) {
      // 编辑模式
      setPhotos((prev) =>
        prev.map((cat, idx) =>
          idx === selectedCategoryIndex
            ? {
                ...cat,
                images: cat.images.map((img) =>
                  img.id === editingImage.id
                    ? {
                        ...img,
                        title: imageForm.title,
                        url: imageForm.url,
                        description: imageForm.description,
                        time: imageForm.time,
                      }
                    : img
                ),
              }
            : cat
        )
      );
      toast.success("图片已更新");
    } else {
      // 新增模式 - 生成唯一ID
      const newId = Date.now();
      setPhotos((prev) =>
        prev.map((cat, idx) =>
          idx === selectedCategoryIndex
            ? {
                ...cat,
                images: [
                  ...cat.images,
                  {
                    id: newId,
                    title: imageForm.title,
                    url: imageForm.url,
                    description: imageForm.description,
                    time: imageForm.time,
                  },
                ],
              }
            : cat
        )
      );
      toast.success("图片已添加");
    }
    setIsImageModalOpen(false);
  };

  const deleteImage = (categoryIndex, imageId) => {
    if (!confirm("确定删除这张图片吗？")) return;
    setPhotos((prev) =>
      prev.map((cat, idx) =>
        idx === categoryIndex
          ? { ...cat, images: cat.images.filter((img) => img.id !== imageId) }
          : cat
      )
    );
    toast.success("图片已删除");
  };

  // ========== 导入/导出 ==========

  const exportJSON = () => {
    const json = JSON.stringify(photos, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "photosData.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON 已导出");
  };

  const copyToClipboard = () => {
    const json = JSON.stringify(photos, null, 2);
    navigator.clipboard.writeText(json);
    toast.success("已复制到剪贴板");
  };

  const openImportModal = () => {
    setImportText("");
    setIsImportModalOpen(true);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed)) {
        toast.error("格式错误：需要是数组");
        return;
      }
      setPhotos(parsed);
      setIsImportModalOpen(false);
      toast.success("导入成功");
    } catch (e) {
      toast.error("JSON 格式错误：" + e.message);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImportText(event.target.result);
    };
    reader.readAsText(file);
  };

  const resetData = () => {
    if (!confirm("确定重置所有更改吗？")) return;
    setPhotos(getInitialData());
    toast.success("已重置为初始数据");
  };

  // ========== 渲染 ==========

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">摄影作品管理器</h1>
          <p className="text-gray-600 dark:text-gray-300">管理分类和图片，导出 JSON 更新到 GitHub</p>
          {hasChanges && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              有未保存的更改
            </div>
          )}
        </motion.div>

        {/* 操作栏 */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={() => openCategoryModal()} variant="default">
            <Plus className="w-4 h-4 mr-2" />
            新增分类
          </Button>
          <Button onClick={openImportModal} variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            导入 JSON
          </Button>
          <Button onClick={exportJSON} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出 JSON
          </Button>
          <Button onClick={copyToClipboard} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            复制到剪贴板
          </Button>
          <Button onClick={resetData} variant="ghost" className="text-red-500 hover:text-red-600">
            <X className="w-4 h-4 mr-2" />
            重置
          </Button>
        </motion.div>

        {/* 分类列表 */}
        <div className="space-y-4">
          {photos.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Collapsible
                open={openCategories[category.category]}
                onOpenChange={(open) =>
                  setOpenCategories((prev) => ({ ...prev, [category.category]: open }))
                }
              >
                <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                  {/* 分类头部 */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center gap-2 hover:text-blue-600">
                        {openCategories[category.category] ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                        <FolderOpen className="w-5 h-5" />
                        <span className="font-bold text-lg">{category.category}</span>
                        <span className="text-sm text-gray-500">({category.images.length} 张)</span>
                      </button>
                    </CollapsibleTrigger>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openImageModal(categoryIndex)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        添加图片
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openCategoryModal(category)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteCategory(category.category)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 分类描述 */}
                  <div className="px-4 pb-2 text-sm text-gray-500">{category.description}</div>

                  {/* 图片列表 */}
                  <CollapsibleContent>
                    <div className="p-4">
                      {category.images.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          暂无图片，点击"添加图片"开始
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.images.map((image, imageIndex) => (
                            <div
                              key={image.id}
                              className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
                            >
                              <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                                <img
                                  src={image.url}
                                  alt={image.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect fill='%23ddd' width='200' height='150'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3E加载失败%3C/text%3E%3C/svg%3E";
                                  }}
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium truncate">{image.title || "无标题"}</h4>
                                {image.time && (
                                  <p className="text-xs text-gray-500 mt-1">{image.time}</p>
                                )}
                                {image.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                    {image.description}
                                  </p>
                                )}
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => openImageModal(categoryIndex, image)}
                                  >
                                    <Edit2 className="w-3 h-3 mr-1" />
                                    编辑
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => deleteImage(categoryIndex, image.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </motion.div>
          ))}

          {photos.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>暂无分类，点击"新增分类"开始</p>
            </div>
          )}
        </div>
      </div>

      {/* 分类弹窗 */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "编辑分类" : "新增分类"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">分类名称</label>
              <Input
                value={categoryForm.category}
                onChange={(e) =>
                  setCategoryForm((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="如：美食、人像、旅行"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">描述</label>
              <Textarea
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="分类的简短描述"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryModalOpen(false)}>
              取消
            </Button>
            <Button onClick={saveCategory}>
              <Check className="w-4 h-4 mr-2" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 图片弹窗 */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingImage ? "编辑图片" : "添加图片"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">图片地址 URL *</label>
              <Input
                value={imageForm.url}
                onChange={(e) => setImageForm((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">标题</label>
              <Input
                value={imageForm.title}
                onChange={(e) => setImageForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="图片标题"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">时间</label>
                <Input
                  value={imageForm.time}
                  onChange={(e) => setImageForm((prev) => ({ ...prev, time: e.target.value }))}
                  placeholder="如：2025-02"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">描述</label>
                <Input
                  value={imageForm.description}
                  onChange={(e) =>
                    setImageForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="简短描述"
                />
              </div>
            </div>
            {imageForm.url && (
              <div>
                <label className="block text-sm font-medium mb-2">预览</label>
                <div className="border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={imageForm.url}
                    alt="预览"
                    className="max-h-48 mx-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageModalOpen(false)}>
              取消
            </Button>
            <Button onClick={saveImage}>
              <Check className="w-4 h-4 mr-2" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 导入弹窗 */}
      <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>导入 JSON</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">上传文件</label>
              <input type="file" accept=".json" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">或粘贴 JSON 内容</label>
              <Textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder='[{"category": "...", "description": "...", "images": [...]}]'
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleImport} disabled={!importText.trim()}>
              <Check className="w-4 h-4 mr-2" />
              导入
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PhotoManager;
