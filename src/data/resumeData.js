// 联系方式与社交
export const contact = {
  name: "汪泉明",
  title: "前端开发工程师",
  email: "mingo.email@qq.com",
  phone: "+86 18651861672",
  location: "南京，中国",
  github: "https://github.com/EtherealMingo",
};

// 荣誉与教育背景
export const honors = [
  "南京龙垣信息科技有限公司「2024 年度飞跃之星」",
  "南京佰钧成信息技术有限公司「2021 年度优秀新员工」",
  "南京欧根电子科技有限公司「2019 年度优秀员工」",
];

export const education = [
  "南京中医药大学 「应用心理学专业」",
  "国家三级心理咨询师",
];

// 专业技术能力
export const techStack = [
  {
    category: "框架与库",
    content: ["React/React Hooks", "Vue 2.0", "Vue 3", "Next.js", "Axios"],
  },
  {
    category: "编程语言",
    content: [
      "TypeScript（类型系统）",
      "JavaScript（ES6 + 特性 / 函数式编程）",
      "HTML5",
      "CSS3",
      "Sass",
      "Less",
      "Node.js",
      "Python",
    ],
  },
  {
    category: "音视频处理",
    content: ["WebRTC", "FFmpeg", "视频编码", "音频处理", "流媒体"],
  },
  {
    category: "小程序开发",
    content: ["微信小程序", "UniApp", "Taro", "跨平台开发", "移动端优化"],
  },
  {
    category: "前端工程化",
    content: [
      "Webpack",
      "Vite",
      "Babel",
      "ESLint",
      "Jest",
      "WebExtensions API",
      "CSS 预编译（Sass/Less）",
      "Flex/Grid 布局",
      "HTML5/CSS3 新特性",
    ],
  },
  {
    category: "可视化与交互",
    content: [
      "音频可视化",
      "音频处理",
      "Canvas 绘图",
      "ECharts",
      "EviewCanvas 拓扑图绘制",
      "js-xlsx 表格导入",
    ],
  },
  {
    category: "UI/UX设计",
    content: ["Figma", "Axure", "用户研究", "原型设计"],
  },
  {
    category: "工具与流程",
    content: ["Git（规范代码提交）", "Docker", "VSCode", "AWS", "CodeReview"],
  },
];

// 项目经历
export const jobs = [
  {
    company: "南京龙垣信息科技有限公司",
    position: "前端开发工程师",
    period: "2022.11 - 至今",
    achievements: [
      "主导公司盯系列产品前端开发（盯小语、盯小蚁、盯小云、盯小链、盯小旭）；长江时代小程序开发；",
      "基于 Vue 3 开发「盯小语」产品，实现音频可视化、录音、音频处理、Canvas 绘图等功能；",
      "盯小云银行反诈系统，基于 ECharts 实现数据可视化；",
      "基于 uniapp 从 0 到 1 开发「长江时代」小程序，完成靓号商城、服务大厅等运营商核心模块，完成话费充值、身份证件照拍摄上传、视频录制、手写签名、蓝牙设备连接等功能；",
      "参与公司前端架构设计与规范制定，提升代码质量与可维护性；",
      "2023年提交代码量 10 万行以上。",
    ],
  },
  {
    company: "南京佰钧成信息技术有限公司",
    position: "前端开发工程师",
    period: "2021.03 - 2022.11",
    achievements: [
      "dcn数据中心开局业务重构，实现 70 + 输入框校验逻辑及复杂页面交互，优化用户体验；",
      "开发 Underlay Best 开局功能，基于 EviewCanvas 完成拓扑图动态绘制，集成 js-xlsx 实现 Excel 数据批量导入；",
      "设计并开发 SelectList（侧边选择）、FullScreen（全屏组件）、OperationTip（操作提示）等可复用组件，提升团队开发效率 30%+；",
      "严格执行 CodeReview 流程，保障代码健壮性与可维护性。",
    ],
  },
  {
    company: "南京欧根电子科技有限公司",
    position: "前端开发工程师",
    period: "2019.07-2021.01",
    achievements: [
      "搭建项目开发环境，基于 ElementUI 实现患者管理、任务管理、系统管理模块的全流程 CRUD 功能；",
      "运用 ECharts 开发可视化图表报告，支持数据多维度分析展示；",
      "实现表格数据 xlsx 格式导出功能，优化数据导出性能与兼容性。",
    ],
  },
];

// 开源项目
export const openSource = [
  {
    name: "个人网站",
    url: "https://www.mingo.zone",
    tech: "无后端全静态站点",
    achievements: [
      "全网资源搜索",
      "前端开发工具导航",
      "基于静态评论系统的用户互动模块。",
    ],
  },
  {
    name: "keepUp 浏览器扩展",
    url: "https://github.com/EtherealMingo/keepUp",
    tech: "JavaScript + WebExtensions API",
    achievements: [
      "本地存储常用 URL 列表，支持批量快速打开；",
      "基于 DOM 操作实现页面内容标记与管理，提升多任务处理效率。",
    ],
  },
];

