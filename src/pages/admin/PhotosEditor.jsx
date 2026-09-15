import { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  FolderOpen,
  Check,
} from "lucide-react";
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

export default function PhotosEditor({ value, onChange }) {
  const photos = value;
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    category: "",
    description: "",
  });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imageForm, setImageForm] = useState({
    title: "",
    url: "",
    description: "",
    time: "",
  });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [openCategories, setOpenCategories] = useState({});

  const openCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        category: category.category,
        description: category.description,
      });
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
      onChange(
        photos.map((cat) =>
          cat.category === editingCategory.category
            ? {
                ...cat,
                category: categoryForm.category,
                description: categoryForm.description,
              }
            : cat
        )
      );
      toast.success("分类已更新");
    } else {
      if (photos.some((cat) => cat.category === categoryForm.category)) {
        toast.error("分类已存在");
        return;
      }
      onChange([
        ...photos,
        {
          category: categoryForm.category,
          description: categoryForm.description,
          images: [],
        },
      ]);
      toast.success("分类已添加");
    }
    setIsCategoryModalOpen(false);
  };

  const deleteCategory = (categoryName) => {
    if (!confirm(`确定删除分类「${categoryName}」吗？`)) return;
    onChange(photos.filter((cat) => cat.category !== categoryName));
    toast.success("分类已删除");
  };

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
      toast.error("图片 URL 不能为空");
      return;
    }

    if (editingImage) {
      onChange(
        photos.map((cat, idx) =>
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
      const newId = Date.now();
      onChange(
        photos.map((cat, idx) =>
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
    onChange(
      photos.map((cat, idx) =>
        idx === categoryIndex
          ? { ...cat, images: cat.images.filter((img) => img.id !== imageId) }
          : cat
      )
    );
    toast.success("图片已删除");
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => openCategoryModal()}>
        <Plus className="w-4 h-4 mr-2" />
        新增分类
      </Button>

      {photos.map((category, categoryIndex) => (
        <Collapsible
          key={category.category}
          open={openCategories[category.category]}
          onOpenChange={(open) =>
            setOpenCategories((prev) => ({
              ...prev,
              [category.category]: open,
            }))
          }
        >
          <div className="overflow-hidden rounded-lg border bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between bg-gray-50 p-4 dark:bg-gray-800">
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 hover:text-brand">
                  {openCategories[category.category] ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                  <FolderOpen className="w-5 h-5" />
                  <span className="text-lg font-bold">{category.category}</span>
                  <span className="text-sm text-gray-500">
                    ({category.images.length} 张)
                  </span>
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
            <div className="px-4 pb-2 text-sm text-gray-500">
              {category.description}
            </div>
            <CollapsibleContent>
              <div className="p-4">
                {category.images.length === 0 ? (
                  <div className="py-8 text-center text-gray-400">
                    <ImageIcon className="mx-auto mb-2 h-12 w-12 opacity-50" />
                    暂无图片
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.images.map((image) => (
                      <div
                        key={image.id}
                        className="overflow-hidden rounded-lg border bg-white dark:bg-gray-800"
                      >
                        <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="truncate font-medium">
                            {image.title || "无标题"}
                          </h4>
                          {image.time ? (
                            <p className="mt-1 text-xs text-gray-500">
                              {image.time}
                            </p>
                          ) : null}
                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() =>
                                openImageModal(categoryIndex, image)
                              }
                            >
                              <Edit2 className="mr-1 h-3 w-3" />
                              编辑
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 hover:text-red-600"
                              onClick={() =>
                                deleteImage(categoryIndex, image.id)
                              }
                            >
                              <Trash2 className="h-3 w-3" />
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
      ))}

      {photos.length === 0 ? (
        <div className="py-16 text-center text-gray-400">暂无分类</div>
      ) : null}

      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "编辑分类" : "新增分类"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium">分类名称</label>
              <Input
                value={categoryForm.category}
                onChange={(event) =>
                  setCategoryForm((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">描述</label>
              <Textarea
                value={categoryForm.description}
                onChange={(event) =>
                  setCategoryForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCategoryModalOpen(false)}
            >
              取消
            </Button>
            <Button onClick={saveCategory}>
              <Check className="mr-2 h-4 w-4" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingImage ? "编辑图片" : "添加图片"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                图片地址 URL
              </label>
              <Input
                value={imageForm.url}
                onChange={(event) =>
                  setImageForm((prev) => ({ ...prev, url: event.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">标题</label>
              <Input
                value={imageForm.title}
                onChange={(event) =>
                  setImageForm((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">时间</label>
                <Input
                  value={imageForm.time}
                  onChange={(event) =>
                    setImageForm((prev) => ({
                      ...prev,
                      time: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">描述</label>
                <Input
                  value={imageForm.description}
                  onChange={(event) =>
                    setImageForm((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            {imageForm.url ? (
              <div className="overflow-hidden rounded-lg border bg-gray-100 dark:bg-gray-800">
                <img
                  src={imageForm.url}
                  alt="预览"
                  className="mx-auto max-h-48 object-contain"
                />
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageModalOpen(false)}>
              取消
            </Button>
            <Button onClick={saveImage}>
              <Check className="mr-2 h-4 w-4" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
