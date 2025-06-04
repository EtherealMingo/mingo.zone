import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import {
  ArrowRightIcon,
  MailIcon,
  FacebookIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Code2Icon,
  BracesIcon,
  VideoIcon,
  SmartphoneIcon,
  WrenchIcon,
  PaletteIcon,
} from "lucide-react";
import { featuredProjects, contact } from "@/data/resumeData";
import { Link } from "react-router-dom";

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // 判断是否为移动端
  const isMobile = () => window.innerWidth <= 768;

  // 联系方式（从简历数据导入）
  const email = contact.email;
  const phone = contact.phone;

  const handleContactClick = (e) => {
    if (isMobile()) {
      e.preventDefault();
      setShowContactModal(true);
    }
    // PC端默认跳转邮箱，无需处理
  };

  const fullText = [
    "👍 擅长使用 React 和 Vue 构建用户体验出色的 Web 应用。具有扎实的技术基础与良好的设计感，尤其注重界面细节、交互流畅性与代码结构的可维护性。",
    "🎓 我的职业路径从“心理学 → 前端开发”跨越而来。大学期间我主修应用心理学，对人类行为与认知模式充满兴趣。这段经历让我格外关注用户体验与交互逻辑，也培养了我敏锐的观察力与沟通能力。",
    "💻 在过去的项目中，我积累了丰富的 B 端产品开发经验，熟练掌握组件化开发、状态管理、性能优化等关键技能，也能与设计师、后端紧密协作，推动复杂项目落地。",
    "📷 工作之外，我热爱摄影与演讲，常以 PPT 设计与公开表达的形式分享想法。我相信视觉传达、结构表达与用户体验的底层逻辑是相通的，这种复合背景也让我在前端开发中更具创造性与共情力。",
    "📚 我持续通过阅读、写作与个人项目提升自己，相信技术之外的理解力，才是做好产品体验的关键。",
    "🌍 我热爱旅行，喜欢探索不同的文化与生活方式，这让我在工作中更加开放与包容，也能更好地理解用户需求。",
    "😄 我期待与志同道合的团队合作，共同创造出色的产品体验。如果你对我的背景感兴趣，欢迎联系我！",
  ];

  const shortText = [
    "👍 擅长使用 React 和 Vue 构建用户体验出色的 Web 应用。具有扎实的技术基础与良好的设计感，尤其注重界面细节、交互流畅性与代码结构的可维护性。",
    "🎓 我的职业路径从“心理学 → 前端开发”跨越而来。大学期间我主修应用心理学，对人类行为与认知模式充满兴趣。这段经历让我格外关注用户体验与交互逻辑，也培养了我敏锐的观察力与沟通能力。",
    "💻 在过去的项目中，我积累了丰富的 B 端产品开发经验，熟练掌握组件化开发、状态管理、性能优化等关键技能，也能与设计师、后端紧密协作，推动复杂项目落地。",
  ];

  return (
    <Layout>
      {/* 个人简介部分 */}
      <section className="min-h-[60vh] flex flex-col md:flex-row items-start justify-center py-12">
        {/* 移动端照片放在上面 */}
        <motion.div
          className="md:hidden w-full flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400">
              <img
                src="https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E5%BD%A2%E8%B1%A1%E7%85%A7-8vlvtiu6ukzygbzuw2za5c9onb32lo.jpg"
                alt="个人照片"
                className="mx-auto object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-600 dark:bg-blue-400 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">5</span>
                <span className="text-xl font-bold">+</span>
              </div>
              <span className="text-xs">年经验</span>
            </div>
          </div>
        </motion.div>

        {/* 桌面端照片放在右侧 */}
        <motion.div
          className="hidden md:block md:w-2/5 flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative justify-self-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400">
              <img
                src="https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E5%BD%A2%E8%B1%A1%E7%85%A7-8vlvtiu6ukzygbzuw2za5c9onb32lo.jpg"
                alt="个人照片"
                className="mx-auto object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-blue-600 dark:bg-blue-400 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">5</span>
                <span className="text-2xl font-bold">+</span>
              </div>
              <span className="text-sm">年经验</span>
            </div>
          </div>
        </motion.div>

        {/* 个人简介文本放在左侧 */}
        <motion.div
          className="md:w-3/5 md:pr-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            你好，我是
            <span className="text-blue-600 dark:text-blue-400">Mingo</span>👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            一名前端开发工程师，关注用户体验、界面美感与交互逻辑。
          </p>
          <div className="text-gray-600 dark:text-gray-300 mb-16 space-y-4">
            {(isExpanded ? fullText : shortText).map((paragraph, index) => {
              // 提取Emoji和文本内容
              const emojiMatch = paragraph.match(
                /^([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/u
              );
              const emoji = emojiMatch ? emojiMatch[0] : "";
              const text = paragraph.replace(emoji, "").trim();

              return (
                <div key={index} className="flex items-start">
                  <span className="text-2xl mr-2">{emoji}</span>
                  <p>{text}</p>
                </div>
              );
            })}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center float-right text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              {isExpanded ? (
                <>
                  收起 <ChevronUpIcon className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  展开更多 <ChevronDownIcon className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={`mailto:${email}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              onClick={handleContactClick}
            >
              联系我
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>

            <Link
              to="/resume"
              className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-gray-700 dark:text-blue-400 transition-colors"
            >
              查看简历
            </Link>
          </div>

          {/* 联系方式弹窗（移动端） */}
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
                  选择联系方式
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href={`tel:${phone}`}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    拨打电话
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400"
                  >
                    发送邮件
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* 技能部分 */}
      <section className="py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">专业技能</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            我专注于前端开发领域，拥有丰富的React、Vue等框架开发经验，同时擅长JavaScript、TypeScript等编程语言，以及音视频处理和微信小程序开发。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "前端框架",
              skills: ["React", "Vue", "Next.js", "Axios"],
              icon: (
                <Code2Icon className="w-6 h-6  text-blue-600 dark:text-blue-400" />
              ),
            },
            {
              title: "编程语言",
              skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Sass"],
              icon: (
                <BracesIcon className="w-6 h-6  text-yellow-500 dark:text-yellow-300" />
              ),
            },
            {
              title: "音视频处理",
              skills: ["WebRTC", "FFmpeg", "视频编码", "音频处理", "流媒体"],
              icon: (
                <VideoIcon className="w-6 h-6  text-pink-500 dark:text-pink-400" />
              ),
            },
            {
              title: "小程序开发",
              skills: ["微信小程序", "UniApp", "跨平台开发", "移动端优化"],
              icon: (
                <SmartphoneIcon className="w-6 h-6  text-green-600 dark:text-green-400" />
              ),
            },
            {
              title: "前端工具",
              skills: ["Webpack", "Vite", "Babel", "ESLint", "Jest"],
              icon: (
                <WrenchIcon className="w-6 h-6  text-gray-500 dark:text-gray-300" />
              ),
            },
            {
              title: "UI/UX设计",
              skills: ["Figma", "Axure", "Sketch", "用户研究", "原型设计"],
              icon: (
                <PaletteIcon className="w-6 h-6  text-purple-600 dark:text-purple-400" />
              ),
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10
                   rounded-full  
                 overflow-hidden mr-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 精选项目 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">精选项目</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            以下是我近期参与的一些代表性项目，展示了我的技术能力和解决问题的实际成果。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.slice(0, 2).map((project, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="mx-auto object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
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
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看更多项目 <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 摄影作品 */}
      <section className="py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">摄影作品</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            除了编程，我还热爱摄影，通过镜头捕捉生活中的美好瞬间。
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "landscape,nature",
            "city,night",
            "portrait,people",
            "architecture,modern",
            "food,cuisine",
            "travel,adventure",
            "abstract,art",
            "wildlife,animals",
          ].map((keyword, index) => (
            <motion.div
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img
                src={`https://nocode.meituan.com/photo/search?keyword=${keyword}&width=400&height=400`}
                alt={`摄影作品 ${index + 1}`}
                className="mx-auto object-cover w-full h-full transition-transform hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/photography"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            查看更多作品
          </a>
        </div>
      </section>

      {/* 联系方式 */}
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
          <h2 className="text-3xl font-bold mb-4">联系我</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            如果您有项目合作、工作机会或者只是想交流技术，欢迎随时联系我！
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="mailto:mingo.email@qq.com"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MailIcon className="mr-2 h-5 w-5" /> 发送邮件
            </a>
            {/* <a
              href="https://weibo.com/u/1816878571"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FacebookIcon className="mr-2 h-5 w-5" /> 微博
            </a> */}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
