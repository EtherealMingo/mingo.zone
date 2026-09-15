import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import {
  ArrowRightIcon,
  MailIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { extractAllImageUrls } from "@/lib/utils";
import { useContent } from "@/content/ContentProvider";
import { getSkillAccentClass, getSkillIcon } from "@/utils/skill-icons";

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { profile, home, projects, photos, site } = useContent();
  const resumePath =
    site.nav.find((item) => item.id === "resume")?.to || "/resume";
  const projectsPath =
    site.nav.find((item) => item.id === "projects")?.to || "/projects";
  const photographyPath =
    site.nav.find((item) => item.id === "photography")?.to || "/photography";

  const isMobile = () => window.innerWidth <= 768;
  const email = profile.email;
  const phone = profile.phone;
  const visibleBio = isExpanded
    ? home.bio
    : home.bio.slice(0, home.bioPreviewCount);
  const featured = projects.slice(0, home.featuredSection.count);
  const allImageUrls = extractAllImageUrls(photos);
  const randomImages = [...allImageUrls]
    .sort(() => 0.5 - Math.random())
    .slice(0, home.photoSection.previewCount);

  const handleContactClick = (e) => {
    if (isMobile()) {
      e.preventDefault();
      setShowContactModal(true);
    }
  };

  return (
    <Layout>
      <section className="flex flex-col md:flex-row items-start justify-center py-12">
        <motion.div
          className="md:hidden w-full flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-brand">
              <img
                src={profile.avatar}
                alt={profile.displayName}
                className="mx-auto object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-brand rounded-full flex flex-col items-center justify-center text-white shadow-lg">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">
                  {profile.yearsOfExperience}
                </span>
                <span className="text-xl font-bold">+</span>
              </div>
              <span className="text-xs">{home.yearsLabel}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hidden md:block md:w-2/5 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative justify-self-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-brand">
              <img
                src={profile.avatar}
                alt={profile.displayName}
                className="mx-auto object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-brand rounded-full flex flex-col items-center justify-center text-white shadow-lg">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">
                  {profile.yearsOfExperience}
                </span>
                <span className="text-2xl font-bold">+</span>
              </div>
              <span className="text-sm">{home.yearsLabel}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="md:w-3/5 md:pr-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {home.greeting}
            <span className="text-brand">{profile.displayName}</span>👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {home.tagline}
          </p>
          <div className="text-gray-600 dark:text-gray-300 mb-16 space-y-4">
            {visibleBio.map((paragraph, index) => (
              <div key={index} className="flex items-start">
                <span className="text-2xl mr-2">{paragraph.icon}</span>
                <p>{paragraph.text}</p>
              </div>
            ))}
            {home.bio.length > home.bioPreviewCount ? (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center float-right text-brand hover:underline mt-2"
              >
                {isExpanded ? (
                  <>
                    {home.cta.collapse} <ChevronUpIcon className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    {home.cta.expand}{" "}
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={`mailto:${email}`}
              className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors flex items-center"
              onClick={handleContactClick}
            >
              {home.cta.contact}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>

            <Link
              to={resumePath}
              className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-gray-700 dark:text-brand transition-colors"
            >
              {home.cta.resume}
            </Link>
          </div>

          {showContactModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-80 shadow-lg relative">
                <button
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-2xl rounded-full bg-gray-100 dark:bg-gray-500 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setShowContactModal(false)}
                  aria-label="关闭"
                >
                  ×
                </button>
                <h3 className="text-lg font-bold mb-4 text-center">
                  {home.cta.contactModalTitle}
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href={`tel:${phone}`}
                    className="px-4 py-3 bg-brand text-white rounded-lg text-center hover:bg-brand-hover transition-colors"
                  >
                    {home.cta.call}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-700 text-brand"
                  >
                    {home.cta.email}
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      <section className="py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{home.skillsIntro.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {home.skillsIntro.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {home.skills.map((category, index) => {
            const Icon = getSkillIcon(category.icon);
            return (
              <motion.div
                key={category.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <Icon
                      className={`w-6 h-6 ${getSkillAccentClass(category.accent)}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{home.featuredSection.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {home.featuredSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {project.image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="mx-auto object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={projectsPath}
            className="inline-flex items-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
          >
            {home.cta.moreProjects} <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{home.photoSection.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {home.photoSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {randomImages.map((url, index) => (
            <motion.div
              key={`${url}-${index}`}
              className="aspect-square overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img
                src={url}
                alt={`${home.photoSection.title} ${index + 1}`}
                className="mx-auto object-cover w-full h-full transition-transform hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={photographyPath}>
            <button className="view-all">
              <p className="text">
                {home.cta.morePhotos} <ArrowRightIcon className="ml-2 h-4 w-4" />
              </p>
              <span className="BG"></span>
            </button>
          </Link>
        </div>
      </section>

      <section
        id="contact"
        className="py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl"
      >
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{home.contactSection.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {home.contactSection.subtitle}
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            >
              <MailIcon className="mr-2 h-5 w-5" /> {home.cta.email}
            </a>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
