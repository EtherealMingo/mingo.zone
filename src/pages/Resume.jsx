import { motion } from "framer-motion";
import Layout from "../components/Layout";
import {
  DownloadIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LinkedinIcon,
  GithubIcon,
} from "lucide-react";
import { Toast } from "@/components/ui/toast";
import {
  contact,
  honors,
  education,
  techStack,
  jobs,
  openSource,
  generalSkills,
} from "@/data/resumeData";
import ScrollLinked from "@/components/ui/ScrollLinked";
import { formatPhoneNumber } from "@/lib/utils";
const downResumePDF = async () => {
  try {
    const pdfUrl = "/resume.pdf";
    // 先检查PDF文件是否存在（通过HEAD请求）
    const response = await fetch(pdfUrl, { method: "HEAD" });
    if (!response.ok) throw new Error("文件不存在或路径错误");

    // 文件存在时执行下载
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "汪泉明-前端开发工程师-南京.pdf";
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    Toast("下载失败: " + error.message, error);
  }
};

// motion 动画属性统一提取
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
  return (
    <Layout>
      <ScrollLinked />
      <motion.div className="max-w-4xl mx-auto" {...motionSectionProps}>
        {/* 简历头部 */}
        <motion.div className="text-center mb-12" {...motionSectionProps}>
          <h1 className="text-4xl font-bold mb-4">{contact.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {contact.title}
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-center md:space-x-4 space-y-2 md:space-y-0 text-gray-600 dark:text-gray-300 mx-auto">
            <div className="w-full md:w-auto">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-center md:justify-start  hover:text-blue-600 dark:hover:text-blue-400"
              >
                <MailIcon className="w-4 h-4 mr-2" />
                {contact.email}
              </a>
            </div>
            <div className="w-full md:w-auto">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center justify-center md:justify-start  hover:text-blue-600 dark:hover:text-blue-400"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                {formatPhoneNumber(contact.phone)}
              </a>
            </div>
            <div className="w-full md:w-auto">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start  hover:text-blue-600 dark:hover:text-blue-400"
              >
                <GithubIcon className="w-4 h-4 mr-2" />
                {contact.github}
              </a>
            </div>
            <div className="w-full md:w-auto">
              <span className="flex items-center justify-center md:justify-start">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {contact.location}
              </span>
            </div>
          </div>
        </motion.div>
        {/* 下载按钮 */}
        <motion.div className="text-center mb-12" {...motionSectionProps}>
          <button
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={downResumePDF}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            下载简历 PDF
          </button>
        </motion.div>
        {/* 荣誉与教育背景 */}
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">荣誉与教育背景</h2>
          <div className="flex flex-col md:flex-row md:space-x-8 px-2 md:px-8">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h3 className="text-xl font-semibold mb-3">荣誉奖项</h3>
              {honors.map((item, idx) => (
                <p key={idx} className="text-gray-600 dark:text-gray-300">
                  {item}
                </p>
              ))}
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-3">教育背景</h3>
              {education.map((item, idx) => (
                <p key={idx} className="text-gray-600 dark:text-gray-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
        {/* 专业技术能力 */}
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">专业技术能力</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h3 className="text-xl font-semibold mb-3 col-span-full">
              核心技术栈
            </h3>
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
                {...motionItemProps(index)}
              >
                <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.content.map((item, i) => (
                    <span
                      key={i}
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
        {/* 项目经历 */}
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">项目经历</h2>
          <div className="px-2 md:px-8">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                className="mb-8"
                {...motionItemProps(index)}
              >
                <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                  {job.company}
                </h3>
                <div className="text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-medium">{job.position}</span>
                  <span className="mx-2">|</span>
                  <span>{job.period}</span>
                </div>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="mb-1">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* 开源项目 */}
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">开源项目</h2>
          {openSource.map((item, idx) => (
            <motion.div className="mb-8" key={idx} {...motionItemProps(idx)}>
              <h3 className="text-xl font-bold mb-3">{item.name}</h3>
              <div className="text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-medium">技术方向</span>：{item.tech}
              </div>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {item.achievements.map((ach, i) => (
                  <li className="mb-2 pl-2" key={i}>
                    {ach}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        {/* 通用技能 */}
        <motion.div className="mb-12" {...motionSectionProps}>
          <h2 className="text-2xl font-bold mb-6">通用技能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generalSkills.map((group, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
                {...motionItemProps(idx)}
              >
                <h3 className="text-lg font-semibold mb-4">{group.category}</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {group.content.map((item, i) => (
                    <li className="mb-2 pl-2" key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* 下载按钮 */}
        <motion.div className="text-center mb-12" {...motionSectionProps}>
          <button
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
