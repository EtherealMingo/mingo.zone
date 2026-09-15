import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Field, SectionCard } from "./components/Field";
import { StringListEditor } from "./components/StringListEditor";

const emptyProject = () => ({
  title: "",
  image: "",
  description: "",
  achievement: "",
  features: [],
  tags: [],
  github: "",
  demo: "",
});

export default function ProjectsEditor({ value, onChange }) {
  const updateAt = (index, patch) => {
    onChange(
      value.map((project, projectIndex) =>
        projectIndex === index ? { ...project, ...patch } : project
      )
    );
  };

  return (
    <div className="space-y-6">
      {value.map((project, index) => (
        <SectionCard key={index} title={`项目 ${index + 1}`}>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() =>
                onChange(value.filter((_, projectIndex) => projectIndex !== index))
              }
            >
              <Trash2 className="h-4 w-4 mr-1" /> 删除项目
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="标题">
              <Input
                value={project.title}
                onChange={(event) =>
                  updateAt(index, { title: event.target.value })
                }
              />
            </Field>
            <Field label="封面图 URL">
              <Input
                value={project.image || ""}
                onChange={(event) =>
                  updateAt(index, { image: event.target.value })
                }
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="描述">
                <Textarea
                  rows={3}
                  value={project.description}
                  onChange={(event) =>
                    updateAt(index, { description: event.target.value })
                  }
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="成果">
                <Textarea
                  rows={3}
                  value={project.achievement || ""}
                  onChange={(event) =>
                    updateAt(index, { achievement: event.target.value })
                  }
                />
              </Field>
            </div>
            <Field label="GitHub">
              <Input
                value={project.github || ""}
                onChange={(event) =>
                  updateAt(index, { github: event.target.value })
                }
              />
            </Field>
            <Field label="演示地址">
              <Input
                value={project.demo || ""}
                onChange={(event) =>
                  updateAt(index, { demo: event.target.value })
                }
              />
            </Field>
          </div>
          <Field label="主要功能">
            <StringListEditor
              multiline
              value={project.features || []}
              onChange={(features) => updateAt(index, { features })}
            />
          </Field>
          <Field label="标签">
            <StringListEditor
              value={project.tags || []}
              onChange={(tags) => updateAt(index, { tags })}
            />
          </Field>
        </SectionCard>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => onChange([...value, emptyProject()])}
      >
        <Plus className="h-4 w-4 mr-1" /> 添加项目
      </Button>
    </div>
  );
}
