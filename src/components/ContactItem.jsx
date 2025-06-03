/**
 * 通用联系方式展示组件
 * @param {Object} props - 组件属性
 * @param {React.Component} props.icon - 图标组件
 * @param {string} props.content - 显示内容
 * @param {string} [props.href] - 可选链接地址
 */
export default function ContactItem({ icon: Icon, content, href }) {
  return (
    <div className="w-full md:w-auto">
      {href ? (
        <a
          href={href}
          className="flex items-center justify-center md:justify-start hover:text-blue-600"
        >
          <Icon className="w-4 h-4 mr-2" />
          {content}
        </a>
      ) : (
        <span className="flex items-center justify-center md:justify-start">
          <Icon className="w-4 h-4 mr-2" />
          {content}
        </span>
      )}
    </div>
  );
}
