import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";
import ScrollLinked from "@/components/ui/ScrollLinked";
import { useContent } from "@/content/ContentProvider";

const Projects = () => {
  const { home, projects } = useContent();

  return (
    <Layout>
      <ScrollLinked />
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">{home.projectsPage.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {home.projectsPage.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="md:w-1/2">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="mx-auto object-cover w-full h-full"
                />
              ) : null}
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {project.description}
              </p>

              {project.features?.length ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">主要功能</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <GithubIcon className="mr-2 h-4 w-4" /> 源代码
                  </a>
                ) : null}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
                  >
                    <ExternalLinkIcon className="mr-2 h-4 w-4" /> 在线演示
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
};

export default Projects;
