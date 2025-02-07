module.exports = {

"[project]/.next-internal/server/app/api/catalog/export/route/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
}}),
"[project]/app/api/catalog/export/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_esm__({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__ = __turbopack_import__("[externals]/ [external] (puppeteer, esm_import)");
;
;
;
;
function generateHtml(data) {
    const sections = data.sections.map((section)=>{
        switch(section.type){
            case 'header':
                return `
          <div class="text-center my-8">
            <h1 class="text-4xl font-bold">${section.content.title || ''}</h1>
            <p class="text-gray-600 mt-4">${section.content.description || ''}</p>
          </div>
        `;
            case 'product':
                return `
          <div class="flex gap-8 my-8 p-6 border rounded-lg">
            <div class="w-1/2">
              ${section.content.image ? `<img src="${section.content.image}" alt="${section.content.title}" class="w-full h-64 object-cover rounded"/>` : '<div class="w-full h-64 bg-gray-200 rounded"></div>'}
            </div>
            <div class="w-1/2 space-y-4">
              <h2 class="text-2xl font-bold">${section.content.title || ''}</h2>
              <p class="text-gray-600">${section.content.description || ''}</p>
              <p class="text-xl font-bold text-green-600">${section.content.price || ''}</p>
            </div>
          </div>
        `;
            case 'grid':
                return `
          <div class="grid grid-cols-2 gap-4 my-8">
            ${[
                    1,
                    2,
                    3,
                    4
                ].map(()=>`
              <div class="border p-4 rounded">
                <div class="w-full h-32 bg-gray-200 rounded mb-2"></div>
                <h3 class="text-lg font-semibold">Product Title</h3>
                <p class="text-sm text-green-600">$0.00</p>
              </div>
            `).join('')}
          </div>
        `;
            default:
                return '';
        }
    }).join('');
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Catalog - ${data.metadata?.createdAt ? new Date(data.metadata.createdAt).toLocaleDateString() : 'Generated'}</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <style>
        @page {
          margin: 20px;
          size: A4;
        }
        body {
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .page-break {
          page-break-after: always;
        }
        @media print {
          .page-break {
            page-break-after: always;
          }
        }
      </style>
    </head>
    <body class="bg-white">
      <div class="container">
        ${sections}
      </div>
    </body>
    </html>
  `;
}
async function generatePDF(html, outputPath) {
    const browser = await __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__["default"].launch({
        headless: 'new'
    });
    const page = await browser.newPage();
    // Set content and wait for network idle to ensure all resources are loaded
    await page.setContent(html, {
        waitUntil: 'networkidle0'
    });
    // Set viewport and PDF options
    await page.setViewport({
        width: 1200,
        height: 800
    });
    // Generate PDF
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    });
    await browser.close();
}
async function POST(req) {
    try {
        const data = await req.json();
        // Ensure the exports directory exists
        const exportsDir = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'exports');
        try {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(exportsDir);
        } catch  {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(exportsDir, {
                recursive: true
            });
        }
        // Generate HTML content
        const html = generateHtml(data);
        const timestamp = Date.now();
        // Save HTML version
        const htmlFilename = `catalog-${timestamp}.html`;
        const htmlPath = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(exportsDir, htmlFilename);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(htmlPath, html, 'utf-8');
        // Generate and save PDF version
        const pdfFilename = `catalog-${timestamp}.pdf`;
        const pdfPath = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(exportsDir, pdfFilename);
        await generatePDF(html, pdfPath);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            htmlUrl: `/exports/${htmlFilename}`,
            pdfUrl: `/exports/${pdfFilename}`,
            success: true
        });
    } catch (error) {
        console.error('Error exporting catalog:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to export catalog',
            details: error instanceof Error ? error.message : String(error)
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/api/catalog/export/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_esm__({
    "patchFetch": (()=>patchFetch),
    "routeModule": (()=>routeModule),
    "serverHooks": (()=>serverHooks),
    "workAsyncStorage": (()=>workAsyncStorage),
    "workUnitAsyncStorage": (()=>workUnitAsyncStorage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$route$2f$module$2e$compiled$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-modules/app-route/module.compiled.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-kind.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$patch$2d$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/lib/patch-fetch.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$catalog$2f$export$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/api/catalog/export/route.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$catalog$2f$export$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$catalog$2f$export$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "";
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$route$2f$module$2e$compiled$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppRouteRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RouteKind"].APP_ROUTE,
        page: "/api/catalog/export/route",
        pathname: "/api/catalog/export",
        filename: "route",
        bundlePath: ""
    },
    resolvedPagePath: "[project]/app/api/catalog/export/route.ts",
    nextConfigOutput,
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$catalog$2f$export$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;
function patchFetch() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$patch$2d$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["patchFetch"])({
        workAsyncStorage,
        workUnitAsyncStorage
    });
}
;
 //# sourceMappingURL=app-route.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=_a36df1._.js.map