export const featuredProjects = [
  {
    title: "长江时代在线服务小程序",
    image:
      "https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E5%B0%8F%E7%A8%8B%E5%BA%8F-lq5h70mo6o3oa8zfsgu33mzw65pzar.jpg",
    description:
      "为“长江时代”通信平台开发的官方小程序，提供靓号商城、套餐变更、订单管理、实名认证、积分兑换等一站式自助服务，助力业务数字化转型升级。",

    achievement:
      "项目已正式上线，服务数万用户。上线后，用户自助办理率提升，积分兑换活跃度显著增长，业务办理效率提升超30%，有效降低人工客服压力，获得用户和业务方一致好评。",

    features: [
      "前端采用 Vue3 + TypeScript + uni-app 框架，支持多端（小程序/H5）快速适配和组件化开发。",
      "实现了积分商城、套餐变更、订单支付、实名认证等复杂业务流程，涉及多模块数据联动和权限校验。",
      "通过自定义组件（如弹窗、标签选择、倒计时等）提升交互体验和代码复用率。",
      "接入微信支付、短信验证码、实名认证等第三方服务，保证交易安全与合规。",
      "采用响应式数据管理和模块化 API 封装，提升维护效率和扩展性。",
      "集成 ESLint/Prettier/Stylelint 等工具，保障代码规范和质量。",
    ],
    tags: ["Vue3", "TypeScript", "uni-app", "微信小程序", "H5"],
    github: "",
    demo: "",
  },
  {
    title: "盯小语/盯小蚁/盯小云/盯小链/盯小旭",
    description:
      "基于Vue 3 + TypeScript开发的企业级综合管理系统，集成语音处理、数据可视化和多语言支持，提供用户注册、音频管理、数据统计等核心功能。采用模块化架构设计，确保系统可扩展性和维护性。",
    image:
      "https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E7%9B%AF%E5%B0%8F%E8%AF%AD-3iwz5wiumy79uq3kzu4wk0fubj0ln7.jpg",
    tags: ["Vue3", "ECharts", "Canvas", "音频处理"],
    github: "",
    demo: "",
    features: [
      "封装通用组件（AudioPlayer、MinioUpload），集成录音功能，实现语音样本采集与上传，提高代码复用率40%",
      "使用wavesurfer.js开发音频播放器组件，支持音频可视化和播放控制",
      "实现多语言切换功能，支持中英文界面无缝切换",
      "集成多种第三方库，实现复杂业务场景",
    ],
  },

  // {
  //   title: "Underlay Best 拓扑图系统",
  //   description:
  //     "基于 EviewCanvas 实现拓扑图动态绘制，集成 js-xlsx 实现 Excel 数据批量导入，提升网络管理效率。",
  //   image:
  //     "https://nocode.meituan.com/photo/search?keyword=canvas,network&width=600&height=400",
  //   tags: ["EviewCanvas", "js-xlsx", "可视化"],
  //   github: "",
  //   demo: "",
  //   features: ["拓扑图动态渲染", "Excel 数据批量导入", "复杂交互与数据联动"],
  // },
  {
    title: "个人网站",
    description:
      "无后端全静态站点，集成全网资源搜索、前端开发工具导航、静态评论系统等功能。",
    image:
      "https://s3plus.sankuai.com/nocode-external/nocode_image/default/%E4%B8%AA%E4%BA%BA%E7%BD%91%E7%AB%99-q0jyjb6958kxyuqdxuothazltkp5yl.jpg",
    tags: ["静态站点", "前端工具", "评论系统"],
    github: "https://github.com/EtherealMingo/mingo.zone",
    demo: "https://www.mingo.zone",
    features: ["全网资源聚合搜索", "开发者工具导航", "静态评论与互动"],
  },
  {
    title: "keepUp 浏览器扩展",
    description:
      "本地存储常用 URL 列表，支持批量快速打开，基于 DOM 操作实现页面内容标记与管理，提升多任务处理效率。",
    image:
      "https://nocode.meituan.com/photo/search?keyword=extension,browser&width=600&height=400",
    tags: ["WebExtensions", "浏览器插件", "效率工具"],
    github: "https://github.com/EtherealMingo/keepUp",
    demo: "",
    features: ["批量管理常用网址", "页面内容标记", "提升多任务效率"],
  },
];

// 通用技能
export const generalSkills = [
  {
    category: "项目管理",
    content: [
      "熟悉 Scrum 敏捷开发流程，具备良好的团队协作能力；",
      "熟悉 Markdown 编写技术文档与开发日志；",
      "具备客户需求分析与产品演说能力，曾主导 5 + 场项目交付汇报。",
    ],
  },
  {
    category: "软技能",
    content: [
      "具备良好的沟通能力，能清晰表达技术问题与解决方案；",
      "注重团队合作与项目管理，能有效解决团队冲突与沟通问题。",
    ],
  },
  {
    category: "文档能力",
    content: [
      "熟悉 PPT 业务演示文档制作，具备良好的文档编写能力；",
      "具备良好的技术文档编写能力，能清晰表达技术原理与实现细节。",
      "熟悉 Markdown 语法，能编写清晰易读的技术文档。",
    ],
  },
  {
    category: "协作流程",
    content: [
      "熟悉 Git 版本控制，具备良好的代码管理能力；",
      "熟悉 CodeReview 流程，能有效保障代码质量与可维护性；",
      "熟悉 CI/CD 流程，能有效提升开发效率与代码质量。",
    ],
  },

  {
    category: "其他",
    content: [
      "熟悉 Linux 操作系统，具备基本的系统管理与运维能力；",
      "具备良好的学习能力，能快速学习新技术与工具。",
    ],
  },
];
