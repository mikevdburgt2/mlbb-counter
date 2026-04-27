/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/heroes/[...slug]/route";
exports.ids = ["app/api/heroes/[...slug]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/heroes/[...slug]/route.ts":
/*!*******************************************!*\
  !*** ./app/api/heroes/[...slug]/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nconst UPSTREAM_BASE = 'https://openmlbb.fastapicloud.dev/api/heroes';\nasync function GET(request, { params }) {\n    const path = params.slug.join('/');\n    const upstreamUrl = `${UPSTREAM_BASE}/${path}`;\n    try {\n        const res = await fetch(upstreamUrl, {\n            headers: {\n                'Accept': 'application/json'\n            },\n            next: {\n                revalidate: 300\n            }\n        });\n        if (!res.ok) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: `Upstream returned ${res.status}`\n            }, {\n                status: res.status\n            });\n        }\n        const data = await res.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n    } catch (err) {\n        const msg = err instanceof Error ? err.message : String(err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: msg\n        }, {\n            status: 502\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2hlcm9lcy9bLi4uc2x1Z10vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBdUQ7QUFFdkQsTUFBTUMsZ0JBQWdCO0FBRWYsZUFBZUMsSUFDcEJDLE9BQW9CLEVBQ3BCLEVBQUVDLE1BQU0sRUFBa0M7SUFFMUMsTUFBTUMsT0FBT0QsT0FBT0UsSUFBSSxDQUFDQyxJQUFJLENBQUM7SUFDOUIsTUFBTUMsY0FBYyxHQUFHUCxjQUFjLENBQUMsRUFBRUksTUFBTTtJQUU5QyxJQUFJO1FBQ0YsTUFBTUksTUFBTSxNQUFNQyxNQUFNRixhQUFhO1lBQ25DRyxTQUFTO2dCQUFFLFVBQVU7WUFBbUI7WUFDeENDLE1BQU07Z0JBQUVDLFlBQVk7WUFBSTtRQUMxQjtRQUNBLElBQUksQ0FBQ0osSUFBSUssRUFBRSxFQUFFO1lBQ1gsT0FBT2QscURBQVlBLENBQUNlLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRVAsSUFBSVEsTUFBTSxFQUFFO1lBQUMsR0FDM0M7Z0JBQUVBLFFBQVFSLElBQUlRLE1BQU07WUFBQztRQUV6QjtRQUNBLE1BQU1DLE9BQU8sTUFBTVQsSUFBSU0sSUFBSTtRQUMzQixPQUFPZixxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDRztJQUMzQixFQUFFLE9BQU9DLEtBQUs7UUFDWixNQUFNQyxNQUFNRCxlQUFlRSxRQUFRRixJQUFJRyxPQUFPLEdBQUdDLE9BQU9KO1FBQ3hELE9BQU9uQixxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO1lBQUVDLE9BQU9JO1FBQUksR0FBRztZQUFFSCxRQUFRO1FBQUk7SUFDekQ7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhZG1pblxcRG9jdW1lbnRzXFxwcm9nYW1zXFxhcHBcXGFwaVxcaGVyb2VzXFxbLi4uc2x1Z11cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcblxuY29uc3QgVVBTVFJFQU1fQkFTRSA9ICdodHRwczovL29wZW5tbGJiLmZhc3RhcGljbG91ZC5kZXYvYXBpL2hlcm9lcydcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChcbiAgcmVxdWVzdDogTmV4dFJlcXVlc3QsXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiB7IHNsdWc6IHN0cmluZ1tdIH0gfVxuKSB7XG4gIGNvbnN0IHBhdGggPSBwYXJhbXMuc2x1Zy5qb2luKCcvJylcbiAgY29uc3QgdXBzdHJlYW1VcmwgPSBgJHtVUFNUUkVBTV9CQVNFfS8ke3BhdGh9YFxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXBzdHJlYW1VcmwsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgbmV4dDogeyByZXZhbGlkYXRlOiAzMDAgfSxcbiAgICB9KVxuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IGBVcHN0cmVhbSByZXR1cm5lZCAke3Jlcy5zdGF0dXN9YCB9LFxuICAgICAgICB7IHN0YXR1czogcmVzLnN0YXR1cyB9XG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnN0IG1zZyA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBtc2cgfSwgeyBzdGF0dXM6IDUwMiB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiVVBTVFJFQU1fQkFTRSIsIkdFVCIsInJlcXVlc3QiLCJwYXJhbXMiLCJwYXRoIiwic2x1ZyIsImpvaW4iLCJ1cHN0cmVhbVVybCIsInJlcyIsImZldGNoIiwiaGVhZGVycyIsIm5leHQiLCJyZXZhbGlkYXRlIiwib2siLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJkYXRhIiwiZXJyIiwibXNnIiwiRXJyb3IiLCJtZXNzYWdlIiwiU3RyaW5nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/heroes/[...slug]/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&page=%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&page=%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_admin_Documents_progams_app_api_heroes_slug_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/heroes/[...slug]/route.ts */ \"(rsc)/./app/api/heroes/[...slug]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/heroes/[...slug]/route\",\n        pathname: \"/api/heroes/[...slug]\",\n        filename: \"route\",\n        bundlePath: \"app/api/heroes/[...slug]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\admin\\\\Documents\\\\progams\\\\app\\\\api\\\\heroes\\\\[...slug]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_admin_Documents_progams_app_api_heroes_slug_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZoZXJvZXMlMkYlNUIuLi5zbHVnJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZoZXJvZXMlMkYlNUIuLi5zbHVnJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGaGVyb2VzJTJGJTVCLi4uc2x1ZyU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhZG1pbiU1Q0RvY3VtZW50cyU1Q3Byb2dhbXMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2FkbWluJTVDRG9jdW1lbnRzJTVDcHJvZ2FtcyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMkI7QUFDeEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERvY3VtZW50c1xcXFxwcm9nYW1zXFxcXGFwcFxcXFxhcGlcXFxcaGVyb2VzXFxcXFsuLi5zbHVnXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvaGVyb2VzL1suLi5zbHVnXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2hlcm9lcy9bLi4uc2x1Z11cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2hlcm9lcy9bLi4uc2x1Z10vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEb2N1bWVudHNcXFxccHJvZ2Ftc1xcXFxhcHBcXFxcYXBpXFxcXGhlcm9lc1xcXFxbLi4uc2x1Z11cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&page=%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&page=%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fheroes%2F%5B...slug%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cprogams&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();