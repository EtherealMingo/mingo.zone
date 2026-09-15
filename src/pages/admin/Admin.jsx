import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Download,
  Upload,
  RotateCcw,
  Check,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  bundledContent,
  cloneContent,
  clearDraft,
  CONTENT_MODULES,
  getMergedContent,
  saveDraftBundle,
  toContentBundle,
} from "@/content";
import { formatZodError, parseBundle, parseModule } from "@/content/schema";
import { downloadJson, readJsonFile } from "@/content/io";
import SiteEditor from "./SiteEditor";
import HomeEditor from "./HomeEditor";
import ProjectsEditor from "./ProjectsEditor";
import ResumeEditor from "./ResumeEditor";
import PhotosEditor from "./PhotosEditor";

const ADMIN_AUTH_KEY = "mingo.zone:admin-auth";
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;
const TAB_MODULE = {
  site: "site",
  home: "home",
  projects: "projects",
  resume: "resume",
  photos: "photos",
};

function NotFound() {
  return (
    <Layout>
      <div className="py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold">页面不存在</h1>
        <Link to="/" className="text-brand hover:underline">
          返回首页
        </Link>
      </div>
    </Layout>
  );
}

function AdminGate({ onUnlock }) {
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (password !== ADMIN_PASS) {
      toast.error("密码错误");
      return;
    }
    sessionStorage.setItem(ADMIN_AUTH_KEY, "1");
    onUnlock();
  };

  return (
    <Layout>
      <form
        onSubmit={submit}
        className="mx-auto mt-24 max-w-sm space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
      >
        <h1 className="text-xl font-bold">内容管理</h1>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="请输入访问密码"
        />
        <Button type="submit" className="w-full">
          进入
        </Button>
      </form>
    </Layout>
  );
}

function AdminWorkspace() {
  const [draft, setDraft] = useState(() => cloneContent(getMergedContent()));
  const [tab, setTab] = useState("site");
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importText, setImportText] = useState("");

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(bundledContent),
    [draft]
  );

  const persist = (next) => {
    setDraft(next);
    saveDraftBundle(next);
  };

  const updateModule = (key, value) => {
    persist({ ...draft, [key]: value });
  };

  const exportCurrent = () => {
    if (tab === "site") {
      downloadJson("site.json", draft.site);
      downloadJson("profile.json", draft.profile);
      toast.success("已导出 site.json 和 profile.json");
      return;
    }
    const key = TAB_MODULE[tab];
    downloadJson(`${key}.json`, draft[key]);
    toast.success(`已导出 ${key}.json`);
  };

  const exportAll = () => {
    downloadJson("content-bundle.json", toContentBundle(draft));
    toast.success("已导出 content-bundle.json");
  };

  const resetDraft = () => {
    if (!confirm("确定清空浏览器草稿并恢复为仓库内容？")) return;
    clearDraft();
    setDraft(cloneContent(bundledContent));
    toast.success("已重置草稿");
  };

  const applyImported = (data) => {
    try {
      const isBundle =
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        CONTENT_MODULES.some((key) => data[key] !== undefined);

      if (isBundle) {
        const parsed = parseBundle(data);
        const next = { ...draft };
        CONTENT_MODULES.forEach((key) => {
          if (parsed[key] !== undefined) {
            next[key] = parsed[key];
          }
        });
        persist(next);
        toast.success("已导入内容包");
        return;
      }

      const key = tab === "site" ? "site" : TAB_MODULE[tab];
      const parsed = parseModule(key, data);
      if (tab === "site") {
        persist({ ...draft, site: parsed });
      } else {
        updateModule(key, parsed);
      }
      toast.success(`已导入 ${key}.json`);
    } catch (error) {
      toast.error(formatZodError(error) || error.message);
    }
  };

  const handleImport = () => {
    try {
      applyImported(JSON.parse(importText));
      setIsImportOpen(false);
    } catch (error) {
      toast.error("JSON 格式错误：" + error.message);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = await readJsonFile(file);
      setImportText(JSON.stringify(parsed, null, 2));
    } catch (error) {
      toast.error("无法读取文件：" + error.message);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">内容管理</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              编辑会写入浏览器草稿，可立刻到前台预览。导出 JSON 后覆盖
              src/content/，再构建部署。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setIsImportOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              导入
            </Button>
            <Button variant="outline" onClick={exportCurrent}>
              <Download className="mr-2 h-4 w-4" />
              导出当前
            </Button>
            <Button variant="outline" onClick={exportAll}>
              <Download className="mr-2 h-4 w-4" />
              导出全部
            </Button>
            <Button
              variant="ghost"
              className="text-red-500"
              onClick={resetDraft}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              重置草稿
            </Button>
          </div>
        </div>

        {dirty ? (
          <div className="inline-flex items-center gap-2 rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            <AlertCircle className="h-4 w-4" />
            有未写入仓库的草稿。打开首页即可预览，确认后请导出 JSON 覆盖
            src/content/。
          </div>
        ) : null}

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex h-auto flex-wrap">
            <TabsTrigger value="site">站点</TabsTrigger>
            <TabsTrigger value="home">首页</TabsTrigger>
            <TabsTrigger value="projects">项目</TabsTrigger>
            <TabsTrigger value="resume">简历</TabsTrigger>
            <TabsTrigger value="photos">摄影</TabsTrigger>
          </TabsList>
          <TabsContent value="site" className="mt-6">
            <SiteEditor
              site={draft.site}
              profile={draft.profile}
              onSiteChange={(site) => updateModule("site", site)}
              onProfileChange={(profile) => updateModule("profile", profile)}
            />
          </TabsContent>
          <TabsContent value="home" className="mt-6">
            <HomeEditor
              value={draft.home}
              onChange={(home) => updateModule("home", home)}
            />
          </TabsContent>
          <TabsContent value="projects" className="mt-6">
            <ProjectsEditor
              value={draft.projects}
              onChange={(projects) => updateModule("projects", projects)}
            />
          </TabsContent>
          <TabsContent value="resume" className="mt-6">
            <ResumeEditor
              value={draft.resume}
              onChange={(resume) => updateModule("resume", resume)}
            />
          </TabsContent>
          <TabsContent value="photos" className="mt-6">
            <PhotosEditor
              value={draft.photos}
              onChange={(photos) => updateModule("photos", photos)}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>导入 JSON</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input type="file" accept=".json" onChange={handleFileUpload} />
            <Textarea
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              placeholder="粘贴 content-bundle.json 或当前模块 JSON"
              rows={12}
              className="font-mono text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportOpen(false)}>
              取消
            </Button>
            <Button onClick={handleImport} disabled={!importText.trim()}>
              <Check className="mr-2 h-4 w-4" />
              导入
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => {
    if (!ADMIN_PASS) return !import.meta.env.PROD;
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === "1";
  });

  if (!ADMIN_PASS && import.meta.env.PROD) {
    return <NotFound />;
  }

  if (ADMIN_PASS && !unlocked) {
    return <AdminGate onUnlock={() => setUnlocked(true)} />;
  }

  return <AdminWorkspace />;
}
