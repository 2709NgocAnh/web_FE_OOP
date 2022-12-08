import "./GlobalStyles.scss";
function GlobalStyles({ children,index }) {
  return <div key={index}> {children}</div>;
}

export default GlobalStyles;
