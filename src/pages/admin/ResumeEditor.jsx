import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Field, SectionCard } from "./components/Field";
import { StringListEditor } from "./components/StringListEditor";

function CategoryListEditor({ items, onChange, title }) {
  return (
    <SectionCard title={title}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="space-y-3 rounded-md border border-gray-100 p-3 dark:border-gray-800"
          >
            <div className="flex gap-2">
              <Input
                value={item.category}
                onChange={(event) => {
                  const next = items.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, category: event.target.value }
                      : entry
                  );
                  onChange(next);
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChange(items.filter((_, entryIndex) => entryIndex !== index))
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <StringListEditor
              value={item.content}
              onChange={(content) => {
                const next = items.map((entry, entryIndex) =>
                  entryIndex === index ? { ...entry, content } : entry
                );
                onChange(next);
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...items, { category: "", content: [] }])}
        >
          <Plus className="h-4 w-4 mr-1" /> 添加分类
        </Button>
      </div>
    </SectionCard>
  );
}

export default function ResumeEditor({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      <SectionCard title="PDF">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="PDF 路径">
            <Input
              value={value.pdfUrl}
              onChange={(event) => update({ pdfUrl: event.target.value })}
            />
          </Field>
          <Field label="下载文件名">
            <Input
              value={value.pdfFileName}
              onChange={(event) => update({ pdfFileName: event.target.value })}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="荣誉奖项">
        <StringListEditor
          value={value.honors}
          onChange={(honors) => update({ honors })}
        />
      </SectionCard>

      <SectionCard title="教育背景">
        <StringListEditor
          value={value.education}
          onChange={(education) => update({ education })}
        />
      </SectionCard>

      <CategoryListEditor
        title="核心技术栈"
        items={value.techStack}
        onChange={(techStack) => update({ techStack })}
      />

      <SectionCard title="工作经历">
        <div className="space-y-4">
          {value.jobs.map((job, index) => (
            <div
              key={index}
              className="space-y-3 rounded-md border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() =>
                    update({
                      jobs: value.jobs.filter(
                        (_, jobIndex) => jobIndex !== index
                      ),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4 mr-1" /> 删除
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="公司">
                  <Input
                    value={job.company}
                    onChange={(event) => {
                      const jobs = value.jobs.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, company: event.target.value }
                          : entry
                      );
                      update({ jobs });
                    }}
                  />
                </Field>
                <Field label="职位">
                  <Input
                    value={job.position}
                    onChange={(event) => {
                      const jobs = value.jobs.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, position: event.target.value }
                          : entry
                      );
                      update({ jobs });
                    }}
                  />
                </Field>
                <Field label="时间">
                  <Input
                    value={job.period}
                    onChange={(event) => {
                      const jobs = value.jobs.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, period: event.target.value }
                          : entry
                      );
                      update({ jobs });
                    }}
                  />
                </Field>
              </div>
              <Field label="成果">
                <StringListEditor
                  multiline
                  value={job.achievements}
                  onChange={(achievements) => {
                    const jobs = value.jobs.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, achievements }
                        : entry
                    );
                    update({ jobs });
                  }}
                />
              </Field>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update({
                jobs: [
                  ...value.jobs,
                  {
                    company: "",
                    position: "",
                    period: "",
                    achievements: [],
                  },
                ],
              })
            }
          >
            <Plus className="h-4 w-4 mr-1" /> 添加经历
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="开源项目">
        <div className="space-y-4">
          {value.openSource.map((item, index) => (
            <div
              key={index}
              className="space-y-3 rounded-md border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="名称">
                  <Input
                    value={item.name}
                    onChange={(event) => {
                      const openSource = value.openSource.map(
                        (entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, name: event.target.value }
                            : entry
                      );
                      update({ openSource });
                    }}
                  />
                </Field>
                <Field label="技术方向">
                  <Input
                    value={item.tech}
                    onChange={(event) => {
                      const openSource = value.openSource.map(
                        (entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, tech: event.target.value }
                            : entry
                      );
                      update({ openSource });
                    }}
                  />
                </Field>
                <Field label="链接">
                  <Input
                    value={item.url || ""}
                    onChange={(event) => {
                      const openSource = value.openSource.map(
                        (entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, url: event.target.value }
                            : entry
                      );
                      update({ openSource });
                    }}
                  />
                </Field>
              </div>
              <StringListEditor
                value={item.achievements}
                onChange={(achievements) => {
                  const openSource = value.openSource.map(
                    (entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, achievements }
                        : entry
                  );
                  update({ openSource });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500"
                onClick={() =>
                  update({
                    openSource: value.openSource.filter(
                      (_, entryIndex) => entryIndex !== index
                    ),
                  })
                }
              >
                <Trash2 className="h-4 w-4 mr-1" /> 删除
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update({
                openSource: [
                  ...value.openSource,
                  { name: "", url: "", tech: "", achievements: [] },
                ],
              })
            }
          >
            <Plus className="h-4 w-4 mr-1" /> 添加开源项目
          </Button>
        </div>
      </SectionCard>

      <CategoryListEditor
        title="通用技能"
        items={value.generalSkills}
        onChange={(generalSkills) => update({ generalSkills })}
      />
    </div>
  );
}
