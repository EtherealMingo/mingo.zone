import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";
import { featuredProjects } from "@/data/resumeData";
import ScrollLinked from "@/components/ui/ScrollLinked";

const Projects = () => {
  return (
    <Layout>
      <ScrollLinked />
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">我的项目</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          这些是我参与开发的一些项目，展示了我的技术能力和解决问题的实际成果。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-12">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="md:w-1/2">
              <img
                src={project.image}
                alt={project.title}
                className="mx-auto object-cover w-full h-full"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {project.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">主要功能</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <GithubIcon className="mr-2 h-4 w-4" /> 源代码
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLinkIcon className="mr-2 h-4 w-4" /> 在线演示
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
};

export default Projects;
