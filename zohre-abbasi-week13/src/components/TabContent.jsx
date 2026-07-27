function TabContent({ content }) {
  return (
    <div className="content">
        <h2>{content.title}</h2>
      <p> {content.text}</p>
    </div>
  );
}

export default TabContent;
