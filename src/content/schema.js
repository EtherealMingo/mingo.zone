import { z } from "zod";

const navItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  to: z.string().min(1),
  visible: z.boolean(),
});

export const siteSchema = z.object({
  name: z.string().min(1),
  displayName: z.string().min(1),
  icp: z.string(),
  footer: z.string(),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    keywords: z.string(),
    ogTitle: z.string().min(1),
    ogDescription: z.string().min(1),
    ogUrl: z.string().min(1),
    ogSiteName: z.string().min(1),
  }),
  theme: z.object({
    primary: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "需要 HEX 颜色"),
  }),
  nav: z.array(navItemSchema).min(1),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  displayName: z.string().min(1),
  title: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  location: z.string().min(1),
  github: z.string().min(1),
  avatar: z.string().min(1),
  yearsOfExperience: z.number().nonnegative(),
});

const bioItemSchema = z.object({
  icon: z.string(),
  text: z.string().min(1),
});

const skillCardSchema = z.object({
  title: z.string().min(1),
  icon: z.string().min(1),
  accent: z.string().min(1),
  skills: z.array(z.string()),
});

export const homeSchema = z.object({
  greeting: z.string().min(1),
  tagline: z.string().min(1),
  yearsLabel: z.string().min(1),
  bioPreviewCount: z.number().int().positive(),
  bio: z.array(bioItemSchema),
  skillsIntro: z.object({
    title: z.string().min(1),
    subtitle: z.string(),
  }),
  skills: z.array(skillCardSchema),
  featuredSection: z.object({
    title: z.string().min(1),
    subtitle: z.string(),
    count: z.number().int().positive(),
  }),
  photoSection: z.object({
    title: z.string().min(1),
    subtitle: z.string(),
    previewCount: z.number().int().positive(),
  }),
  contactSection: z.object({
    title: z.string().min(1),
    subtitle: z.string(),
  }),
  cta: z.object({
    contact: z.string().min(1),
    resume: z.string().min(1),
    moreProjects: z.string().min(1),
    morePhotos: z.string().min(1),
    email: z.string().min(1),
    call: z.string().min(1),
    contactModalTitle: z.string().min(1),
    expand: z.string().min(1),
    collapse: z.string().min(1),
  }),
  projectsPage: z.object({
    title: z.string().min(1),
    subtitle: z.string(),
  }),
  photographyPage: z.object({
    title: z.string().min(1),
    subtitle: z.string(),
  }),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  image: z.string().optional(),
  description: z.string(),
  achievement: z.string().optional(),
  features: z.array(z.string()),
  tags: z.array(z.string()),
  github: z.string().optional(),
  demo: z.string().optional(),
});

export const projectsSchema = z.array(projectSchema);

const categoryListSchema = z.object({
  category: z.string().min(1),
  content: z.array(z.string()),
});

export const resumeSchema = z.object({
  honors: z.array(z.string()),
  education: z.array(z.string()),
  techStack: z.array(categoryListSchema),
  jobs: z.array(
    z.object({
      company: z.string().min(1),
      position: z.string().min(1),
      period: z.string().min(1),
      achievements: z.array(z.string()),
    }),
  ),
  openSource: z.array(
    z.object({
      name: z.string().min(1),
      url: z.string().optional(),
      tech: z.string(),
      achievements: z.array(z.string()),
    }),
  ),
  generalSkills: z.array(categoryListSchema),
  pdfUrl: z.string().min(1),
  pdfFileName: z.string().min(1),
});

export const photoImageSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().min(1),
  description: z.string(),
  time: z.string(),
});

export const photosSchema = z.array(
  z.object({
    category: z.string().min(1),
    description: z.string(),
    images: z.array(photoImageSchema),
  }),
);

export const contentBundleSchema = z.object({
  version: z.number().optional(),
  site: siteSchema.optional(),
  profile: profileSchema.optional(),
  home: homeSchema.optional(),
  projects: projectsSchema.optional(),
  resume: resumeSchema.optional(),
  photos: photosSchema.optional(),
});

export const moduleSchemas = {
  site: siteSchema,
  profile: profileSchema,
  home: homeSchema,
  projects: projectsSchema,
  resume: resumeSchema,
  photos: photosSchema,
};

export function formatZodError(error) {
  if (!error?.issues) {
    return error?.message || "校验失败";
  }
  return error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("；");
}

export function parseModule(key, data) {
  const schema = moduleSchemas[key];
  if (!schema) {
    throw new Error(`未知模块：${key}`);
  }
  return schema.parse(data);
}

export function parseBundle(data) {
  return contentBundleSchema.parse(data);
}
