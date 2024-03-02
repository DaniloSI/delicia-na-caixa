function Text({ as: Tag = "p", children, ...props }) {
  return <Tag {...props}>{children}</Tag>;
}

export default Text;
