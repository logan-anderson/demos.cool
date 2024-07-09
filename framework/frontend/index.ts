import { AbstractFrameworkContext } from "../frameworkContext";

export const getPropsFromDom = () => {
  const scripts = document.querySelectorAll('script[type="application/json"]');
  //   TODO: This is bad, we should have a better way to handle this
  const el = scripts[0];
  if (el) {
    return JSON.parse(el.innerHTML);
  }
  console.warn("No props found in the DOM");
  return {};
};

export class FrontendFrameworkContext extends AbstractFrameworkContext {
  staticProps<Props extends Record<string, unknown>>(): Props {
    return getPropsFromDom() as Props;
  }
}
