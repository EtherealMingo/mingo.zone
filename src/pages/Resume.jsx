import { motion } from "framer-motion";
import Layout from "../components/Layout";
import {
  DownloadIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
} from "lucide-react";
import { Toast } from "@/components/ui/toast";
import ScrollLinked from "@/components/ui/ScrollLinked";
import { formatPhoneNumber } from "@/lib/utils";
import { useContent } from "@/content/ContentProvider";

const motionSectionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const motionItemProps = (index) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: index * 0.1 },
});

const Resume = () => {
  const { profile, resume } = useContent();

  const downResumePDF = async () => {
    try {
      const pdfUrl = resume.pdfUrl;
      const response = await fetch(pdfUrl, { method: "HEAD" });
      if (!response.ok) throw new Error("文件不存在或路径错误");

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = resume.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      Toast("下载失败: " + error.message, error);
    }
  };

  return (
    <Layout>
      <ScrollLinked />
      <motion.div className="max-w-4xl mx-auto" {...motionSectionProps}>
        <motion.div className="text-center mb-12" {...motionSectionProps}>
          <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {profile.title}
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-center md:space-x-4 space-y-2 md:space-y-0 text-gray-600 dark:text-gray-300 mx-auto">
            <div className="w-full md:w-auto">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center md:justify-start hover:text-brand"
              >
                <MailIcon className="w-4 h-4 mr-2" />
                {profile.email}
              </a>
            </div>
            <div className="w-full md:w-auto">
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center justify-center md:justify-start hover:text-brand"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                {formatPhoneNumber(profile.phone)}
              </a>
            </div>
            <div className="w-full md:w-auto">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start hover:text-brand"
              >
                <GithubIcon className="w-4 h-4 mr-2" />
                {profile.github}
              </a>
            </div>
            <div className="w-full md:w-auto">
              <span className="flex items-center justify-center md:justify-start">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {profile.location}
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div className="text-center mb-12" {...motionSectionProps}>
          <button
            className="inline-flex items-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            onClick={downResumePDF}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            下载简历 PDF
          </button>
        </motion.div>
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">荣誉与教育背景</h2>
          <div className="flex flex-col md:flex-row md:space-x-8 px-2 md:px-8">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h3 className="text-xl font-semibold mb-3">荣誉奖项</h3>
              {resume.honors.map((item) => (
                <p key={item} className="text-gray-600 dark:text-gray-300">
                  {item}
                </p>
              ))}
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-3">教育背景</h3>
              {resume.education.map((item) => (
                <p key={item} className="text-gray-600 dark:text-gray-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">专业技术能力</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h3 className="text-xl font-semibold mb-3 col-span-full">
              核心技术栈
            </h3>
            {resume.techStack.map((tech, index) => (
              <motion.div
                key={tech.category}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
                {...motionItemProps(index)}
              >
                <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.content.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">项目经历</h2>
          <div className="px-2 md:px-8">
            {resume.jobs.map((job, index) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                className="mb-8"
                {...motionItemProps(index)}
              >
                <h3 className="text-xl font-bold mb-3 text-brand">
                  {job.company}
                </h3>
                <div className="text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-medium">{job.position}</span>
                  <span className="mx-2">|</span>
                  <span>{job.period}</span>
                </div>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {job.achievements.map((achievement) => (
                    <li key={achievement} className="mb-1">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">开源项目</h2>
          {resume.openSource.map((item, idx) => (
            <motion.div
              className="mb-8"
              key={item.name}
              {...motionItemProps(idx)}
            >
              <h3 className="text-xl font-bold mb-3">{item.name}</h3>
              <div className="text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-medium">技术方向</span>：{item.tech}
              </div>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {item.achievements.map((ach) => (
                  <li className="mb-2 pl-2" key={ach}>
                    {ach}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">通用技能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.generalSkills.map((group, idx) => (
              <motion.div
                key={group.category}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
                {...motionItemProps(idx)}
              >
                <h3 className="text-lg font-semibold mb-4">{group.category}</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {group.content.map((item) => (
                    <li className="mb-2 pl-2" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="text-center mb-12" {...motionSectionProps}>
          <button
            className="inline-flex items-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            onClick={downResumePDF}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            下载简历 PDF
          </button>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Resume;
