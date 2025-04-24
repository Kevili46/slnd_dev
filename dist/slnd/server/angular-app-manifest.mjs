
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/work"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "route": "/impressum"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1926, hash: '52f39a6310a7a00e8e1043c1fdaf6c717f99e0a691ef6e67a6fe11a45b386bab', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1008, hash: 'fbc913e2f05ed4f3fd010c6ddfafc50312fbdd98d89a8e0658e0bd3804574c6c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 25197, hash: '56b351bd29a16c69086e046c1e76e88111c3ced9f740fc4e76bfc478f4a952a1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'work/index.html': {size: 18499, hash: '95e0f736719511240936696dbe751dbbff99e399aed51e26880a861878a3d0bb', text: () => import('./assets-chunks/work_index_html.mjs').then(m => m.default)},
    'impressum/index.html': {size: 11182, hash: 'fe492450d141dcc0db8e13ace4b3ed16f6bc981255b1f2557637b1c70ea939d2', text: () => import('./assets-chunks/impressum_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 12988, hash: 'd5b170e171d1619dad875706bdeca75096273ed9caec3ed6594405e02fb95694', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-TFPW6EIV.css': {size: 4259, hash: 'plK1ywayQUs', text: () => import('./assets-chunks/styles-TFPW6EIV_css.mjs').then(m => m.default)}
  },
};
