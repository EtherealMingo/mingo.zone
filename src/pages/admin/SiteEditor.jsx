import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field, SectionCard } from "./components/Field";

export default function SiteEditor({ site, profile, onSiteChange, onProfileChange }) {
  const updateSite = (patch) => onSiteChange({ ...site, ...patch });
  const updateSeo = (patch) =>
    onSiteChange({ ...site, seo: { ...site.seo, ...patch } });
  const updateProfile = (patch) => onProfileChange({ ...profile, ...patch });

  return (
    <div className="space-y-6">
      <SectionCard title="站点">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="站点名称">
            <Input
              value={site.name}
              onChange={(event) => updateSite({ name: event.target.value })}
            />
          </Field>
          <Field label="展示名">
            <Input
              value={site.displayName}
              onChange={(event) =>
                updateSite({ displayName: event.target.value })
              }
            />
          </Field>
          <Field label="ICP 备案号">
            <Input
              value={site.icp}
              onChange={(event) => updateSite({ icp: event.target.value })}
            />
          </Field>
          <Field label="页脚文案">
            <Input
              value={site.footer}
              onChange={(event) => updateSite({ footer: event.target.value })}
            />
          </Field>
          <Field label="主题色">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={site.theme.primary}
                onChange={(event) =>
                  onSiteChange({
                    ...site,
                    theme: { ...site.theme, primary: event.target.value },
                  })
                }
                className="h-10 w-14 cursor-pointer rounded border border-gray-200 bg-transparent"
              />
              <Input
                value={site.theme.primary}
                onChange={(event) =>
                  onSiteChange({
                    ...site,
                    theme: { ...site.theme, primary: event.target.value },
                  })
                }
              />
            </div>
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="个人资料">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="姓名">
            <Input
              value={profile.name}
              onChange={(event) => updateProfile({ name: event.target.value })}
            />
          </Field>
          <Field label="对外称呼">
            <Input
              value={profile.displayName}
              onChange={(event) =>
                updateProfile({ displayName: event.target.value })
              }
            />
          </Field>
          <Field label="职位">
            <Input
              value={profile.title}
              onChange={(event) => updateProfile({ title: event.target.value })}
            />
          </Field>
          <Field label="工作年限">
            <Input
              type="number"
              min="0"
              value={profile.yearsOfExperience}
              onChange={(event) =>
                updateProfile({
                  yearsOfExperience: Number(event.target.value) || 0,
                })
              }
            />
          </Field>
          <Field label="邮箱">
            <Input
              value={profile.email}
              onChange={(event) => updateProfile({ email: event.target.value })}
            />
          </Field>
          <Field label="电话">
            <Input
              value={profile.phone}
              onChange={(event) => updateProfile({ phone: event.target.value })}
            />
          </Field>
          <Field label="地点">
            <Input
              value={profile.location}
              onChange={(event) =>
                updateProfile({ location: event.target.value })
              }
            />
          </Field>
          <Field label="GitHub">
            <Input
              value={profile.github}
              onChange={(event) =>
                updateProfile({ github: event.target.value })
              }
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="头像 URL">
              <Input
                value={profile.avatar}
                onChange={(event) =>
                  updateProfile({ avatar: event.target.value })
                }
              />
            </Field>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="SEO">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="标题">
            <Input
              value={site.seo.title}
              onChange={(event) => updateSeo({ title: event.target.value })}
            />
          </Field>
          <Field label="作者页标题">
            <Input
              value={site.seo.ogTitle}
              onChange={(event) => updateSeo({ ogTitle: event.target.value })}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="描述">
              <Textarea
                rows={3}
                value={site.seo.description}
                onChange={(event) =>
                  updateSeo({ description: event.target.value })
                }
              />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Open Graph 描述">
              <Textarea
                rows={3}
                value={site.seo.ogDescription}
                onChange={(event) =>
                  updateSeo({ ogDescription: event.target.value })
                }
              />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="关键词">
              <Input
                value={site.seo.keywords}
                onChange={(event) =>
                  updateSeo({ keywords: event.target.value })
                }
              />
            </Field>
          </div>
          <Field label="站点 URL">
            <Input
              value={site.seo.ogUrl}
              onChange={(event) => updateSeo({ ogUrl: event.target.value })}
            />
          </Field>
          <Field label="站点名">
            <Input
              value={site.seo.ogSiteName}
              onChange={(event) =>
                updateSeo({ ogSiteName: event.target.value })
              }
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="导航">
        <div className="space-y-3">
          {site.nav.map((item, index) => (
            <div
              key={item.id}
              className="grid items-center gap-3 rounded-md border border-gray-100 p-3 dark:border-gray-800 md:grid-cols-[80px_1fr_1fr_auto]"
            >
              <span className="text-sm text-gray-500">{item.id}</span>
              <Input
                value={item.title}
                onChange={(event) => {
                  const nav = site.nav.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, title: event.target.value }
                      : entry
                  );
                  updateSite({ nav });
                }}
              />
              <Input
                value={item.to}
                onChange={(event) => {
                  const nav = site.nav.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, to: event.target.value }
                      : entry
                  );
                  updateSite({ nav });
                }}
              />
              <label className="flex items-center gap-2 text-sm">
                <Switch
                  checked={item.visible}
                  onCheckedChange={(checked) => {
                    const nav = site.nav.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, visible: checked }
                        : entry
                    );
                    updateSite({ nav });
                  }}
                />
                显示
              </label>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
