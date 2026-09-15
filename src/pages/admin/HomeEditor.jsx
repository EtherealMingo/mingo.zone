import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Field, SectionCard } from "./components/Field";
import { StringListEditor } from "./components/StringListEditor";
import { SKILL_ACCENT_CLASS, SKILL_ICON_MAP } from "@/utils/skill-icons";

export default function HomeEditor({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch });
  const updateNested = (key, patch) =>
    onChange({ ...value, [key]: { ...value[key], ...patch } });

  return (
    <div className="space-y-6">
      <SectionCard title="首屏">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="问候语">
            <Input
              value={value.greeting}
              onChange={(event) => update({ greeting: event.target.value })}
            />
          </Field>
          <Field label="年限文案">
            <Input
              value={value.yearsLabel}
              onChange={(event) => update({ yearsLabel: event.target.value })}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="一句话介绍">
              <Input
                value={value.tagline}
                onChange={(event) => update({ tagline: event.target.value })}
              />
            </Field>
          </div>
          <Field label="简介默认展示段数">
            <Input
              type="number"
              min="1"
              value={value.bioPreviewCount}
              onChange={(event) =>
                update({ bioPreviewCount: Number(event.target.value) || 1 })
              }
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="简介段落">
        <div className="space-y-4">
          {value.bio.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                className="w-20"
                value={item.icon}
                onChange={(event) => {
                  const bio = value.bio.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, icon: event.target.value }
                      : entry
                  );
                  update({ bio });
                }}
              />
              <Textarea
                className="flex-1"
                rows={3}
                value={item.text}
                onChange={(event) => {
                  const bio = value.bio.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, text: event.target.value }
                      : entry
                  );
                  update({ bio });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  update({
                    bio: value.bio.filter(
                      (_, entryIndex) => entryIndex !== index
                    ),
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              update({ bio: [...value.bio, { icon: "", text: "" }] })
            }
          >
            <Plus className="h-4 w-4 mr-1" /> 添加段落
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="技能卡片">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="标题">
            <Input
              value={value.skillsIntro.title}
              onChange={(event) =>
                updateNested("skillsIntro", { title: event.target.value })
              }
            />
          </Field>
          <Field label="副标题">
            <Input
              value={value.skillsIntro.subtitle}
              onChange={(event) =>
                updateNested("skillsIntro", { subtitle: event.target.value })
              }
            />
          </Field>
        </div>
        <div className="mt-4 space-y-4">
          {value.skills.map((card, index) => (
            <div
              key={index}
              className="space-y-3 rounded-md border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className="grid gap-3 md:grid-cols-[1fr_140px_140px_auto]">
                <Input
                  value={card.title}
                  onChange={(event) => {
                    const skills = value.skills.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, title: event.target.value }
                        : entry
                    );
                    update({ skills });
                  }}
                />
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={card.icon}
                  onChange={(event) => {
                    const skills = value.skills.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, icon: event.target.value }
                        : entry
                    );
                    update({ skills });
                  }}
                >
                  {Object.keys(SKILL_ICON_MAP).map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={card.accent}
                  onChange={(event) => {
                    const skills = value.skills.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, accent: event.target.value }
                        : entry
                    );
                    update({ skills });
                  }}
                >
                  {Object.keys(SKILL_ACCENT_CLASS).map((accent) => (
                    <option key={accent} value={accent}>
                      {accent}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    update({
                      skills: value.skills.filter(
                        (_, entryIndex) => entryIndex !== index
                      ),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <StringListEditor
                value={card.skills}
                placeholder="技能名称"
                onChange={(skills) => {
                  const next = value.skills.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, skills } : entry
                  );
                  update({ skills: next });
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              update({
                skills: [
                  ...value.skills,
                  { title: "", icon: "code2", accent: "brand", skills: [] },
                ],
              })
            }
          >
            <Plus className="h-4 w-4 mr-1" /> 添加技能分类
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="区块文案">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="精选项目标题">
            <Input
              value={value.featuredSection.title}
              onChange={(event) =>
                updateNested("featuredSection", { title: event.target.value })
              }
            />
          </Field>
          <Field label="精选数量">
            <Input
              type="number"
              min="1"
              value={value.featuredSection.count}
              onChange={(event) =>
                updateNested("featuredSection", {
                  count: Number(event.target.value) || 1,
                })
              }
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="精选项目副标题">
              <Input
                value={value.featuredSection.subtitle}
                onChange={(event) =>
                  updateNested("featuredSection", {
                    subtitle: event.target.value,
                  })
                }
              />
            </Field>
          </div>
          <Field label="摄影区块标题">
            <Input
              value={value.photoSection.title}
              onChange={(event) =>
                updateNested("photoSection", { title: event.target.value })
              }
            />
          </Field>
          <Field label="摄影预览张数">
            <Input
              type="number"
              min="1"
              value={value.photoSection.previewCount}
              onChange={(event) =>
                updateNested("photoSection", {
                  previewCount: Number(event.target.value) || 1,
                })
              }
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="摄影区块副标题">
              <Input
                value={value.photoSection.subtitle}
                onChange={(event) =>
                  updateNested("photoSection", {
                    subtitle: event.target.value,
                  })
                }
              />
            </Field>
          </div>
          <Field label="联系区块标题">
            <Input
              value={value.contactSection.title}
              onChange={(event) =>
                updateNested("contactSection", { title: event.target.value })
              }
            />
          </Field>
          <Field label="联系区块副标题">
            <Input
              value={value.contactSection.subtitle}
              onChange={(event) =>
                updateNested("contactSection", {
                  subtitle: event.target.value,
                })
              }
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="按钮与页面标题">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(value.cta).map(([key, label]) => (
            <Field key={key} label={`cta.${key}`}>
              <Input
                value={label}
                onChange={(event) =>
                  updateNested("cta", { [key]: event.target.value })
                }
              />
            </Field>
          ))}
          <Field label="项目页标题">
            <Input
              value={value.projectsPage.title}
              onChange={(event) =>
                updateNested("projectsPage", { title: event.target.value })
              }
            />
          </Field>
          <Field label="项目页副标题">
            <Input
              value={value.projectsPage.subtitle}
              onChange={(event) =>
                updateNested("projectsPage", { subtitle: event.target.value })
              }
            />
          </Field>
          <Field label="摄影页标题">
            <Input
              value={value.photographyPage.title}
              onChange={(event) =>
                updateNested("photographyPage", { title: event.target.value })
              }
            />
          </Field>
          <Field label="摄影页副标题">
            <Input
              value={value.photographyPage.subtitle}
              onChange={(event) =>
                updateNested("photographyPage", {
                  subtitle: event.target.value,
                })
              }
            />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}
