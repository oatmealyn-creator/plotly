import { c as createComponent } from './astro-component_BXt5qASM.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate } from './entrypoint_k72JWV-s.mjs';
import { $ as $$Layout, A as AppShell } from './AppShell_qfImnLXM.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Plotly — Harvest Catalog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AppShell", AppShell, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Yaseen/Documents/vscode/plotly/src/components/AppShell", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Yaseen/Documents/vscode/plotly/src/pages/index.astro", void 0);

const $$file = "C:/Users/Yaseen/Documents/vscode/plotly/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
